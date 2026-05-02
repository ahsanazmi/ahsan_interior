from datetime import date, datetime, time, timezone
from pydantic import BaseModel, EmailStr, Field


class AppointmentCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    city: str = Field(min_length=2, max_length=120)

    preferred_date: date
    preferred_time: time

    whatsapp_updates: bool = True
    notes: str | None = Field(default=None, max_length=500)
    source: str = Field(default="appointment-form", max_length=120)


class AppointmentResponse(BaseModel):
    external_id: str
    message: str
    city: str
    account_setup_available: bool = True
    otp_delivery_message: str | None = None
    whatsapp_contact_url: str | None = None

    preferred_date: date
    preferred_time: time
    scheduled_for: datetime

    created_at: datetime

    @classmethod
    def from_payload(
        cls,
        *,
        external_id: str,
        city: str,
        preferred_date: date,
        preferred_time: time,
        created_at: datetime,
        account_setup_available: bool = True,
        otp_delivery_message: str | None = None,
        whatsapp_contact_url: str | None = None,
    ) -> "AppointmentResponse":

        scheduled_for = datetime.combine(
            preferred_date,
            preferred_time,
            tzinfo=timezone.utc
        )

        return cls(
            external_id=external_id,
            message="Appointment booked successfully",
            city=city,
            account_setup_available=account_setup_available,
            otp_delivery_message=otp_delivery_message,
            whatsapp_contact_url=whatsapp_contact_url,
            preferred_date=preferred_date,
            preferred_time=preferred_time,
            scheduled_for=scheduled_for,
            created_at=created_at,
        )
