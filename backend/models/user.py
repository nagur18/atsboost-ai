from sqlalchemy import (
    Column,
    Integer,
    String
)

from database.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True
    )

    clerk_id = Column(
        String(255),
        unique=True
    )

    email = Column(
        String(255)
    )

    name = Column(
        String(255)
    )