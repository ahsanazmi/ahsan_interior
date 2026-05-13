from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class CalculatorSettings(Base):
    __tablename__ = "calculator_settings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    base_price: Mapped[float] = mapped_column(Float, nullable=False, default=75000)
    bhk_multipliers: Mapped[str] = mapped_column(Text, nullable=False)
    room_prices: Mapped[str] = mapped_column(Text, nullable=False)
    package_multipliers: Mapped[str] = mapped_column(Text, nullable=False)
    new_home_multiplier: Mapped[float] = mapped_column(Float, nullable=False, default=1)
    renovation_multiplier: Mapped[float] = mapped_column(Float, nullable=False, default=1.15)
    villa_design_multiplier: Mapped[float] = mapped_column(Float, nullable=False, default=1.25)
    office_design_multiplier: Mapped[float] = mapped_column(Float, nullable=False, default=1.2)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )
