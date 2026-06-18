from sqlalchemy.orm import Session
from models.resume import Resume


def count_resumes_for_user(db: Session, user_id: int) -> int:
    return db.query(Resume).filter(Resume.user_id == user_id).count()


def save_resume(
    db: Session,
    user_id: int,
    file_name: str,
    parsed_text: str
):
    resume = Resume(
        user_id=user_id,
        file_name=file_name,
        parsed_text=parsed_text
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume