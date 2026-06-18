from fastapi import APIRouter

from database.session import SessionLocal
from models.interview_session import InterviewSession
from services.ats_repository import get_reports_for_user
from services.resume_repository import count_resumes_for_user
from services.user_repository import get_user_by_clerk_id

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


def _empty_stats():
    return {
        "resumes_analyzed": 0,
        "best_ats_score": None,
        "average_ats_score": None,
        "interview_sessions": 0,
        "recent_reports": [],
    }


@router.get("/stats")
def get_stats(clerk_id: str | None = None):
    """Aggregate dashboard metrics for a given Clerk user.

    Returns zeroed stats when the user is unknown or has no data yet.
    """
    if not clerk_id:
        return _empty_stats()

    db = SessionLocal()
    try:
        user = get_user_by_clerk_id(db, clerk_id)
        if not user:
            return _empty_stats()

        resumes_analyzed = count_resumes_for_user(db, user.id)
        reports = get_reports_for_user(db, user.id)

        scores = [r.total_score for r in reports if r.total_score is not None]
        best = max(scores) if scores else None
        avg = round(sum(scores) / len(scores), 1) if scores else None

        interview_sessions = (
            db.query(InterviewSession)
            .filter(InterviewSession.user_id == user.id)
            .count()
        )

        recent_reports = [
            {"id": r.id, "total_score": r.total_score} for r in reports[:5]
        ]

        return {
            "resumes_analyzed": resumes_analyzed,
            "best_ats_score": best,
            "average_ats_score": avg,
            "interview_sessions": interview_sessions,
            "recent_reports": recent_reports,
        }
    finally:
        db.close()


@router.get("/history")
def get_history():
    return {"message": "History endpoint"}
