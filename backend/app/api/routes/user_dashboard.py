from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db import get_db
from app.models.appointment import Appointment
from app.models.user import User
from app.schemas.admin import AppointmentOut

router = APIRouter(prefix="/user", tags=["user-dashboard"])


@router.get("/bookings", response_model=list[AppointmentOut])
def my_bookings(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[AppointmentOut]:
    """Return appointments that match the logged-in user's email."""
    rows = (
        db.query(Appointment)
        .filter(Appointment.email == user.email)
        .order_by(Appointment.created_at.desc())
        .all()
    )
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
