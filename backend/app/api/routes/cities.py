from fastapi import APIRouter, HTTPException

from app.schemas.city import CityResponse
from app.services.catalog import get_city_catalog, get_city_by_slug

router = APIRouter(prefix="/cities", tags=["cities"])


@router.get("", response_model=list[CityResponse])
async def list_cities() -> list[CityResponse]:
    return get_city_catalog()


@router.get("/{city_slug}", response_model=CityResponse)
async def get_city(city_slug: str) -> CityResponse:
    city = get_city_by_slug(city_slug)
    if city is None:
        raise HTTPException(status_code=404, detail="City not found")
    return city
