import os
import shutil

from fastapi import APIRouter, File, Form, UploadFile

from ai.agents import (
    analyze_resume as ai_analyze_resume,
    generate_resume_tips,
)
from database.session import SessionLocal
from services.ats_repository import save_ats_report
from services.ats_service import find_missing_skills, generate_ats_report
from services.resume_repository import save_resume
from services.resume_service import build_resume_json
from services.user_repository import get_or_create_user
from utils.parser import extract_docx_text, extract_pdf_text

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


def _save_and_extract(file: UploadFile):
    """Persist the uploaded file to disk and return (path, extracted_text)."""
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if file.filename.endswith(".pdf"):
        return file_path, extract_pdf_text(file_path)
    if file.filename.endswith(".docx"):
        return file_path, extract_docx_text(file_path)
    return file_path, None


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):
    _, text = _save_and_extract(file)

    if text is None:
        return {"error": "Unsupported file format"}

    return build_resume_json(text)


@router.post("/analyze")
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    clerk_id: str | None = Form(default=None),
):
    """Full pipeline: parse -> AI extraction -> ATS scoring -> AI tips -> persist.

    Returns the structured resume data, the ATS report (with a saved report_id),
    AI-generated improvement tips, and the list of missing skills.
    """
    _, text = _save_and_extract(file)

    if text is None:
        return {"error": "Unsupported file format"}

    # --- AI structured extraction (resilient to AI/parse failures) ---
    try:
        resume_data = ai_analyze_resume(text)
    except Exception:
        resume_data = build_resume_json(text)

    if not isinstance(resume_data, dict):
        resume_data = {}

    # --- Deterministic ATS scoring ---
    ats_report = generate_ats_report(resume_data)
    missing_skills = find_missing_skills(resume_data)

    # --- AI tips / modifications ---
    tips = generate_resume_tips(resume_data, ats_report)

    # --- Persist resume + report ---
    report_id = None
    resume_id = None
    db = SessionLocal()
    try:
        user = get_or_create_user(db, clerk_id)
        user_id = user.id if user else None

        resume_row = save_resume(
            db, user_id, file.filename, (text or "")[:10000]
        )
        resume_id = resume_row.id

        report_row = save_ats_report(db, user_id, ats_report)
        report_id = report_row.id
    except Exception:
        db.rollback()
    finally:
        db.close()

    return {
        "resume_id": resume_id,
        "report_id": report_id,
        "file_name": file.filename,
        "resume_data": resume_data,
        "ats_report": ats_report,
        "missing_skills": missing_skills,
        "tips": tips,
    }
