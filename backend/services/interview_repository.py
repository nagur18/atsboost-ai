from sqlalchemy.orm import Session
from models.interview_session import (
    InterviewSession
)

def save_interview_result(
    db: Session,
    user_id: int,
    question: str,
    answer: str,
    score: int
):
    interview = InterviewSession(
        user_id=user_id,
        question=question,
        answer=answer,
        score=score
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)

    return interview