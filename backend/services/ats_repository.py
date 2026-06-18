from sqlalchemy.orm import Session
from models.ats_report import ATSReport


def get_report(db: Session, report_id: int):
    return db.query(ATSReport).filter(ATSReport.id == report_id).first()


def get_reports_for_user(db: Session, user_id: int):
    return (
        db.query(ATSReport)
        .filter(ATSReport.user_id == user_id)
        .order_by(ATSReport.id.desc())
        .all()
    )


def save_ats_report(
    db: Session,
    user_id: int,
    report: dict
):
    ats = ATSReport(
        user_id=user_id,
        total_score=report["total_score"],
        formatting_score=report["formatting_score"],
        keyword_score=report["keyword_score"],
        skills_score=report["skills_score"],
        experience_score=report["experience_score"]
    )

    db.add(ats)
    db.commit()
    db.refresh(ats)

    return ats