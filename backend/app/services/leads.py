from uuid import uuid4

from sqlalchemy.orm import Session

from app.schemas.lead import LeadCreate, LeadResponse
from app.models.lead import Lead


def create_lead(payload: LeadCreate, db: Session) -> LeadResponse:
    lead_id = str(uuid4())
    lead = Lead(
        external_id=lead_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        whatsapp_updates=payload.whatsapp_updates,
        source=payload.source,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return LeadResponse.from_city(lead_id=lead_id, city=payload.city)
