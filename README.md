# LinkForge — MERN URL Shortener & Analytics

A modern, portfolio-ready URL shortener with a React dashboard, MongoDB persistence, Express API, unique custom aliases, link deletion, click counts, and a responsive interface.

## Stack
- MongoDB and Mongoose
- Express and Node.js 20+
- React 18 and Vite
- Native Node test runner

## Quick start (Windows / macOS / Linux)

**Requirements:** Node.js 20+ and running MongoDB locally (or MongoDB Atlas).

```bash
npm install
npm run install:all
```

Copy `server/.env.example` to `server/.env`. On Windows Command Prompt: `copy server\.env.example server\.env`. Edit `MONGO_URI` as needed.

```bash
npm run dev
```

Dashboard: http://localhost:5173  
API: http://localhost:5000  
Health: http://localhost:5000/api/health

**Important:** Install dependencies in *both* `server` and `client` via `npm run install:all`. If Vite or dotenv is missing, packages weren't installed successfully.

## API
| Method | Endpoint | Description |
|--|--|--|
| GET | /api/health | Health check |
| GET | /api/links | List 100 newest links |
| POST | /api/links | JSON `{ "url": "https://example.org", "alias": "optional-code" }` |
| DELETE | /api/links/:code | Delete link |
| GET | /:code | Count click and redirect |

Sample API call:

```bash
curl -X POST http://localhost:5000/api/links -H "Content-Type: application/json" -d '{"url":"https://example.com","alias":"my-demo"}'
```

## Tests & build
```bash
npm test
npm run build
```

## Project layout
```
client/            React application, styling, Vite configuration
server/src/        Express API, MongoDB model, validation
server/tests/      Automated unit tests
.github/workflows/ CI checks
```

## Important safety/production note
This is a **portfolio demo**, not a production public URL shortener. The dashboard and API have no login, rate limits, anti-abuse systems, or domain blocklist. Public launch would require authentication, per-user access controls, throttling, link moderation, analytics privacy safeguards, and an abuse/SSRF review. Do not deploy this as an unrestricted public link-shortening service.

## GitHub description
MERN URL shortener with custom aliases, click analytics, a responsive React dashboard, MongoDB persistence, and an Express REST API.

## License
MIT
