# Production Deployment Checklist

## Backend (FastAPI)

### Environment Variables
- [ ] `DATABASE_URL` configured and tested
- [ ] `ALLOWED_ORIGINS` set to production domain(s)
- [ ] All API keys (SMTP, Twilio, WhatsApp) in environment variables
- [ ] No sensitive data in code or `.env` file

### Database
- [ ] PostgreSQL database created on production
- [ ] Database migrations run (if using Alembic)
- [ ] Admin user seeded via `seed_admin.py`
- [ ] Database backups enabled
- [ ] Connection string uses pooling for serverless

### Security
- [ ] CORS origins restricted to frontend domain
- [ ] HTTPS enforced (Vercel handles this)
- [ ] JWT secrets configured (check `app/core/security.py`)
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints

### Performance
- [ ] Database indices created for frequently queried fields
- [ ] API response caching implemented
- [ ] Gzip compression enabled
- [ ] Unnecessary logging disabled in production

### Monitoring & Logging
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Request logging enabled
- [ ] Database query logging disabled in production
- [ ] Health check endpoint verified (`/health`)
- [ ] API documentation available (`/docs`)

### Testing
- [ ] All API endpoints tested
- [ ] Database connectivity verified
- [ ] External services tested (SMTP, Twilio)
- [ ] Error responses validated

---

## Frontend (React + TanStack)

### Environment Variables
- [ ] `VITE_API_BASE_URL` points to production backend
- [ ] All production environment variables set

### Build & Deployment
- [ ] Production build tested locally (`npm run build`)
- [ ] No hardcoded localhost URLs
- [ ] API calls use environment variable for base URL
- [ ] Static assets optimized (images, CSS, JS)

### Routing & Navigation
- [ ] All routes functional
- [ ] Protected routes require authentication
- [ ] Redirects after login work correctly
- [ ] 404 page exists and works

### Performance
- [ ] Bundle size analyzed and optimized
- [ ] Lazy loading implemented for large components
- [ ] Image optimization applied
- [ ] Unused dependencies removed

### User Experience
- [ ] All forms validated and tested
- [ ] Error messages user-friendly
- [ ] Loading states visible
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Accessibility (a11y) basics checked

### Testing
- [ ] Login/authentication flow tested
- [ ] API error handling tested
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility (Chrome, Firefox, Safari)

### Security
- [ ] No API keys or secrets in frontend code
- [ ] CORS headers properly configured
- [ ] Authentication tokens stored securely (HttpOnly cookies or secure storage)
- [ ] CSRF protection if needed

---

## Deployment Process

### Pre-Deployment
- [ ] All changes committed to Git
- [ ] `.env.example` files provided without secrets
- [ ] `.gitignore` properly configured
- [ ] No build errors locally

### Vercel Configuration
- [ ] Backend project created on Vercel
- [ ] Frontend project created on Vercel
- [ ] Environment variables added to both projects
- [ ] Root directory configured correctly (if monorepo)

### Post-Deployment
- [ ] All endpoints respond correctly
- [ ] Database connection stable
- [ ] Frontend loads without errors
- [ ] API calls successful from frontend
- [ ] Authentication working end-to-end
- [ ] No console errors on frontend
- [ ] Performance acceptable (Lighthouse score > 70)

---

## Monitoring & Maintenance

### Regular Checks (Daily)
- [ ] No critical errors in logs
- [ ] API response times normal
- [ ] Database performing well

### Weekly Tasks
- [ ] Review error logs
- [ ] Check performance metrics
- [ ] Verify backups completed
- [ ] Monitor resource usage

### Monthly Tasks
- [ ] Update dependencies
- [ ] Review security logs
- [ ] Database maintenance
- [ ] Performance optimization review

---

## Rollback Plan

If issues occur after deployment:

1. **Quick Rollback**: Use Vercel's "Redeploy" to previous version
2. **Database Issue**: Have backup strategy documented
3. **API Issue**: Have previous stable version tagged in Git
4. **Frontend Issue**: Clear browser cache, verify build

---

## Documentation Updates

- [ ] README.md updated with production deployment info
- [ ] API documentation generated and published
- [ ] Environment variables documented (in `.env.example`)
- [ ] Troubleshooting guide created
- [ ] Team onboarded on deployment process

---

## Notes

Add any additional notes or specific configurations for your project:

```
[Add your custom notes here]
```

---

**Deployment Date**: ________________
**Deployed By**: ________________
**Version**: ________________
**Issues Encountered**: ________________
