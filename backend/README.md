# Dream Home Design Backend

FastAPI backend for the Dream Home Design frontend. It serves city pages, appointments, leads, quotes,
calculator settings, admin tools, blog content, image uploads, and auth flows.

## Stack

- FastAPI
- SQLAlchemy + PostgreSQL
- Pydantic Settings
- JWT auth
- Static uploads from `uploads/`

## Prerequisites

- Python 3.11 or newer
- PostgreSQL
- A frontend running on `http://localhost:5173` or another allowed origin

## Local Setup

1. Create and activate a virtual environment.

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure `.env`.

At minimum, set `DATABASE_URL`. Optional mail, SMS, and WhatsApp values can also be added.

4. Run the API:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API docs are available at `/docs`, and the OpenAPI schema is served under `/api/openapi.json`.

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `ALLOWED_ORIGINS` - comma-separated CORS origins
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_USE_TLS`, `MAIL_FROM`
- `SMS_PROVIDER`, `SMS_API_KEY`, `SMS_SENDER_ID`
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`
- `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_CONTACT_NUMBER`

If notification settings are empty, the backend falls back to log-only messages for local testing.

## Routes

### Public

- `GET /api/health`
- `GET /api/cities`
- `GET /api/cities/{city_slug}`
- `POST /api/leads`
- `POST /api/quotes`
- `GET /api/blogs`
- `GET /api/blogs/{slug}`
- `GET /api/offers`
- `GET /api/calculator-settings`

### Appointments and Auth

- `POST /api/appointments`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/appointment-account/verify`
- `POST /api/auth/appointment-account/resend-otp`

### User Dashboard

- `GET /api/auth/me`
- `GET /api/user/bookings`

### Admin

- `GET /api/admin/stats`
- `GET /api/admin/appointments`
- `GET /api/admin/leads`
- `GET /api/admin/quotes`
- `GET /api/admin/calculator-settings`
- `PUT /api/admin/calculator-settings`
- `GET /api/admin/blogs`
- `POST /api/admin/blogs`
- `DELETE /api/admin/blogs/{id}`
- `GET /api/admin/images`
- `POST /api/admin/images`
- `DELETE /api/admin/images/{id}`
- `GET /api/admin/offers`
- `POST /api/admin/offers`
- `DELETE /api/admin/offers/{id}`

## Uploads

Uploaded media is stored in `uploads/` and exposed at `/uploads/<filename>`.

## Admin Seed

Create the fixed admin account with:

```bash
python seed_admin.py
```

The seed script uses the credentials defined in `seed_admin.py`. Change the password after the first login.

## Notes

- `app.main` initializes the database during startup.
- CORS defaults to the frontend local dev origin, with additional localhost fallbacks.
- If the backend is running behind a proxy, keep the frontend `VITE_API_BASE_URL` pointed at the deployed API base path.
