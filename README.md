# pairs-trading 🚀
Small project that implements a pairs-trading backtester with a FastAPI backend and a Vite + React frontend.

## Contents
- `backend/` — FastAPI app, models (Kalman filter, backtester, metrics), and tests. 🐍
- `frontend/` — Vite + React UI (Tailwind CSS) served by Nginx in Docker. ⚛️
- `infra/` — `docker-compose.yml` to run the full stack locally. 

## Quick start (Docker Compose) 🐳
This repository includes a small Docker Compose setup that builds and runs the backend and frontend containers.

Requirements: Docker and docker-compose installed on your machine.

From the repository root:

```bash
cd infra
docker-compose up --build
```

- Backend will be available at `http://localhost:8000` (API path `/api/v1`).
- Frontend will be served at `http://localhost:3000` and proxies API calls to the backend.

Stop the stack with:

```bash
docker-compose down
```

## Development (local)

### Backend 🐍
- Create and activate a Python virtual environment and install the backend requirements:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

- Run the FastAPI app (from `backend/`):

```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend ⚛️
- Install dependencies and run the dev server (from `frontend/web`):

```bash
cd frontend/web
npm install
npm run dev
```

- When running the frontend dev server, set `VITE_API_BASE` to point to the backend (for example `http://localhost:8000/api/v1`) if needed.

## Running tests ✅
- Backend tests live in `backend/app/tests`. Run them with `pytest` from the repo root (or inside the backend venv):

```bash
pytest backend/app/tests -q
```

## License 📄
See `LICENSE`.
