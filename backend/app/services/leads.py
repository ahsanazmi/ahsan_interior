from uuid import uuid4

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.notifications import send_marketing_email
from app.services.mailer import send_email


def _persist_lead(
    *,
    name: str,
    email: str,
    phone: str,
    city: str,
    query_type: str,
    message: str | None,
    whatsapp_updates: bool,
    source: str,
    db: Session,
) -> LeadResponse:
    lead_id = str(uuid4())
    lead = Lead(
        external_id=lead_id,
        name=name,
        email=email,
        phone=phone,
        city=city,
        query_type=query_type,
        message=message,
        whatsapp_updates=whatsapp_updates,
        source=source,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)

    # Send a confirmation email to the user after the lead is saved.
    # This should never block the API response if email delivery fails.
    email_sent = False
    try:
        send_marketing_email(
            to_email=email,
            name=name,
            subject=f"Thanks for contacting NextGen Living Space in {city}",
            body=(
                f"Hi {name},\n\n"
                f"Thanks for your interest in our interior design services in {city}.\n"
                f"We have received your lead and our team will contact you soon on {phone}.\n\n"
                f"Query type: {query_type}\n"
                f"City: {city}\n\n"
                f"Regards,\n"
                f"NextGen Living Space"
            ),
            city=city,
        )
        email_sent = True
    except Exception:
        # Email failures should not stop lead creation.
        pass

    # Optional admin copy so new leads are visible in the inbox even if the user email is delayed.
    admin_email = settings.resend_from_email
    if admin_email:
        try:
            send_email(
                to_email=admin_email,
                subject=f"New lead from {name} in {city}",
                body=(
                    f"New lead submitted on the website.\n\n"
                    f"Name: {name}\n"
                    f"Email: {email}\n"
                    f"Phone: {phone}\n"
                    f"City: {city}\n"
                    f"Query type: {query_type}\n"
                    f"Message: {message or 'N/A'}\n"
                    f"User email sent: {email_sent}\n"
                ),
            )
        except Exception:
            pass

    return LeadResponse.from_city(lead_id=lead_id, city=city)


def create_lead(payload: LeadCreate, db: Session) -> LeadResponse:
    return _persist_lead(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        query_type=payload.query_type,
        message=payload.message,
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
    query_type: str = "General query",
    message: str | None = None,
    whatsapp_updates: bool = False,
    source: str = "meta-lead-ads",
    db: Session,
) -> LeadResponse:
    return _persist_lead(
        name=name,
        email=email,
        phone=phone,
        city=city,
        query_type=query_type,
        message=message,
        whatsapp_updates=whatsapp_updates,
        source=source,
        db=db,
    )
