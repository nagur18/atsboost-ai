from fastapi import APIRouter, HTTPException

from database.session import (
    SessionLocal
)

from services.share_repository import (
    create_share_link
)

from models.ats_report import ATSReport

router = APIRouter(
    prefix="/share",
    tags=["Share"]
)

@router.post("/{report_id}")
def generate_share_link(
    report_id: int
):

    db = SessionLocal()

    try:
        token = create_share_link(
            db,
            report_id
        )
    finally:
        db.close()

    if token is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return {
        "share_url":
        f"http://localhost:8000/share/view/{token}"
    }

@router.get("/view/{token}")
def view_shared_report(
    token: str
):

    db = SessionLocal()

    try:
        report = (
            db.query(ATSReport)
            .filter(
                ATSReport.share_token
                == token
            )
            .first()
        )
    finally:
        db.close()

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return {
        "ats_score":
        report.total_score
    }
