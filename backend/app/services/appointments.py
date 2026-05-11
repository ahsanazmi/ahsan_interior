from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy.orm import Session

from app.schemas.appointment import AppointmentCreate, AppointmentResponse
from app.models.appointment import Appointment
from app.models.user import User
from app.services.notifications import (
    send_appointment_product_email,
    send_whatsapp_appointment_update,
    whatsapp_contact_url,
)


def create_appointment(payload: AppointmentCreate, db: Session) -> AppointmentResponse:
    appointment_id = str(uuid4())
    scheduled_for = datetime.combine(payload.preferred_date, payload.preferred_time).replace(tzinfo=timezone.utc)

    appointment = Appointment(
        external_id=appointment_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        preferred_date=payload.preferred_date,
        preferred_time=payload.preferred_time,
        scheduled_for=scheduled_for,
        whatsapp_updates=payload.whatsapp_updates,
        notes=payload.notes,
        source=payload.source,
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    existing_user = db.query(User).filter(User.email == payload.email).first()
    appointment_time = scheduled_for.strftime("%d %b %Y, %I:%M %p")
    send_appointment_product_email(
        to_email=payload.email,
        name=payload.name,
        city=payload.city,
        appointment_time=appointment_time,
    )
    # OTP-based account setup is disabled. New users can create a password
    # directly after booking using the appointment id + email.
    if payload.whatsapp_updates:
        send_whatsapp_appointment_update(
            phone=payload.phone,
            name=payload.name,
            city=payload.city,
            appointment_time=appointment_time,
        )

    return AppointmentResponse.from_payload(
        external_id=appointment_id,
        city=payload.city,
        preferred_date=payload.preferred_date,
        preferred_time=payload.preferred_time,
        created_at=appointment.created_at,
        account_setup_available=existing_user is None,
        otp_delivery_message=(
            "Set a password to create your account."
            if existing_user is None
            else "Product details were sent to your email."
        ),
        whatsapp_contact_url=whatsapp_contact_url(
            f"Hi, I booked appointment {appointment_id} and want product details."
        ),
    )
