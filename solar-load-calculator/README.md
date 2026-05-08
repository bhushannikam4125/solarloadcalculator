# Solar Load Calculator

Automates electricity bill data extraction + solar load calculation.

## Tech
- Frontend: React (Vite) + Tailwind + Framer Motion + Axios + React Router v6
- Backend: FastAPI + PostgreSQL (async SQLAlchemy) + JWT

## Local dev (Docker)

```bash
cd solar-load-calculator
cp .env.example .env
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Local dev (without Docker)
### Backend
```bash
cd solar-load-calculator/backend
python -m venv .venv
. .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example ../.env
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd solar-load-calculator/frontend
npm install
npm run dev
```

## Notes
- On first signup, the user becomes admin automatically.
- Upload endpoint expects multipart form field name `file`.

