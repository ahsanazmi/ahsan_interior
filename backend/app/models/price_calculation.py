from datetime import datetime
import uuid

from sqlalchemy import DateTime, Float, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class PriceCalculation(Base):
    __tablename__ = "price_calculations"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    external_id: Mapped[str] = mapped_column(String(36), unique=True, index=True, default=lambda: str(uuid.uuid4()))
    
    # User details
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    city: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    
    # Calculation inputs
    scope: Mapped[str] = mapped_column(String(120), nullable=False)  # e.g., "full", "partial"
    bhk: Mapped[str] = mapped_column(String(20), nullable=False)     # e.g., "2BHK", "3BHK"
    rooms: Mapped[str] = mapped_column(Text, nullable=False)         # JSON string
    package: Mapped[str] = mapped_column(String(50), nullable=False) # e.g., "luxury", "standard"
    home_type: Mapped[str] = mapped_column(String(50), nullable=False) # "new_home" or "renovation"
    
    # Calculated result
    total_price: Mapped[float] = mapped_column(Float, nullable=False)
    
    # Additional info
    whatsapp_updates: Mapped[bool] = mapped_column(nullable=False, default=True)
    notes: Mapped[str | None] = mapped_column(String(500), nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
