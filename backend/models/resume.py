from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from database.base import Base

class Resume(Base):

    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    file_name = Column(
        String(255)
    )

    resume_url = Column(
        String(1000)
    )

    parsed_text = Column(
        String(10000)
    )

    version = Column(
        Integer,
        default=1
    )