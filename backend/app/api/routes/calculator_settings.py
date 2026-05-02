import json

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.deps import require_admin
from app.db import get_db
from app.models.calculator import CalculatorSettings
from app.models.user import User

router = APIRouter(tags=["calculator-settings"])

DEFAULT_BHK_MULTIPLIERS = {
    "1 BHK": 1,
    "2 BHK": 1.35,
    "3 BHK": 1.75,
    "4 BHK": 2.25,
    "5 BHK+": 2.8,
}
DEFAULT_ROOM_PRICES = {
    "Living Room": 85000,
    "Kitchen": 140000,
    "Bedroom": 90000,
    "Bathroom": 55000,
    "Dining": 65000,
}
DEFAULT_PACKAGE_MULTIPLIERS = {
    "Essentials": 1,
    "Premium": 1.35,
    "Luxe": 1.75,
}


class CalculatorSettingsPayload(BaseModel):
    base_price: float = Field(gt=0)
    bhk_multipliers: dict[str, float]
    room_prices: dict[str, float]
    package_multipliers: dict[str, float]
    new_home_multiplier: float = Field(gt=0)
    renovation_multiplier: float = Field(gt=0)


class CalculatorSettingsOut(CalculatorSettingsPayload):
    id: int
    updated_at: str


@router.get("/calculator-settings", response_model=CalculatorSettingsOut)
def public_calculator_settings(db: Session = Depends(get_db)) -> CalculatorSettingsOut:
    return _to_out(_get_or_create(db))


@router.get("/admin/calculator-settings", response_model=CalculatorSettingsOut)
def admin_calculator_settings(
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> CalculatorSettingsOut:
    return _to_out(_get_or_create(db))


@router.put("/admin/calculator-settings", response_model=CalculatorSettingsOut)
def update_calculator_settings(
    payload: CalculatorSettingsPayload,
    _admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> CalculatorSettingsOut:
    settings = _get_or_create(db)
    settings.base_price = payload.base_price
    settings.bhk_multipliers = json.dumps(payload.bhk_multipliers)
    settings.room_prices = json.dumps(payload.room_prices)
    settings.package_multipliers = json.dumps(payload.package_multipliers)
    settings.new_home_multiplier = payload.new_home_multiplier
    settings.renovation_multiplier = payload.renovation_multiplier
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return _to_out(settings)


def _get_or_create(db: Session) -> CalculatorSettings:
    settings = db.query(CalculatorSettings).order_by(CalculatorSettings.id.asc()).first()
    if settings:
        return settings

    settings = CalculatorSettings(
        base_price=75000,
        bhk_multipliers=json.dumps(DEFAULT_BHK_MULTIPLIERS),
        room_prices=json.dumps(DEFAULT_ROOM_PRICES),
        package_multipliers=json.dumps(DEFAULT_PACKAGE_MULTIPLIERS),
        new_home_multiplier=1,
        renovation_multiplier=1.15,
    )
    db.add(settings)
    db.commit()
    db.refresh(settings)
    return settings


def _to_out(settings: CalculatorSettings) -> CalculatorSettingsOut:
    return CalculatorSettingsOut(
        id=settings.id,
        base_price=settings.base_price,
        bhk_multipliers=json.loads(settings.bhk_multipliers),
        room_prices=json.loads(settings.room_prices),
        package_multipliers=json.loads(settings.package_multipliers),
        new_home_multiplier=settings.new_home_multiplier,
        renovation_multiplier=settings.renovation_multiplier,
        updated_at=settings.updated_at.isoformat(),
    )
