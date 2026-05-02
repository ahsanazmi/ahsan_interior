# 🚀 Production Deployment Guide - Complete Setup

Your Interior Client project is ready for production deployment on Vercel. This guide walks you through every step.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step-by-Step Deployment](#step-by-step-deployment)
3. [Environment Variables](#environment-variables)
4. [Verification Checklist](#verification-checklist)
5. [Troubleshooting](#troubleshooting)
6. [Post-Deployment Monitoring](#post-deployment-monitoring)

---

## Prerequisites

Before starting, ensure you have:

- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ GitHub account with your code pushed
- ✅ PostgreSQL database configured (Vercel Postgres, Railway, Render, or similar)
- ✅ SMTP credentials for email (Gmail, SendGrid, etc.) - optional but recommended
- ✅ Domain name (optional, Vercel provides `.vercel.app` domain)
- ✅ Twilio account (if using SMS/WhatsApp) - optional

---

## Step-by-Step Deployment

### PHASE 1: BACKEND DEPLOYMENT (FastAPI)

#### Step 1.1: Prepare Backend Code

```bash
# From project root
cd backend

# Run verification script
python verify_production.py

# If everything passes, you're good to deploy
# If not, fix the issues before proceeding
```

#### Step 1.2: Create Backend Project on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Select" on your GitHub repository
3. **Framework**: Select "Other"
4. **Root Directory**: Set to `backend`
5. Configure settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Output Directory**: (leave empty)
   - **Start Command**: (leave empty)
6. Click "Deploy" button
7. **Wait for deployment to complete** (usually 2-5 minutes)

#### Step 1.3: Add Environment Variables to Backend

After deployment succeeds:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables:

```
DATABASE_URL=postgresql+psycopg://user:password@host:5432/dream_home_design

ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://yourdomain.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
MAIL_FROM=noreply@yourdomain.com

TWILIO_ACCOUNT_SID=your-account-sid (optional)
TWILIO_AUTH_TOKEN=your-token (optional)
TWILIO_FROM_NUMBER=+1234567890 (optional)

WHATSAPP_ACCESS_TOKEN=your-token (optional)
WHATSAPP_PHONE_NUMBER_ID=your-id (optional)
WHATSAPP_CONTACT_NUMBER=+1234567890 (optional)
```

3. **Important**: Set the environment scope to **Production**
4. Click **Save**
5. **Redeploy** after adding env variables:
   - Click "Deployments" tab
   - Click the latest deployment
   - Click "Redeploy" button
   - Confirm "Redeploy"

#### Step 1.4: Test Backend Deployment

Once redeployed, test your backend:

```bash
# Get your backend URL from Vercel dashboard
# Format: https://your-project-name.vercel.app

# Test health endpoint
curl https://your-project-name.vercel.app/health
# Should return: {"status":"ok"}

# View API docs
# Visit: https://your-project-name.vercel.app/docs
```

**Save your backend URL** - you'll need it for the frontend.

---

### PHASE 2: FRONTEND DEPLOYMENT (React + TanStack)

#### Step 2.1: Configure Frontend for Backend

1. Open [dream-home-design/.env.example](dream-home-design/.env.example)
2. Create `.env.production` file:

```
VITE_API_BASE_URL=https://your-backend-name.vercel.app/api
```

Replace `your-backend-name` with your actual backend Vercel project name.

#### Step 2.2: Test Frontend Locally (Optional)

```bash
cd dream-home-design

# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

#### Step 2.3: Create Frontend Project on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Select" on your GitHub repository
3. **Framework**: Auto-detect (should detect as "Other")
4. **Root Directory**: Set to `dream-home-design`
5. Configure settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy" button
7. **Wait for deployment to complete**

#### Step 2.4: Add Frontend Environment Variables

After deployment succeeds:

1. Go to **Project Settings** → **Environment Variables**
2. Add:

```
VITE_API_BASE_URL=https://your-backend-name.vercel.app/api
```

3. Set scope to **Production**
4. Click **Save**
5. **Redeploy**:
   - Click "Deployments" tab
   - Click latest deployment
   - Click "Redeploy"
   - Confirm

#### Step 2.5: Test Frontend Deployment

Once redeployed:

1. Open your frontend URL in browser (from Vercel dashboard)
2. Test functionality:
   - Navigate through pages ✓
   - Test API calls (check browser console for errors) ✓
   - Test login/authentication flow ✓
   - Check responsive design on mobile ✓

---

## Environment Variables

### Backend Variables Reference

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `DATABASE_URL` | ✅ Yes | `postgresql+psycopg://user:pass@host:5432/db` | PostgreSQL connection string |
| `ALLOWED_ORIGINS` | ✅ Yes | `https://frontend.vercel.app,https://yourdomain.com` | Comma-separated CORS domains |
| `SMTP_HOST` | ⚠️ Optional | `smtp.gmail.com` | Email server hostname |
| `SMTP_PORT` | ⚠️ Optional | `587` | Email server port |
| `SMTP_USERNAME` | ⚠️ Optional | `your-email@gmail.com` | Email account |
| `SMTP_PASSWORD` | ⚠️ Optional | `app-specific-password` | Email password/app token |
| `MAIL_FROM` | ⚠️ Optional | `noreply@yourdomain.com` | Sender email address |
| `TWILIO_ACCOUNT_SID` | ⚠️ Optional | `ACxxxxxxxx` | For SMS/WhatsApp |
| `TWILIO_AUTH_TOKEN` | ⚠️ Optional | `auth-token` | For SMS/WhatsApp |
| `TWILIO_FROM_NUMBER` | ⚠️ Optional | `+1234567890` | Twilio phone number |

### Frontend Variables Reference

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_API_BASE_URL` | ✅ Yes | `https://backend.vercel.app/api` |

---

## Verification Checklist

Before considering deployment complete:

### Backend Checks
- [ ] Health endpoint responds: `https://your-backend.vercel.app/health`
- [ ] API docs available: `https://your-backend.vercel.app/docs`
- [ ] No errors in Vercel logs
- [ ] Database connection successful
- [ ] All environment variables set in Vercel

### Frontend Checks
- [ ] Website loads without errors
- [ ] All pages render correctly
- [ ] API calls work (check browser console)
- [ ] Authentication flow works
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Images load correctly
- [ ] No console errors (F12 → Console tab)

### Integration Checks
- [ ] Frontend successfully calls backend API
- [ ] Login redirects correctly
- [ ] Forms submit successfully
- [ ] Error messages display properly
- [ ] Loading states work

---

## Troubleshooting

### ❌ Backend: 502 Bad Gateway

**Causes**: Database connection error, missing dependencies

**Solutions**:
1. Check `DATABASE_URL` format: `postgresql+psycopg://user:pass@host:5432/db`
2. Verify database is accessible from Vercel
3. Check backend logs: Vercel Dashboard → Deployments → Logs
4. Try redeploying: Click "Redeploy"

```bash
# Local test
DATABASE_URL="your-url" python verify_production.py
```

### ❌ Frontend: Cannot connect to API

**Causes**: Wrong API URL, CORS error, backend not deployed

**Solutions**:
1. Verify `VITE_API_BASE_URL` is correct
2. Check browser Network tab for API requests
3. Check backend `ALLOWED_ORIGINS` includes frontend URL
4. Check backend is running: `curl https://backend-url/health`

### ❌ CORS Errors in Console

**Causes**: Backend doesn't have frontend URL in `ALLOWED_ORIGINS`

**Solutions**:
1. Update `ALLOWED_ORIGINS` to include frontend URL:
   ```
   https://frontend-name.vercel.app,https://yourdomain.com
   ```
2. Redeploy backend after changing env variables
3. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### ❌ Database Connection Timeout

**Causes**: Firewall blocking, connection pool exhausted

**Solutions**:
1. Check database firewall settings
2. Add Vercel IP addresses to whitelist (if using external database)
3. Verify credentials in `DATABASE_URL`

### ❌ Slow Response Times / Cold Start

**Normal Behavior**: Serverless functions have 1-5 second cold start time

**Solutions**:
1. Upgrade Vercel plan for better performance
2. Optimize database queries
3. Add database indices
4. Use connection pooling

### ⚠️ Deployment Keeps Failing

**Steps to diagnose**:
1. Check build logs: Click deployment → View logs
2. Look for specific error messages
3. Run local build test:
   ```bash
   # Backend
   cd backend && pip install -r requirements.txt
   
   # Frontend
   cd dream-home-design && npm install && npm run build
   ```

---

## Post-Deployment Monitoring

### Daily Checks (First Week)

```bash
# Monitor logs in real-time
vercel logs --tail

# View deployment status
vercel deployments

# Check specific deployment
vercel deployments list | head -5
```

### Vercel Dashboard Monitoring

1. **Analytics Tab**: View traffic, performance metrics
2. **Logs**: Real-time function logs and errors
3. **Deployments**: See all deployments, rollback if needed
4. **Settings**: Monitor resource usage

### Set Up Error Alerts (Optional)

Consider integrating error tracking:
- **Sentry**: For error monitoring
- **LogRocket**: For user session replay
- **DataDog**: For comprehensive monitoring

### Database Monitoring

1. Check query performance regularly
2. Monitor connection pool usage
3. Enable backups
4. Test disaster recovery process

---

## Rollback Plan

If something goes wrong after deployment:

### Quick Rollback
1. Go to Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click "Redeploy"
4. Confirm rollback

### Detailed Rollback
```bash
# Find previous deployment
vercel deployments list

# Rollback to specific deployment
vercel rollback <deployment-url>
```

---

## Next Steps

After successful deployment:

1. ✅ Set up custom domain (optional)
   - Vercel Dashboard → Domains
   - Add your domain
   - Update DNS records

2. ✅ Enable HTTPS (automatic on Vercel)
   - All deployments use SSL/TLS

3. ✅ Set up Git auto-deployment
   - Deployments auto-trigger on push
   - Configure branch deployment rules

4. ✅ Configure analytics
   - Vercel Dashboard → Analytics

5. ✅ Set up error tracking
   - Integrate Sentry or similar

6. ✅ Regular maintenance
   - Update dependencies monthly
   - Review logs for issues
   - Backup database regularly

---

## Support & Resources

- 📚 [Full Deployment Guide](DEPLOYMENT_GUIDE.md)
- ✅ [Production Checklist](PRODUCTION_CHECKLIST.md)
- 🚀 [Quick Start](QUICK_START_DEPLOYMENT.md)
- 🔧 Backend verification script: `backend/verify_production.py`
- 📱 Frontend deployment script: `dream-home-design/deploy.sh`

---

## Getting Help

1. **Vercel Support**: In Vercel Dashboard → Help
2. **FastAPI Docs**: https://fastapi.tiangolo.com/
3. **React/TanStack Docs**: https://tanstack.com/
4. **PostgreSQL Docs**: https://www.postgresql.org/docs/

---

**Deployment Status**: Ready for Production ✅

**Estimated Setup Time**: 30-45 minutes (including database setup)

**Cost**: Free tier available (with limitations)

**Next**: Follow the step-by-step deployment above!
