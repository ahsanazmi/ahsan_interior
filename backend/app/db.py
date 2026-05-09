from collections.abc import Generator
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


class Base(DeclarativeBase):
    pass


_database_url = settings.database_url
# Some hosted providers (Neon, Heroku, etc.) provide DATABASE_URL as
# `postgres://...` or `postgresql://...`. SQLAlchemy will try to load the
# `psycopg2` DBAPI for plain `postgresql://`. We use psycopg (psycopg3), so
# normalize common prefixes to `postgresql+psycopg://` to avoid
# ModuleNotFoundError: No module named 'psycopg2'
if _database_url.startswith("postgres://"):
    _database_url = _database_url.replace("postgres://", "postgresql+psycopg://", 1)
elif _database_url.startswith("postgresql://") and "+psycopg" not in _database_url:
    _database_url = _database_url.replace("postgresql://", "postgresql+psycopg://", 1)

_pool_size = int(os.getenv("DB_POOL_SIZE", "5"))
_max_overflow = int(os.getenv("DB_MAX_OVERFLOW", "10"))

engine = create_engine(
    _database_url,
    pool_pre_ping=True,
    pool_size=_pool_size,
    max_overflow=_max_overflow,
    future=True,
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    from app.models import (  # noqa
        account_otp,
        appointment,
        blog,
        calculator,
        image,
        lead,
        marketing_campaign,
        offer,
        price_calculation,
        quote,
        user,
    )

    Base.metadata.create_all(bind=engine)
