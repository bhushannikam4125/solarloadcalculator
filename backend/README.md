Solar Load Calculator Backend (Mock Contract)

This backend is created to match the existing frontend API contract.

## Requirements
- Node.js 18+

## Setup
cd backend
cp .env.example .env

Update JWT_SECRET and CORS_ORIGIN if needed.

## Run
npm install
npm run dev

Backend base: http://localhost:8000

## Seed admin user
- email: admin@example.com
- password: admin123

## Endpoints supported (subset)
- POST /api/auth/signup
- POST /api/auth/login
- GET  /api/auth/me
- POST /api/upload (multipart/form-data field name: file)
- POST /api/extract/:billId
- GET  /api/history
- GET  /api/history/:billId
- GET  /api/stats
- GET  /api/admin/users
- GET  /api/admin/bills
- GET  /api/download/:billId

