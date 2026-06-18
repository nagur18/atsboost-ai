import os
import warnings
import sys

from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# If running under pytest or TESTING=1, prefer an isolated local SQLite database.
if os.getenv("TESTING") == "1" or 'PYTEST_CURRENT_TEST' in os.environ or any('pytest' in s for s in sys.argv):
    warnings.warn("Detected test run; using sqlite:///./atsboost_test.db for tests")
    DATABASE_URL = "sqlite:///./atsboost_test.db"

if not DATABASE_URL:
    # Default to a local SQLite file for development when DATABASE_URL is not provided.
    warnings.warn("DATABASE_URL not found in environment; defaulting to sqlite:///./atsboost.db for local development")
    DATABASE_URL = "sqlite:///./atsboost.db"

# If a MySQL URL without driver is provided, prefer pymysql driver to avoid requiring MySQLdb.
if DATABASE_URL.startswith("mysql://"):
    DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)

ECHO_SQL = (
    os.getenv(
        "SQLALCHEMY_ECHO",
        "false"
    ).lower()
    in {"1", "true", "yes"}
)

engine = create_engine(
    DATABASE_URL,
    echo=ECHO_SQL,
    pool_pre_ping=True,
)

# If running tests, create tables on the same engine so tests can run against the local SQLite DB.
if os.getenv("TESTING") == "1" or 'PYTEST_CURRENT_TEST' in os.environ or any('pytest' in s for s in sys.argv):
    try:
        from database.base import Base
        # Import models to ensure all table metadata is registered
        import models.user
        import models.resume
        import models.ats_report
        import models.interview_session
        import models.roadmap

        Base.metadata.create_all(bind=engine)
    except Exception:
        # Avoid failing import-time when optional DB libs missing; tests will surface issues.
        pass
