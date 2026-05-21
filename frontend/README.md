# AI Document Assistant — Frontend

This is a minimal React + Vite frontend for the AI Document Assistant backend.

Quick start:

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run dev server

```bash
npm run dev
```

Defaults assume the backend is available at `http://localhost:8000`. To change the API base, create a `.env` file in this folder with:

```
VITE_API_BASE=http://localhost:8000
```

Notes:
-- Routes assumed by the UI: `/auth/*`, `/upload`, `/analyze`, `/history`. Adjust `src/api.js` if your backend path differs.
- This is a scaffolding to get you started. Let me know if you want prettier UI or additional features.
