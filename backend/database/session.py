import os
from sqlalchemy.orm import sessionmaker

from database.connection import engine
from database.base import Base

# Import all models so SQLAlchemy registers every table on Base.metadata. This
# must happen unconditionally (not only during tests) so cross-table foreign
# keys — e.g. ats_reports.user_id -> users.id — resolve at runtime regardless
# of which model a given route imports directly.
import models  # noqa: F401  (registers all model tables via models/__init__.py)

# During tests, also create the tables automatically so the suite can run
# against a local SQLite DB without a separate migration step.
if os.getenv("TESTING") == "1" or 'PYTEST_CURRENT_TEST' in os.environ:
    Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
