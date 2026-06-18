import sys
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from routes.ats import router as ats_router
from routes.dashboard import router as dashboard_router
from routes.interview import router as interview_router
from routes.resume import router as resume_router
from routes import recruiter
from routes.reports import router as reports_router
from routes.share import router as share_router

app = FastAPI()

# Configure CORS from ALLOWED_ORIGINS (.env, comma-separated). Default is '*' (not recommended for production).
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",") if os.getenv("ALLOWED_ORIGINS") else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    resume_router,
    prefix="/api/resume",
    tags=["Resume"]
)

app.include_router(
    ats_router,
    prefix="/api/ats",
    tags=["ATS"]
)

app.include_router(
    recruiter.router,
    prefix="/recruiter",
    tags=["Recruiter"],
)

app.include_router(
    interview_router
)

app.include_router(
    dashboard_router
)

app.include_router(
    reports_router
)

app.include_router(
    share_router
)
