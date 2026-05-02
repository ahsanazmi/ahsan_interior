# Vercel Deployment Quick Start

## 🚀 Quick Deployment Steps (5-10 minutes)

### 1. Create Vercel Projects

```bash
# Backend Project
vercel --cwd ./backend --name "dream-home-backend"

# Frontend Project  
vercel --cwd ./dream-home-design --name "dream-home-frontend"
```

Or manually create projects on [https://vercel.com/new](https://vercel.com/new)

---

### 2. Set Environment Variables

#### Backend Environment Variables (Vercel Dashboard → Settings → Environment Variables)

```
DATABASE_URL=postgresql+psycopg://user:password@host:5432/dream_home_design
ALLOWED_ORIGINS=https://dream-home-frontend.vercel.app,https://yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
MAIL_FROM=noreply@yourdomain.com
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_FROM_NUMBER=+1234567890
```

#### Frontend Environment Variables

```
VITE_API_BASE_URL=https://dream-home-backend.vercel.app/api
```

---

### 3. Deploy Backend

```bash
cd backend

# Run verification
python verify_production.py

# Deploy
vercel --prod
```

---

### 4. Deploy Frontend

```bash
cd dream-home-design

# Build
npm run build

# Deploy
vercel --prod
```

---

### 5. Test After Deployment

```bash
# Test backend
curl https://your-backend-url.vercel.app/health

# Test frontend - visit in browser
https://your-frontend-url.vercel.app
```

---

## 🔑 Environment Variables Cheat Sheet

**Database Connection String Format:**
```
postgresql+psycopg://username:password@host:port/database_name
```

**Common Hosts:**
- **Vercel Postgres**: Copy from Vercel Storage dashboard
- **Railway**: Get from Railway dashboard
- **Render**: Get from Render dashboard
- **AWS RDS**: Use RDS endpoint

**ALLOWED_ORIGINS Examples:**
```
# Single domain
https://yourdomain.com

# Multiple domains
https://yourdomain.com,https://www.yourdomain.com,https://yourdomain-frontend.vercel.app

# Local development (not for production)
http://localhost:5173,http://localhost:3000
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check database URL and backend logs |
| CORS errors | Update ALLOWED_ORIGINS to include frontend URL |
| Database connection timeout | Check firewall rules, add Vercel IP to whitelist |
| Frontend shows "Cannot connect to API" | Verify VITE_API_BASE_URL is correct |
| Slow responses | Check database indices, optimize queries |
| Build fails | Check requirements.txt or package.json compatibility |

---

## 📊 Monitoring & Maintenance

**Vercel Dashboard:**
- View logs: Deployments → Click deployment → View logs
- Monitor performance: Analytics tab
- Check errors: Function logs

**To view real-time logs:**
```bash
vercel logs --tail
```

---

## 🔄 Deployment Workflow

```
1. Make changes locally
2. Test: npm run dev (frontend), python -m uvicorn app.main:app --reload (backend)
3. Commit: git add . && git commit -m "message"
4. Push: git push origin main
5. Vercel auto-deploys!
6. Check logs if needed
```

---

## 💡 Pro Tips

1. **Use GitHub integration** for auto-deployments on push
2. **Set production environment** for env variables to avoid issues
3. **Enable analytics** to monitor user activity
4. **Set up alerts** for failed deployments
5. **Use preview deployments** to test before production
6. **Keep backups** of your database
7. **Monitor cold start times** for serverless functions

---

## 📚 Additional Resources

- [Vercel Python Support](https://vercel.com/docs/functions/serverless-functions/python)
- [PostgreSQL Connection](https://www.postgresql.org/docs/current/libpq-connect-using-conninfo.html)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/concepts/)
- [TanStack Start Production](https://tanstack.com/start/latest)

---

**Estimated Time:** 5-10 minutes for initial setup
**Estimated Cost:** Free tier available (limits apply)
**Support:** Vercel support team available in dashboard
