from uuid import uuid4

from sqlalchemy.orm import Session

from app.schemas.lead import LeadCreate, LeadResponse
from app.models.lead import Lead


def _persist_lead(*, name: str, email: str, phone: str, city: str, whatsapp_updates: bool, source: str, db: Session) -> LeadResponse:
    lead_id = str(uuid4())
    lead = Lead(
        external_id=lead_id,
        name=name,
        email=email,
        phone=phone,
        city=city,
        whatsapp_updates=whatsapp_updates,
        source=source,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return LeadResponse.from_city(lead_id=lead_id, city=city)


def create_lead(payload: LeadCreate, db: Session) -> LeadResponse:
    return _persist_lead(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        whatsapp_updates=payload.whatsapp_updates,
        source=payload.source,
        db=db,
    )


def create_meta_lead(
    *,
    name: str,
    email: str,
    phone: str,
    city: str,
    whatsapp_updates: bool = False,
    source: str = "meta-lead-ads",
    db: Session,
) -> LeadResponse:
    return _persist_lead(
        name=name,
        email=email,
        phone=phone,
        city=city,
        whatsapp_updates=whatsapp_updates,
        source=source,
        db=db,
    )
