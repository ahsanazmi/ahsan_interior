from datetime import date, timezone, datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func as sa_func

from app.core.deps import allow_admin_or_cron, require_admin
from app.db import get_db
from app.models.appointment import Appointment
from app.models.lead import Lead
from app.models.marketing_campaign import MarketingCampaign
from app.models.price_calculation import PriceCalculation
from app.models.quote import QuoteRequest
from app.models.review import Review
from app.models.user import User
from app.schemas.admin import (
    AppointmentOut,
    DashboardStats,
    MarketingCampaignCreate,
    MarketingCampaignOut,
    MarketingCampaignUpdate,
)
from app.schemas.appointment import AppointmentCreate
from app.services.marketing import dispatch_marketing_campaign

router = APIRouter(prefix="/admin", tags=["admin"])


def _campaign_out(row: MarketingCampaign) -> MarketingCampaignOut:
    return MarketingCampaignOut(
        id=row.id,
        external_id=row.external_id,
        campaign_name=row.campaign_name,
        channel=row.channel,
        audience=row.audience,
        subject=row.subject,
        body=row.body,
        cta_text=row.cta_text,
        cta_url=row.cta_url,
        scheduled_for=row.scheduled_for,
        status=row.status,
        total_recipients=row.total_recipients,
        sent_count=row.sent_count,
        last_error=row.last_error,
        created_at=row.created_at,
        sent_at=row.sent_at,
    )


@router.get("/marketing-campaigns", response_model=list[MarketingCampaignOut])
def list_marketing_campaigns(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[MarketingCampaignOut]:
    rows = db.query(MarketingCampaign).order_by(MarketingCampaign.created_at.desc()).limit(100).all()
    return [_campaign_out(row) for row in rows]


@router.post("/marketing-campaigns", response_model=MarketingCampaignOut, status_code=status.HTTP_201_CREATED)
def create_marketing_campaign(
    payload: MarketingCampaignCreate,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> MarketingCampaignOut:
    campaign = MarketingCampaign(
        campaign_name=payload.campaign_name,
        channel=payload.channel,
        audience=payload.audience,
        subject=payload.subject,
        body=payload.body,
        cta_text=payload.cta_text,
        cta_url=payload.cta_url,
        scheduled_for=payload.scheduled_for,
        status="scheduled" if payload.scheduled_for else "draft",
    )
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return _campaign_out(campaign)


@router.put("/marketing-campaigns/{campaign_id}", response_model=MarketingCampaignOut)
def update_marketing_campaign(
    campaign_id: int,
    payload: MarketingCampaignUpdate,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> MarketingCampaignOut:
    campaign = db.query(MarketingCampaign).filter(MarketingCampaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    for field in ["campaign_name", "channel", "audience", "subject", "body", "cta_text", "cta_url", "scheduled_for", "status"]:
        value = getattr(payload, field)
        if value is not None:
            setattr(campaign, field, value)

    if campaign.status == "draft" and campaign.scheduled_for:
        campaign.status = "scheduled"

    db.commit()
    db.refresh(campaign)
    return _campaign_out(campaign)


@router.delete("/marketing-campaigns/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_marketing_campaign(
    campaign_id: int,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> None:
    campaign = db.query(MarketingCampaign).filter(MarketingCampaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    db.delete(campaign)
    db.commit()


@router.post("/marketing-campaigns/{campaign_id}/send", response_model=MarketingCampaignOut)
def send_marketing_campaign_now(
    campaign_id: int,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> MarketingCampaignOut:
    campaign = db.query(MarketingCampaign).filter(MarketingCampaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return _campaign_out(dispatch_marketing_campaign(db, campaign))


@router.post("/marketing-campaigns/dispatch-due")
def dispatch_due_marketing_campaigns(
    _auth: User | None = Depends(allow_admin_or_cron),
    db: Session = Depends(get_db),
):
    now = datetime.now(timezone.utc)
    due_campaigns = (
        db.query(MarketingCampaign)
        .filter(MarketingCampaign.status == "scheduled")
        .filter(MarketingCampaign.scheduled_for != None)
        .filter(MarketingCampaign.scheduled_for <= now)
        .order_by(MarketingCampaign.scheduled_for.asc())
        .all()
    )

    processed: list[str] = []
    for campaign in due_campaigns:
        processed.append(campaign.external_id)
        dispatch_marketing_campaign(db, campaign)

    return {"processed": len(processed), "campaigns": processed}


@router.get("/stats", response_model=DashboardStats)
def admin_stats(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> DashboardStats:
    today = date.today()
    total_appointments = db.query(sa_func.count(Appointment.id)).scalar() or 0
    today_appointments = (
        db.query(sa_func.count(Appointment.id))
        .filter(Appointment.preferred_date == today)
        .scalar()
        or 0
    )
    total_leads = db.query(sa_func.count(Lead.id)).scalar() or 0
    total_quotes = db.query(sa_func.count(QuoteRequest.id)).scalar() or 0
    total_price_calculations = db.query(sa_func.count(PriceCalculation.id)).scalar() or 0
    total_users = db.query(sa_func.count(User.id)).filter(User.role == "user").scalar() or 0
    return DashboardStats(
        total_appointments=total_appointments,
        today_appointments=today_appointments,
        total_leads=total_leads,
        total_quotes=total_quotes,
        total_price_calculations=total_price_calculations,
        total_users=total_users,
    )


@router.get("/appointments", response_model=list[AppointmentOut])
def list_appointments(
    search: str | None = None,
    status: str | None = None,
    city: str | None = None,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[AppointmentOut]:
    query = db.query(Appointment)
    
    if search:
        query = query.filter(
            (Appointment.name.ilike(f"%{search}%")) |
            (Appointment.email.ilike(f"%{search}%")) |
            (Appointment.phone.ilike(f"%{search}%"))
        )
    
    if status:
        query = query.filter(Appointment.status == status)
    
    if city:
        query = query.filter(Appointment.city.ilike(f"%{city}%"))
    
    rows = query.order_by(Appointment.created_at.desc()).limit(100).all()
    return [
        AppointmentOut(
            id=r.id,
            external_id=r.external_id,
            name=r.name,
            email=r.email,
            phone=r.phone,
            city=r.city,
            preferred_date=r.preferred_date,
            preferred_time=r.preferred_time.strftime("%H:%M"),
            scheduled_for=r.scheduled_for,
            whatsapp_updates=r.whatsapp_updates,
            notes=r.notes,
            status=r.status,
            email_sent=r.email_sent,
            reminder_sent=r.reminder_sent,
            source=r.source,
            created_at=r.created_at,
        )
        for r in rows
    ]


@router.get("/appointments/export/csv")
def export_appointments_csv(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Export all appointments as CSV"""
    from io import StringIO
    import csv
    
    rows = db.query(Appointment).order_by(Appointment.created_at.desc()).all()
    
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Name", "Email", "Phone", "City", "Date", "Time", "Status", "Source", "Notes", "Created"])
    
    for r in rows:
        writer.writerow([
            r.external_id,
            r.name,
            r.email,
            r.phone,
            r.city,
            r.preferred_date,
            r.preferred_time.strftime("%H:%M"),
            r.status,
            r.source,
            r.notes or "",
            r.created_at.strftime("%Y-%m-%d %H:%M")
        ])
    
    return {
        "filename": "appointments.csv",
        "content": output.getvalue()
    }


@router.get("/leads")
def list_leads(
    search: str | None = None,
    city: str | None = None,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    query = db.query(Lead)
    
    if search:
        query = query.filter(
            (Lead.name.ilike(f"%{search}%")) |
            (Lead.email.ilike(f"%{search}%")) |
            (Lead.phone.ilike(f"%{search}%"))
        )
    
    if city:
        query = query.filter(Lead.city.ilike(f"%{city}%"))
    
    rows = query.order_by(Lead.created_at.desc()).limit(100).all()
    return [
        {
            "id": r.id,
            "external_id": r.external_id,
            "name": r.name,
            "email": r.email,
            "phone": r.phone,
            "city": r.city,
            "query_type": r.query_type,
            "message": r.message,
            "whatsapp_updates": r.whatsapp_updates,
            "source": r.source,
            "created_at": r.created_at.isoformat(),
        }
        for r in rows
    ]


@router.get("/quotes")
def list_quotes(
    search: str | None = None,
    city: str | None = None,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    query = db.query(QuoteRequest)
    
    if search:
        query = query.filter(
            (QuoteRequest.name.ilike(f"%{search}%")) |
            (QuoteRequest.email.ilike(f"%{search}%"))
        )
    
    if city:
        query = query.filter(QuoteRequest.city.ilike(f"%{city}%"))
    
    rows = query.order_by(QuoteRequest.created_at.desc()).limit(100).all()
    return [
        {
            "id": r.id,
            "external_id": r.external_id,
            "name": r.name,
            "email": r.email,
            "phone": r.phone,
            "city": r.city,
            "scope": r.scope,
            "bhk": r.bhk,
            "rooms": r.rooms,
            "package": r.package,
            "whatsapp_updates": r.whatsapp_updates,
            "created_at": r.created_at.isoformat(),
        }
        for r in rows
    ]


@router.get("/reviews")
def list_reviews(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    rows = db.query(Review).order_by(Review.created_at.desc()).limit(300).all()
    return [
        {
            "id": r.external_id,
            "name": r.name,
            "city": r.city,
            "service": r.service,
            "rating": r.rating,
            "title": r.title,
            "review": r.review,
            "created_at": r.created_at.isoformat(),
        }
        for r in rows
    ]


@router.delete("/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(
    review_id: str,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    review = db.query(Review).filter(Review.external_id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()


# ── Delete Appointments ──
@router.delete("/appointments/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(
    appointment_id: int,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Delete an appointment by ID"""
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(appointment)
    db.commit()


# ── Update Appointment ──
@router.put("/appointments/{appointment_id}", response_model=AppointmentOut)
def update_appointment(
    appointment_id: int,
    payload: AppointmentCreate,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Update an existing appointment and send status notification email"""
    from app.services.email_service import send_status_update_email
    
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    old_status = appointment.status
    
    appointment.name = payload.name
    appointment.email = payload.email
    appointment.phone = payload.phone
    appointment.city = payload.city
    appointment.preferred_date = payload.preferred_date
    appointment.preferred_time = payload.preferred_time
    appointment.whatsapp_updates = payload.whatsapp_updates
    appointment.notes = payload.notes
    appointment.status = payload.status
    
    # Send email notification if status changed
    if old_status != payload.status and payload.status in ["confirmed", "completed", "cancelled"]:
        email_sent = send_status_update_email(
            name=appointment.name,
            email=appointment.email,
            status=payload.status,
            city=appointment.city
        )
        appointment.email_sent = email_sent
    
    db.commit()
    db.refresh(appointment)
    
    return AppointmentOut(
        id=appointment.id,
        external_id=appointment.external_id,
        name=appointment.name,
        email=appointment.email,
        phone=appointment.phone,
        city=appointment.city,
        preferred_date=appointment.preferred_date,
        preferred_time=appointment.preferred_time.strftime("%H:%M"),
        scheduled_for=appointment.scheduled_for,
        whatsapp_updates=appointment.whatsapp_updates,
        notes=appointment.notes,
        source=appointment.source,
        status=appointment.status,
        email_sent=appointment.email_sent,
        reminder_sent=appointment.reminder_sent,
        created_at=appointment.created_at,
    )


# ── Delete Quote ──
@router.delete("/quotes/{quote_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quote(
    quote_id: int,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Delete a quote request by ID"""
    quote = db.query(QuoteRequest).filter(QuoteRequest.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    db.delete(quote)
    db.commit()


# ── Update Quote ──
@router.put("/quotes/{quote_id}")
def update_quote(
    quote_id: int,
    payload: dict,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Update an existing quote request"""
    quote = db.query(QuoteRequest).filter(QuoteRequest.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    # Update fields if provided
    if "name" in payload:
        quote.name = payload["name"]
    if "email" in payload:
        quote.email = payload["email"]
    if "phone" in payload:
        quote.phone = payload["phone"]
    if "city" in payload:
        quote.city = payload["city"]
    if "scope" in payload:
        quote.scope = payload["scope"]
    if "bhk" in payload:
        quote.bhk = payload["bhk"]
    if "rooms" in payload:
        quote.rooms = payload["rooms"]
    if "package" in payload:
        quote.package = payload["package"]
    if "whatsapp_updates" in payload:
        quote.whatsapp_updates = payload["whatsapp_updates"]
    
    db.commit()
    db.refresh(quote)
    
    return {
        "id": quote.id,
        "external_id": quote.external_id,
        "name": quote.name,
        "email": quote.email,
        "phone": quote.phone,
        "city": quote.city,
        "scope": quote.scope,
        "bhk": quote.bhk,
        "rooms": quote.rooms,
        "package": quote.package,
        "whatsapp_updates": quote.whatsapp_updates,
        "created_at": quote.created_at.isoformat(),
    }


# ── Delete Lead ──
@router.delete("/leads/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lead(
    lead_id: int,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Delete a lead by ID"""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    db.delete(lead)
    db.commit()


# ── Update Lead ──
@router.put("/leads/{lead_id}")
def update_lead(
    lead_id: int,
    payload: dict,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Update an existing lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    if "name" in payload:
        lead.name = payload["name"]
    if "email" in payload:
        lead.email = payload["email"]
    if "phone" in payload:
        lead.phone = payload["phone"]
    if "city" in payload:
        lead.city = payload["city"]
    if "query_type" in payload:
        lead.query_type = payload["query_type"]
    if "message" in payload:
        lead.message = payload["message"]
    if "whatsapp_updates" in payload:
        lead.whatsapp_updates = payload["whatsapp_updates"]
    if "source" in payload:
        lead.source = payload["source"]
    
    db.commit()
    db.refresh(lead)
    
    return {
        "id": lead.id,
        "external_id": lead.external_id,
        "name": lead.name,
        "email": lead.email,
        "phone": lead.phone,
        "city": lead.city,
        "query_type": lead.query_type,
        "message": lead.message,
        "whatsapp_updates": lead.whatsapp_updates,
        "source": lead.source,
        "created_at": lead.created_at.isoformat(),
    }


# ── Price Calculations ──
@router.get("/price-calculations")
def list_price_calculations(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """List all price calculations from users"""
    rows = db.query(PriceCalculation).order_by(PriceCalculation.created_at.desc()).limit(100).all()
    return [
        {
            "id": r.id,
            "external_id": r.external_id,
            "name": r.name,
            "email": r.email,
            "phone": r.phone,
            "city": r.city,
            "scope": r.scope,
            "bhk": r.bhk,
            "rooms": r.rooms,
            "package": r.package,
            "home_type": r.home_type,
            "total_price": r.total_price,
            "whatsapp_updates": r.whatsapp_updates,
            "notes": r.notes,
            "created_at": r.created_at.isoformat(),
        }
        for r in rows
    ]


# ── Delete Price Calculation ──
@router.delete("/price-calculations/{calculation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_price_calculation(
    calculation_id: int,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Delete a price calculation by ID"""
    calc = db.query(PriceCalculation).filter(PriceCalculation.id == calculation_id).first()
    if not calc:
        raise HTTPException(status_code=404, detail="Price calculation not found")
    db.delete(calc)
    db.commit()


# ── Update Price Calculation ──
@router.put("/price-calculations/{calculation_id}")
def update_price_calculation(
    calculation_id: int,
    payload: dict,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """Update an existing price calculation"""
    calc = db.query(PriceCalculation).filter(PriceCalculation.id == calculation_id).first()
    if not calc:
        raise HTTPException(status_code=404, detail="Price calculation not found")
    
    # Update fields if provided
    if "name" in payload:
        calc.name = payload["name"]
    if "email" in payload:
        calc.email = payload["email"]
    if "phone" in payload:
        calc.phone = payload["phone"]
    if "city" in payload:
        calc.city = payload["city"]
    if "scope" in payload:
        calc.scope = payload["scope"]
    if "bhk" in payload:
        calc.bhk = payload["bhk"]
    if "rooms" in payload:
        calc.rooms = payload["rooms"]
    if "package" in payload:
        calc.package = payload["package"]
    if "home_type" in payload:
        calc.home_type = payload["home_type"]
    if "total_price" in payload:
        calc.total_price = payload["total_price"]
    if "whatsapp_updates" in payload:
        calc.whatsapp_updates = payload["whatsapp_updates"]
    if "notes" in payload:
        calc.notes = payload["notes"]
    
    db.commit()
    db.refresh(calc)
    
    return {
        "id": calc.id,
        "external_id": calc.external_id,
        "name": calc.name,
        "email": calc.email,
        "phone": calc.phone,
        "city": calc.city,
        "scope": calc.scope,
        "bhk": calc.bhk,
        "rooms": calc.rooms,
        "package": calc.package,
        "home_type": calc.home_type,
        "total_price": calc.total_price,
        "whatsapp_updates": calc.whatsapp_updates,
        "notes": calc.notes,
        "created_at": calc.created_at.isoformat(),
    }
