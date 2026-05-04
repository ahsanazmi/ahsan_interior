import uuid
from datetime import date, datetime, time

from sqlalchemy import Date, DateTime, String, Time, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    external_id: Mapped[str] = mapped_column(
        String(36),
        unique=True,
        index=True,
        default=lambda: str(uuid.uuid4())
    )

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    city: Mapped[str] = mapped_column(String(120), nullable=False, index=True)

    preferred_date: Mapped[date] = mapped_column(Date, nullable=False)
    preferred_time: Mapped[time] = mapped_column(Time, nullable=False)

    scheduled_for: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    whatsapp_updates: Mapped[bool] = mapped_column(
        default=True,
        server_default="true"
    )

    notes: Mapped[str | None] = mapped_column(String(500), nullable=True)
    
    status: Mapped[str] = mapped_column(
        String(20),
        default="pending",
        nullable=False
    )  # pending, confirmed, completed, cancelled

    source: Mapped[str] = mapped_column(
        String(120),
        default="website"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    
    email_sent: Mapped[bool] = mapped_column(
        default=False,
        server_default="false",
        nullable=False
    )
    
    reminder_sent: Mapped[bool] = mapped_column(
        default=False,
        server_default="false",
        nullable=False
    )
