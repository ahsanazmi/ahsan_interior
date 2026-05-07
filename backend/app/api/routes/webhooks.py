from typing import Any

from fastapi import APIRouter, Depends, Query, Request, Response
from sqlalchemy.orm import Session

from app.db import get_db
from app.services.meta_leads import ingest_meta_lead_webhook, verify_meta_webhook

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.get("/meta/leads")
def verify_meta_leads_webhook(
    hub_mode: str | None = Query(default=None, alias="hub.mode"),
    hub_verify_token: str | None = Query(default=None, alias="hub.verify_token"),
    hub_challenge: str | None = Query(default=None, alias="hub.challenge"),
) -> Response:
    challenge = verify_meta_webhook(
        mode=hub_mode,
        verify_token=hub_verify_token,
        challenge=hub_challenge,
    )
    return Response(content=challenge, media_type="text/plain")


@router.post("/meta/leads")
async def receive_meta_leads_webhook(request: Request, db: Session = Depends(get_db)) -> dict[str, Any]:
    payload = await request.json()
    return ingest_meta_lead_webhook(payload, db)