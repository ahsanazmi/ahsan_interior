from functools import lru_cache

from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Dream Home Design API"
    app_version: str = "1.0.0"
    api_prefix: str = "/api"
    allowed_origins: str = "http://localhost:5173"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/dream_home_design"
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = Field(
        default=None,
        validation_alias=AliasChoices("SMTP_USER", "SMTP_USERNAME"),
    )
    smtp_password: str | None = None
    smtp_use_tls: bool = True
    mail_from: str | None = Field(
        default=None,
        validation_alias=AliasChoices("MAIL_FROM", "SENDER_EMAIL"),
    )
    meta_verify_token: str | None = Field(
        default=None,
        validation_alias=AliasChoices("META_VERIFY_TOKEN", "META_WEBHOOK_VERIFY_TOKEN"),
    )
    meta_access_token: str | None = Field(
        default=None,
        validation_alias=AliasChoices("META_ACCESS_TOKEN", "META_PAGE_ACCESS_TOKEN"),
    )
    meta_graph_version: str = "v19.0"
    sms_provider: str | None = None
    sms_api_key: str | None = None
    sms_sender_id: str | None = None
    twilio_account_sid: str | None = None
    twilio_auth_token: str | None = None
    twilio_from_number: str | None = None
    whatsapp_access_token: str | None = None
    whatsapp_phone_number_id: str | None = None
    whatsapp_contact_number: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
