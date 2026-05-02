from app.schemas.city import CityResponse


_CITY_CATALOG: list[CityResponse] = [
    CityResponse(
        slug="agra",
        name="Agra",
        headline="Interior Designers in Agra",
        description="Turn your dream home into reality with the best interior designers in Agra.",
        experience_center="Livspace Experience Center, Agra",
        address="1st floor, Sanjay Palace, Civil Lines, Agra, Uttar Pradesh 282002",
        timings="Monday to Saturday | 10 AM - 8 PM",
        phone="+91 8047759147",
        appointment_types=["Experience Centre Tour - 30 minutes", "Design consultation - 60 minutes"],
    ),
    CityResponse(
        slug="mumbai",
        name="Mumbai",
        headline="Interior Designers in Mumbai",
        description="Create a home that feels premium, practical, and personal in Mumbai.",
        experience_center="Livspace Experience Center, Mumbai",
        address="Andheri East, Mumbai, Maharashtra 400069",
        timings="Monday to Saturday | 10 AM - 8 PM",
        phone="+91 8047759147",
        appointment_types=["Experience Centre Tour - 30 minutes", "Design consultation - 60 minutes"],
    ),
    CityResponse(
        slug="hyderabad",
        name="Hyderabad",
        headline="Interior Designers in Hyderabad",
        description="Plan a functional home with a refined design language in Hyderabad.",
        experience_center="Livspace Experience Center, Hyderabad",
        address="HITEC City, Hyderabad, Telangana 500081",
        timings="Monday to Saturday | 10 AM - 8 PM",
        phone="+91 8047759147",
        appointment_types=["Experience Centre Tour - 30 minutes", "Design consultation - 60 minutes"],
    ),
]


def get_city_catalog() -> list[CityResponse]:
    return _CITY_CATALOG


def get_city_by_slug(city_slug: str) -> CityResponse | None:
    normalized_slug = city_slug.strip().lower()
    for city in _CITY_CATALOG:
        if city.slug == normalized_slug:
            return city
    return None
