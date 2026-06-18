from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)

from database.base import Base
from sqlalchemy import String

class ATSReport(Base):

    __tablename__ = "ats_reports"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    total_score = Column(
        Integer
    )

    formatting_score = Column(
        Integer
    )

    keyword_score = Column(
        Integer
    )

    skills_score = Column(
        Integer
    )

    experience_score = Column(
        Integer
    )

    share_token = Column(
    String(255),
    unique=True,
    nullable=True
    )

def get_recent_reports(
    db,
    user_id
):
    return (
        db.query(ATSReport)
        .filter(
            ATSReport.user_id
            == user_id
        )
        .order_by(
            ATSReport.id.desc()
        )
        .limit(5)
        .all()
    )