# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with your code
- PostgreSQL database (Vercel Postgres, Railway, Render, or external)
- Node.js 18+ and Python 3.13+

---

## Step 1: Prepare Your Repository

### 1.1 Create a .gitignore (if not exists)
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
*.egg-info/
dist/
build/

# Node
node_modules/
dist/
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
```

### 1.2 Push to GitHub
```bash
git add .
git commit -m "prepare for vercel deployment"
git push origin main
```

---

## Step 2: Set Up Database

### Option A: Vercel Postgres (Recommended for Vercel)
1. Go to Vercel Dashboard → Storage
2. Create new PostgreSQL database
3. Copy the `POSTGRES_URL_NON_POOLING` connection string

### Option B: External Database (Railway, Render, AWS RDS)
- Get your PostgreSQL connection string
- Format: `postgresql+psycopg://user:password@host:5432/dbname`

---

## Step 3: Backend Setup (Python API)

### 3.1 Create Vercel Backend Project
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Other" for Framework
4. Set these Build & Development Settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Output Directory**: `backend`
   - **Install Command**: `pip install -r requirements.txt`

### 3.2 Add Environment Variables to Vercel
In Vercel Dashboard → Project Settings → Environment Variables, add:

```
DATABASE_URL=postgresql+psycopg://user:password@host:5432/dream_home_design
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
MAIL_FROM=noreply@yourdomain.com
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_FROM_NUMBER=+1234567890
WHATSAPP_ACCESS_TOKEN=your-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-id
WHATSAPP_CONTACT_NUMBER=+1234567890
```

### 3.3 Create API Routes Structure
Create `backend/api/index.py` for Vercel serverless functions:

```python
from app.main import app

# Export as serverless handler
# Vercel will detect this automatically
```

Or use the `vercel.json` config provided in the root.

---

## Step 4: Frontend Setup (React + TanStack)

### 4.1 Create Vercel Frontend Project
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Other" for Framework (or auto-detect Next.js)
4. Set these settings:
   - **Root Directory**: `dream-home-design`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output` or `dist`
   - **Install Command**: `npm install`

### 4.2 Add Frontend Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
```

### 4.3 Update CORS in Backend
Update `backend/app/core/config.py` to include frontend URL:

```python
allowed_origins: str = "https://yourdomain.vercel.app,https://yourdomain.com"
```

---

## Step 5: Production Configuration

### 5.1 Backend Production Changes

Update `backend/app/main.py`:
```python
from fastapi.middleware.gzip import GZIPMiddleware

# Add after CORS middleware
app.add_middleware(GZIPMiddleware, minimum_size=1000)
```

### 5.2 Database Migrations
Create `backend/scripts/init_db.sh`:
```bash
#!/bin/bash
# Run migrations before deployment
python -m alembic upgrade head
python seed_admin.py
```

Add to Vercel build command if using Alembic.

### 5.3 Static Files Handling
For uploaded files (currently in `/uploads`):
- **Option 1**: Use cloud storage (AWS S3, Cloudinary)
- **Option 2**: Use Vercel KV for small files
- Update `backend/app/main.py` to use cloud storage

---

## Step 6: Security Hardening

### 6.1 Environment Variables Checklist
- [ ] `DATABASE_URL` set and not hardcoded
- [ ] `ALLOWED_ORIGINS` set to production domains only
- [ ] All API keys and secrets in environment variables
- [ ] No credentials in code or `.env` files

### 6.2 Update CORS Settings
`backend/app/core/cors.py`:
```python
from app.core.config import settings

allowed_origins = settings.origins  # Uses ALLOWED_ORIGINS env var
```

### 6.3 Set Production Database URL
Ensure `DATABASE_URL` is set as environment variable, not in code.

---

## Step 7: Deploy

### 7.1 Connect Repository
1. Click "New Project" on Vercel
2. Select your GitHub repository
3. Configure project (framework auto-detected)
4. Click "Deploy"

### 7.2 Deploy from CLI
```bash
npm install -g vercel
vercel
# Follow prompts
```

### 7.3 Set Production Environment
After first deployment:
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add variables with scope "Production"

---

## Step 8: Post-Deployment Checks

### 8.1 Test Backend API
```bash
curl https://your-backend.vercel.app/health
# Should return: {"status": "ok"}

curl https://your-backend.vercel.app/docs
# Should show Swagger UI
```

### 8.2 Test Frontend
- Visit https://your-frontend.vercel.app
- Test API calls from browser console

### 8.3 Monitor Logs
- Vercel Dashboard → Deployments → View logs
- Check for errors and warnings

---

## Common Issues & Solutions

### Issue: Database Connection Failed
**Solution**: 
- Verify `DATABASE_URL` format: `postgresql+psycopg://user:pass@host:5432/db`
- Check database is accessible from Vercel (firewall rules)
- Use `psycopg` instead of `psycopg2`

### Issue: CORS Errors
**Solution**:
- Update `ALLOWED_ORIGINS` to include frontend URL
- Restart deployment after changing environment variables

### Issue: Uploads Directory Not Found
**Solution**:
- Use cloud storage (S3, Cloudinary) instead
- Create `/tmp` directory in serverless function
- Or use database to store file metadata

### Issue: Build Fails - Python Packages
**Solution**:
- Ensure all packages in `requirements.txt` support Python 3.13
- Check compatibility before deploying

### Issue: Slow First Request (Cold Start)
**Solution**:
- Normal for serverless functions (1-5 seconds)
- Use Vercel's pooling connections for database
- Add caching headers to responses

---

## Environment Variables Summary

### Required
- `DATABASE_URL` - PostgreSQL connection string

### Recommended
- `ALLOWED_ORIGINS` - Comma-separated CORS domains
- `VITE_API_BASE_URL` - Frontend API endpoint

### Optional (Based on Features)
- `SMTP_*` - Email configuration
- `TWILIO_*` - SMS/WhatsApp via Twilio
- `WHATSAPP_*` - WhatsApp Business API

---

## Next Steps After Deployment

1. **Set up monitoring**: Vercel Analytics, Sentry for errors
2. **Configure DNS**: Point domain to Vercel
3. **Set up CI/CD**: Auto-deploy on push
4. **Database backups**: Enable automated backups
5. **API documentation**: Update frontend to use new API URL
6. **SSL/TLS**: Automatic with Vercel
7. **CDN**: Enabled by default for static files

---

## Useful Commands

```bash
# Local testing before deployment
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd dream-home-design
npm install
npm run dev

# Build for production
npm run build

# Test production build locally
npm run preview
```

---

## Support & Documentation

- [Vercel Docs](https://vercel.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/concepts/)
- [TanStack Start](https://tanstack.com/start/latest)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect-using-conninfo.html)
