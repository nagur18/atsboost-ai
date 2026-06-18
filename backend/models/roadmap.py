from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    String
)

from database.base import Base

class Roadmap(Base):

    __tablename__ = "roadmaps"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    content = Column(
        String(10000)
    )