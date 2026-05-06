from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.appointment import Appointment
from app.models.lead import Lead
from app.models.marketing_campaign import MarketingCampaign
from app.models.user import User
from app.services.notifications import send_marketing_email, send_marketing_whatsapp


def list_marketing_recipients(db: Session, audience: str) -> list[dict[str, str]]:
    recipients: list[dict[str, str]] = []
    seen: set[tuple[str | None, str | None]] = set()

    def add_recipient(*, name: str, email: str | None, phone: str | None, city: str | None) -> None:
        key = (email or None, phone or None)
        if key in seen:
            return
        seen.add(key)
        recipients.append(
            {
                "name": name,
                "email": email or "",
                "phone": phone or "",
                "city": city or "",
            }
        )

    if audience in {"leads", "all"}:
        for row in db.query(Lead).order_by(Lead.created_at.desc()).all():
            add_recipient(name=row.name, email=row.email, phone=row.phone, city=row.city)

    if audience in {"appointments", "all"}:
        for row in db.query(Appointment).order_by(Appointment.created_at.desc()).all():
            add_recipient(name=row.name, email=row.email, phone=row.phone, city=row.city)

    if audience in {"users", "all"}:
        for row in db.query(User).filter(User.role == "user").order_by(User.created_at.desc()).all():
            add_recipient(name=row.name, email=row.email, phone=row.phone, city=row.city)

    return recipients


def dispatch_marketing_campaign(db: Session, campaign: MarketingCampaign) -> MarketingCampaign:
    recipients = list_marketing_recipients(db, campaign.audience)
    campaign.total_recipients = len(recipients)
    campaign.sent_count = 0
    campaign.last_error = None
    campaign.status = "sending"
    db.commit()

    sent_count = 0
    try:
        for recipient in recipients:
            if campaign.channel in {"email", "both"} and recipient["email"]:
                send_marketing_email(
                    to_email=recipient["email"],
                    name=recipient["name"],
                    subject=campaign.subject,
                    body=campaign.body,
                    cta_text=campaign.cta_text,
                    cta_url=campaign.cta_url,
                    city=recipient["city"] or None,
                )
            if campaign.channel in {"whatsapp", "both"} and recipient["phone"]:
                send_marketing_whatsapp(
                    phone=recipient["phone"],
                    name=recipient["name"],
                    body=campaign.body,
                    city=recipient["city"] or None,
                )
            sent_count += 1

        campaign.sent_count = sent_count
        campaign.status = "sent"
        campaign.sent_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(campaign)
        return campaign
    except Exception as exc:
        campaign.status = "failed"
        campaign.last_error = str(exc)
        db.commit()
        db.refresh(campaign)
        return campaign
