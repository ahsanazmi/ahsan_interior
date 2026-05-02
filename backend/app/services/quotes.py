import uuid

from sqlalchemy.orm import Session

from app.models.quote import QuoteRequest
from app.schemas.quote import QuoteCreate, QuoteResponse


def create_quote(payload: QuoteCreate, db: Session) -> QuoteResponse:
    external_id = str(uuid.uuid4())
    quote = QuoteRequest(
        external_id=external_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        whatsapp_updates=payload.whatsapp_updates,
        scope=payload.scope,
        bhk=payload.bhk,
        rooms=payload.rooms,
        package=payload.package,
    )
    db.add(quote)
    db.commit()
    return QuoteResponse.success(quote_id=external_id)
