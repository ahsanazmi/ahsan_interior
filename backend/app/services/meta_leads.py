from __future__ import annotations

import json
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.services.leads import create_meta_lead


def verify_meta_webhook(*, mode: str | None, verify_token: str | None, challenge: str | None) -> str:
    if mode == "subscribe" and verify_token and settings.meta_verify_token and verify_token == settings.meta_verify_token:
        return challenge or ""
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Meta webhook verification")


def ingest_meta_lead_webhook(payload: dict[str, Any], db: Session) -> dict[str, Any]:
    entries = payload.get("entry") or []
    processed: list[dict[str, str]] = []

    for entry in entries:
        changes = entry.get("changes") or []
        for change in changes:
            if change.get("field") != "leadgen":
                continue

            value = change.get("value") or {}
            leadgen_id = value.get("leadgen_id")
            if not leadgen_id:
                continue

            meta_lead = fetch_meta_lead(leadgen_id)
            lead = create_meta_lead(
                name=meta_lead["name"],
                email=meta_lead["email"],
                phone=meta_lead["phone"],
                city=meta_lead["city"],
                whatsapp_updates=meta_lead["whatsapp_updates"],
                source=meta_lead["source"],
                db=db,
            )
            processed.append({"leadgen_id": leadgen_id, "lead_id": lead.id})

    return {"processed": len(processed), "items": processed}


def fetch_meta_lead(leadgen_id: str) -> dict[str, str | bool]:
    if not settings.meta_access_token:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Meta access token is not configured")

    query = urlencode(
        {
            "fields": "created_time,field_data",
            "access_token": settings.meta_access_token,
        }
    )
    url = f"https://graph.facebook.com/{settings.meta_graph_version}/{leadgen_id}?{query}"
    request = Request(url)

    try:
        with urlopen(request, timeout=15) as response:
            data = json.loads(response.read().decode("utf-8"))
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=f"Failed to fetch Meta lead: {exc}") from exc

    field_data = data.get("field_data") or []
    name = _pick_field_value(field_data, ("full_name", "name", "first_name", "last_name"))
    email = _pick_field_value(field_data, ("email",))
    phone = _pick_field_value(field_data, ("phone_number", "phone"))
    city = _pick_field_value(field_data, ("city", "city_name", "location"))

    if not name or not email or not phone or not city:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Meta lead is missing required fields: name, email, phone, or city",
        )

    if not isinstance(name, str) or not isinstance(email, str) or not isinstance(phone, str) or not isinstance(city, str):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Meta lead fields must be strings")

    return {
        "name": name.strip(),
        "email": email.strip(),
        "phone": phone.strip(),
        "city": city.strip(),
        "whatsapp_updates": False,
        "source": "meta-lead-ads",
    }


def _pick_field_value(field_data: list[dict[str, Any]], field_names: tuple[str, ...]) -> str | None:
    normalized_names = {field_name.lower() for field_name in field_names}
    values: list[str] = []

    for item in field_data:
        item_name = str(item.get("name", "")).lower()
        if item_name not in normalized_names:
            continue
        item_values = item.get("values") or []
        values.extend(str(value) for value in item_values if value)

    if not values:
        return None

    if "first_name" in normalized_names and "last_name" in normalized_names and len(values) >= 2:
        return f"{values[0].strip()} {values[1].strip()}".strip()

    return values[0].strip()