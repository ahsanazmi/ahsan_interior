#!/bin/bash

# Production Deployment Script for Vercel
# Run this before pushing to production

set -e

echo "=================================="
echo "Production Deployment Preparation"
echo "=================================="

# Check if in backend directory
if [ ! -f "requirements.txt" ]; then
    echo "Error: Please run this script from the backend directory"
    exit 1
fi

echo ""
echo "1️⃣  Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "2️⃣  Verifying Python environment..."
python -c "import fastapi; import sqlalchemy; print('✅ Required packages available')"

echo ""
echo "3️⃣  Running verification checks..."
python verify_production.py

echo ""
echo "✅ Production preparation complete!"
echo ""
echo "Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Prepare for production'"
echo "2. Push to GitHub: git push origin main"
echo "3. Go to Vercel dashboard and deploy"
echo "4. Set environment variables in Vercel:"
echo "   - DATABASE_URL"
echo "   - ALLOWED_ORIGINS"
echo "   - SMTP_* (if using email)"
echo "   - TWILIO_* (if using SMS)"
