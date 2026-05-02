#!/bin/bash

# Frontend Production Deployment Script
# Run this before pushing to production

set -e

echo "=================================="
echo "Frontend Production Build"
echo "=================================="

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the dream-home-design directory"
    exit 1
fi

echo ""
echo "1️⃣  Installing dependencies..."
npm install

echo ""
echo "2️⃣  Building for production..."
npm run build

echo ""
echo "3️⃣  Verifying build output..."
if [ -d "dist" ]; then
    echo "✅ Build successful! Output in ./dist"
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi

echo ""
echo "✅ Frontend ready for deployment!"
echo ""
echo "Deployment checklist:"
echo "☐ Verify VITE_API_BASE_URL is set in Vercel environment"
echo "☐ Verify all API calls work correctly"
echo "☐ Test authentication flow"
echo "☐ Check responsive design on mobile"
echo ""
echo "To deploy:"
echo "1. Commit changes: git add . && git commit -m 'Build for production'"
echo "2. Push to GitHub: git push origin main"
echo "3. Vercel will auto-deploy on push"
