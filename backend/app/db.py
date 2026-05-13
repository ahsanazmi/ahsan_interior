from collections.abc import Generator
import os

from sqlalchemy import create_engine, inspect, text
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


def ensure_compatibility_schema() -> None:
    """Apply lightweight schema fixes needed by newer app versions.

    This ensures required columns exist for backward-compatible deployments.
    Runs synchronously at startup to ensure columns exist before first request.
    """
    import logging
    logger = logging.getLogger(__name__)
    
    try:
        inspector = inspect(engine)

        with engine.begin() as connection:
            if inspector.has_table("leads"):
                lead_columns = {col["name"] for col in inspector.get_columns("leads")}
                needs_query_type = "query_type" not in lead_columns
                needs_message = "message" not in lead_columns

                if needs_query_type:
                    logger.debug("Adding leads.query_type column...")
                    connection.execute(
                        text(
                            """
                            ALTER TABLE leads
                            ADD COLUMN IF NOT EXISTS query_type VARCHAR(120) NOT NULL DEFAULT 'General query'
                            """
                        )
                    )

                if needs_message:
                    logger.debug("Adding leads.message column...")
                    connection.execute(
                        text(
                            """
                            ALTER TABLE leads
                            ADD COLUMN IF NOT EXISTS message VARCHAR(2000) NULL
                            """
                        )
                    )
            else:
                logger.info("leads table does not exist yet; will be created by init_db")

            if inspector.has_table("calculator_settings"):
                calculator_columns = {col["name"] for col in inspector.get_columns("calculator_settings")}
                needs_villa_multiplier = "villa_design_multiplier" not in calculator_columns
                needs_office_multiplier = "office_design_multiplier" not in calculator_columns

                if needs_villa_multiplier:
                    logger.debug("Adding calculator_settings.villa_design_multiplier column...")
                    connection.execute(
                        text(
                            """
                            ALTER TABLE calculator_settings
                            ADD COLUMN IF NOT EXISTS villa_design_multiplier FLOAT NOT NULL DEFAULT 1.25
                            """
                        )
                    )

                if needs_office_multiplier:
                    logger.debug("Adding calculator_settings.office_design_multiplier column...")
                    connection.execute(
                        text(
                            """
                            ALTER TABLE calculator_settings
                            ADD COLUMN IF NOT EXISTS office_design_multiplier FLOAT NOT NULL DEFAULT 1.2
                            """
                        )
                    )
            else:
                logger.info("calculator_settings table does not exist yet; will be created by init_db")

            if inspector.has_table("reviews"):
                review_columns = {col["name"] for col in inspector.get_columns("reviews")}
                needs_review_image_url = "review_image_url" not in review_columns

                if needs_review_image_url:
                    logger.debug("Adding reviews.review_image_url column...")
                    connection.execute(
                        text(
                            """
                            ALTER TABLE reviews
                            ADD COLUMN IF NOT EXISTS review_image_url VARCHAR(500) NULL
                            """
                        )
                    )
            else:
                logger.info("reviews table does not exist yet; will be created by init_db")

        logger.info("Schema compatibility check completed successfully")
    except Exception as e:
        logger.error(f"Failed to ensure schema compatibility: {e}", exc_info=True)
        raise


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
        review,
        user,
    )

    Base.metadata.create_all(bind=engine)
    ensure_compatibility_schema()
