from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.deps import require_admin
from app.db import get_db
from app.models.offer import Offer
from app.models.user import User

router = APIRouter(prefix="/admin/offers", tags=["admin-offers"])


class OfferCreate(BaseModel):
    title: str = Field(min_length=3, max_length=300)
    description: str | None = None
    category: str = Field(default="general", max_length=120)
    original_price: float = Field(gt=0)
    offer_price: float = Field(gt=0)
    unit: str = Field(default="per sq.ft.", max_length=50)
    active: bool = True


class OfferOut(BaseModel):
    id: int
    external_id: str
    title: str
    description: str | None
    category: str
    original_price: float
    offer_price: float
    unit: str
    active: bool
    created_at: str

    class Config:
        from_attributes = True


@router.get("", response_model=list[OfferOut])
def list_offers(_admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    rows = db.query(Offer).order_by(Offer.created_at.desc()).all()
    return [_to_out(r) for r in rows]


@router.post("", response_model=OfferOut, status_code=status.HTTP_201_CREATED)
def create_offer(payload: OfferCreate, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    offer = Offer(
        title=payload.title,
        description=payload.description,
        category=payload.category,
        original_price=payload.original_price,
        offer_price=payload.offer_price,
        unit=payload.unit,
        active=payload.active,
    )
    db.add(offer)
    db.commit()
    db.refresh(offer)
    return _to_out(offer)


@router.delete("/{offer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_offer(offer_id: int, _admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    db.delete(offer)
    db.commit()


def _to_out(r: Offer) -> OfferOut:
    return OfferOut(
        id=r.id,
        external_id=r.external_id,
        title=r.title,
        description=r.description,
        category=r.category,
        original_price=float(r.original_price),
        offer_price=float(r.offer_price),
        unit=r.unit,
        active=r.active,
        created_at=r.created_at.isoformat(),
    )
