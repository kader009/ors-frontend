# ORS Tracker — Frontend

A compact React + TypeScript frontend for the ORS Tracker (Vite + Tailwind + RTK Query).

Quick start

0. Clone the repository (required before installing)

```pwsh
# using git
git clone

cd <repo>
```

1. Install

```pwsh
npm install
```

2. Set API URL in `.env`

```text
VITE_BACKEND_API=https://ors-backend-ys1m.onrender.com/api/v1
```

3. Run

```pwsh
npm run dev
```

Scripts

- `npm run dev` — start dev server
- `npm run build` — build production assets

Notes

- Roles: `admin` (full), `inspector` (assigned/created plans), `viewer` (read-only).
- Backend must enforce role permissions server-side — frontend applies client-side guards only.

Sample credentials

- admin@gmail.com / admin123 (admin)
- shakil@gmail.com / shakil123 (inspector)
- alam@gmail.com / alam123 (viewer)
