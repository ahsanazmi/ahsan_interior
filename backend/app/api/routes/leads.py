from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.leads import create_lead

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def submit_lead(payload: LeadCreate, db: Session = Depends(get_db)) -> LeadResponse:
    return create_lead(payload, db)
