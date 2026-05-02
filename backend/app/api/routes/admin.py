from datetime import date, timezone, datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func as sa_func

from app.core.deps import require_admin
from app.db import get_db
from app.models.appointment import Appointment
from app.models.lead import Lead
from app.models.quote import QuoteRequest
from app.models.user import User
from app.schemas.admin import AppointmentOut, DashboardStats

router = APIRouter(prefix="/admin", tags=["admin"])


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
    total_users = db.query(sa_func.count(User.id)).filter(User.role == "user").scalar() or 0
    return DashboardStats(
        total_appointments=total_appointments,
        today_appointments=today_appointments,
        total_leads=total_leads,
        total_quotes=total_quotes,
        total_users=total_users,
    )


@router.get("/appointments", response_model=list[AppointmentOut])
def list_appointments(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[AppointmentOut]:
    rows = db.query(Appointment).order_by(Appointment.created_at.desc()).limit(100).all()
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
            source=r.source,
            created_at=r.created_at,
        )
        for r in rows
    ]


@router.get("/leads")
def list_leads(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    rows = db.query(Lead).order_by(Lead.created_at.desc()).limit(100).all()
    return [
        {
            "id": r.id,
            "external_id": r.external_id,
            "name": r.name,
            "email": r.email,
            "phone": r.phone,
            "city": r.city,
            "whatsapp_updates": r.whatsapp_updates,
            "source": r.source,
            "created_at": r.created_at.isoformat(),
        }
        for r in rows
    ]


@router.get("/quotes")
def list_quotes(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    rows = db.query(QuoteRequest).order_by(QuoteRequest.created_at.desc()).limit(100).all()
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
