from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.quote import QuoteCreate, QuoteResponse
from app.services.quotes import create_quote

router = APIRouter(prefix="/quotes", tags=["quotes"])


@router.post("", response_model=QuoteResponse, status_code=status.HTTP_201_CREATED)
def submit_quote(payload: QuoteCreate, db: Session = Depends(get_db)) -> QuoteResponse:
    return create_quote(payload, db)
