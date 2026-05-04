from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.price_calculation import PriceCalculation
from app.schemas.price_calculation import PriceCalculationCreate, PriceCalculationOut

router = APIRouter(prefix="/price-calculations", tags=["price-calculations"])


@router.post("", response_model=PriceCalculationOut, status_code=status.HTTP_201_CREATED)
def save_price_calculation(
    payload: PriceCalculationCreate,
    db: Session = Depends(get_db),
) -> PriceCalculationOut:
    """Save a price calculation from the calculator"""
    calc = PriceCalculation(**payload.model_dump())
    db.add(calc)
    db.commit()
    db.refresh(calc)
    return PriceCalculationOut.model_validate(calc)
