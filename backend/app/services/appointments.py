import random
from datetime import datetime, timedelta, timezone
from uuid import uuid4

from sqlalchemy.orm import Session

from app.schemas.appointment import AppointmentCreate, AppointmentResponse
from app.core.security import hash_password
from app.models.account_otp import AccountOtp
from app.models.appointment import Appointment
from app.models.user import User
from app.services.notifications import (
    send_account_otp,
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
    if existing_user is None:
        otp = _create_account_otp(appointment, db)
        send_account_otp(
            phone=payload.phone,
            name=payload.name,
            otp=otp,
        )
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
            "OTP sent to your mobile number by SMS."
            if existing_user is None
            else "Product details were sent to your email."
        ),
        whatsapp_contact_url=whatsapp_contact_url(
            f"Hi, I booked appointment {appointment_id} and want product details."
        ),
    )


def _create_account_otp(appointment: Appointment, db: Session) -> str:
    otp = f"{random.SystemRandom().randint(100000, 999999)}"
    db.query(AccountOtp).filter(
        AccountOtp.appointment_external_id == appointment.external_id,
        AccountOtp.email == appointment.email,
        AccountOtp.used.is_(False),
    ).update({"used": True})

    row = AccountOtp(
        appointment_external_id=appointment.external_id,
        name=appointment.name,
        email=appointment.email,
        phone=appointment.phone,
        city=appointment.city,
        otp_hash=hash_password(otp),
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=10),
    )
    db.add(row)
    db.commit()
    return otp
