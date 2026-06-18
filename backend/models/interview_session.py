from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    String
)

from database.base import Base

class InterviewSession(Base):

    __tablename__ = "interview_sessions"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    question = Column(
        String(2000)
    )

    answer = Column(
        String(5000)
    )

    score = Column(
        Integer
    )