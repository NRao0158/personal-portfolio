# Week 5: Portfolio FastAPI backend

Scaffolded with `uvx fastapi-new backend`, using Python 3.14. The generated app was extended
in `main.py`; there is only one FastAPI instance. All three routes use Pydantic
models and real Python lists. React is deliberately not connected to these routes.

## Run and test

Install uv using https://docs.astral.sh/uv/getting-started/installation/ if needed.
From this repository's root:

```powershell
cd backend
uv sync --locked
uv run fastapi dev
```

Open http://127.0.0.1:8000/api/docs for interactive Swagger docs.
Run tests in a separate terminal: `cd backend`, then `uv run --locked pytest`.
Run the existing frontend separately: `cd frontend`, `npm ci`, `npm run dev`.

Production docs: https://personal-portfolio-indol-kappa-81.vercel.app/api/docs
The paths are identical locally and in production.

## Three endpoints

| Method | Path | Request | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/projects` | Optional `q` (1-100 characters), `skill` (1-50 characters) query parameters | 200: `{ "total": 3, "projects": [...] }`; search/filter the project list. `q` is a case-insensitive substring in title, category, summary, or technology; `skill` is an exact case-insensitive technology. Both filters combine with AND. No matches returns an empty list. | 422 for blank/overlong parameters |
| GET | `/api/projects/{slug}` | Path slug: `sentinel`, `interceptiq`, or `focusmate` | 200: matching project with title, summary, category, technologies, GitHub/demo links, and disclaimer | 404 `{ "detail": "Project not found" }` |
| POST | `/api/inquiries` | JSON: `name` (1-80 characters), `email` (valid address, max 254), `project_slug` (1-50), `message` (10-2000) | 201: validates the project, appends an Inquiry object to the Python list, returns UUID, project slug, UTC timestamp, accepted status, and temporary-storage notice | 404 for unknown project; 422 for missing/invalid/extra fields; 503 when the process reaches 500 demo inquiries |

Strings in inquiry requests are trimmed before length checks. Submitted inquiries
are not publicly readable and do not send email. Use synthetic data when testing.

## curl examples (PowerShell)

```powershell
curl.exe "http://127.0.0.1:8000/api/projects?q=shipment&skill=Python"
curl.exe "http://127.0.0.1:8000/api/projects/sentinel"
curl.exe "http://127.0.0.1:8000/api/projects/missing"
```

For the POST request, save this as `inquiry.json` (or enter it through Swagger):

```json
{"name":"Demo Visitor","email":"visitor@example.com","project_slug":"sentinel","message":"How did you evaluate the failure-risk model?"}
```

```powershell
curl.exe -i -X POST "http://127.0.0.1:8000/api/inquiries" -H "Content-Type: application/json" --data-binary "@inquiry.json"
```

Replace the local origin with the production origin to test Vercel. No token is
needed. Replace `email` with `invalid` to receive 422, or `project_slug` with
`missing` to receive 404. Failed submissions do not append anything to the list.

## Storage limitations

The assignment requires in-memory lists rather than a database. Public project
data is seeded from a snapshot of the portfolio; inquiries start empty. Restarting
Python resets the lists. On Vercel, each instance has its own temporary list and
cold starts/redeployments reset it. A 201 confirms an append in the handling
process, not durable storage or delivery. Do not use this demo for real messages.
There is no frontend contact form attached to it.

## Deployment

`../api/index.py` imports this app for Vercel's Python runtime. `../vercel.json`
keeps the existing frontend and routes `/api/*` to that function. Export runtime
requirements after dependency changes with:

```powershell
uv export --locked --no-dev --no-emit-project --no-hashes --output-file requirements.txt
Copy-Item requirements.txt ../requirements.txt
```

Push to `main` to trigger the existing Vercel production deployment.
