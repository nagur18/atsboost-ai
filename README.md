# ATSBoost AI

> AI-powered resume analyzer & interview coach — beat the ATS, get more interviews.

ATSBoost AI lets job seekers upload a resume and instantly receive an **ATS
score**, **AI-generated improvement tips**, a **personalized learning roadmap**,
and a **tailored interview-prep session** — all in a modern, fully responsive
web app.

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss" />
  <img alt="Python" src="https://img.shields.io/badge/Python-3.13-3776ab?logo=python" />
</p>

---

## ✨ Features

- **Resume Analysis** — upload a PDF/DOCX; AI extracts name, contact, skills, education, experience, and projects.
- **ATS Scoring** — deterministic, section-by-section score (formatting, keywords, skills, experience, projects).
- **AI Tips & Modifications** — concrete, prioritized suggestions to raise your score and recruiter appeal.
- **Interview Coach** — generates tailored technical / behavioral / HR / project questions and grades your answers (opt-in).
- **Learning Roadmap** — a week-by-week plan to close skill gaps.
- **Recruiter Simulation** — ATS, recruiter, and hiring-manager perspectives on your resume.
- **PDF Export & Shareable Reports** — export a report or share a public link.
- **Dashboard** — live stats (resumes analyzed, best/average ATS score, recent reports).
- **Auth** — secure sign-in/up via Clerk.
- **Provider-agnostic AI** — Google Gemini by default; switch to **OpenRouter** (free models) with one env var.

## 🧱 Architecture

```
┌──────────────────────┐         HTTPS / JSON        ┌──────────────────────┐
│   Next.js Frontend    │  ───────────────────────▶  │    FastAPI Backend     │
│  (App Router, React)  │                            │  (Python, SQLAlchemy)  │
│  • Clerk auth         │  ◀───────────────────────  │  • Resume parsing      │
│  • Tailwind UI        │                            │  • ATS scoring         │
└──────────────────────┘                            │  • LLM agents          │
                                                     └───────────┬───────────┘
                                       ┌─────────────────────────┼─────────────────────┐
                                       ▼                         ▼                     ▼
                                ┌─────────────┐          ┌──────────────┐      ┌──────────────┐
                                │  MySQL / DB  │          │ LLM provider  │      │  Cloudinary  │
                                │ (SQLAlchemy) │          │ Gemini /      │      │  (optional)  │
                                └─────────────┘          │ OpenRouter    │      └──────────────┘
                                                         └──────────────┘
```

## 🛠 Tech Stack

| Layer    | Technologies                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Clerk, framer-motion, lucide-react, react-hot-toast |
| Backend  | FastAPI, SQLAlchemy 2, Pydantic, Uvicorn                                                                           |
| AI       | Google Gemini (`google-genai`) or OpenRouter (OpenAI-compatible, free models)                                     |
| Parsing  | pdfplumber, pdfminer.six, python-docx                                                                              |
| Database | MySQL (PyMySQL) — falls back to SQLite for local dev                                                               |
| Infra    | Docker, Docker Compose, Render, GitHub Actions                                                                     |

## 📁 Project Structure

```
ATSBoost-AI/
├─ backend/                 # FastAPI service
│  ├─ ai/                   # LLM client, agents, prompts, offline fallback
│  ├─ database/             # engine, session, declarative base
│  ├─ models/               # SQLAlchemy models (user, resume, ats_report, …)
│  ├─ routes/               # API routers (resume, ats, dashboard, interview, …)
│  ├─ services/             # business logic + repositories
│  ├─ utils/                # parsing, pdf, cloudinary, tokens
│  ├─ tests/                # pytest suite
│  ├─ create_tables.py      # one-off schema bootstrap
│  └─ main.py               # FastAPI app entrypoint
├─ frontend/                # Next.js app
│  ├─ app/                  # routes (landing, dashboard, upload, interview, …)
│  ├─ components/           # UI components (landing, dashboard, resume, …)
│  └─ lib/                  # API client, helpers, types
├─ docker-compose.yml       # local MySQL + backend
└─ README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.11+ (3.13 recommended)
- A **MySQL** database (or use the bundled Docker Compose; SQLite works for quick local dev)
- A **Clerk** account (frontend auth) and an **AI key** (Gemini or OpenRouter)

### 1) Backend

```bash
cd backend
python -m venv venv
# Windows:        venv\Scripts\activate
# macOS / Linux:  source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env        # then fill in the values
python create_tables.py     # create database tables
uvicorn main:app --reload --port 8000
```

Interactive API docs: **http://localhost:8000/docs**

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # then fill in the values
npm run dev
```

App: **http://localhost:3000**

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable             | Required | Description                                                          |
| -------------------- | :------: | ------------------------------------------------------------------- |
| `DATABASE_URL`       |    –     | SQLAlchemy URL. Blank → local SQLite. e.g. `mysql://user:pw@host/db` |
| `LLM_PROVIDER`       |    –     | `gemini` or `openrouter`. Blank = auto-detect.                      |
| `GEMINI_API_KEY`     |    ◑     | Required when using Gemini.                                          |
| `OPENROUTER_API_KEY` |    ◑     | Required when using OpenRouter (has free models).                   |
| `OPENROUTER_MODEL`   |    –     | Defaults to `google/gemini-2.0-flash-exp:free`.                     |
| `ALLOWED_ORIGINS`    |    –     | Comma-separated CORS origins. Default `http://localhost:3000`.      |
| `CLOUDINARY_*`       |    –     | Optional file-upload storage.                                       |

> Provide **either** a Gemini key **or** an OpenRouter key. If neither is set, the
> app returns deterministic offline fallback responses so it never crashes.

### Frontend (`frontend/.env.local`)

| Variable                            | Required | Description                                      |
| ----------------------------------- | :------: | ------------------------------------------------ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |    ✅     | Clerk publishable key.                           |
| `CLERK_SECRET_KEY`                  |    ✅     | Clerk secret key.                                |
| `NEXT_PUBLIC_API_URL`               |    ✅     | Backend base URL (e.g. `http://localhost:8000`). |

## 🔌 API Overview

| Method | Endpoint                | Description                                        |
| ------ | ----------------------- | ------------------------------------------------- |
| POST   | `/api/resume/upload`    | Parse a resume (lightweight).                     |
| POST   | `/api/resume/analyze`   | Full pipeline: parse → score → AI tips → persist. |
| POST   | `/interview/questions`  | Generate tailored interview questions.            |
| POST   | `/interview/feedback`   | Grade an interview answer.                         |
| POST   | `/recruiter/simulate`   | ATS / recruiter / hiring-manager review.          |
| POST   | `/roadmap/`             | Build a learning roadmap from skills.             |
| GET    | `/dashboard/stats`      | Aggregated user metrics.                          |
| GET    | `/reports/export/{id}`  | Export a report as PDF.                            |
| POST   | `/share/{report_id}`    | Create a public share link.                       |
| GET    | `/share/view/{token}`   | View a shared report.                             |

## 🧪 Testing

```bash
# Backend
cd backend
venv/Scripts/python -m pytest          # Windows
# source venv/bin/activate && pytest   # macOS / Linux

# Frontend
cd frontend
npm run build                          # type-check + production build
npm run lint
```

## 🐳 Docker

```bash
docker compose up --build
```

Brings up a MySQL instance and the backend. The frontend ships with its own
`Dockerfile` and can be deployed to Vercel or any Node host.

## 🔒 Security Notes

- **Never commit secrets.** `.env`, `.env.local`, and `.claude/` are gitignored.
- Rotate any key that has ever been exposed in version control.
- Restrict `ALLOWED_ORIGINS` in production.

## 📄 License

Released under the MIT License.
