from pydantic import BaseModel


class CityResponse(BaseModel):
    slug: str
    name: str
    headline: str
    description: str
    experience_center: str
    address: str
    timings: str
    phone: str
    appointment_types: list[str]
