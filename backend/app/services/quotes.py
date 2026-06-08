import uuid

from sqlalchemy.orm import Session

from app.models.quote import QuoteRequest
from app.schemas.quote import QuoteCreate, QuoteResponse
from app.services.notifications import send_estimate_promotion_email


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

    # Send promotional estimate email to the user
    try:
        send_estimate_promotion_email(
            to_email=payload.email,
            name=payload.name,
            city=payload.city,
            scope=payload.scope,
            bhk=payload.bhk,
            package=payload.package,
            total_price=payload.total_price,
        )
    except Exception as exc:
        print(f"[quotes] Estimate promotion email failed: {exc}")

    return QuoteResponse.success(quote_id=external_id)
