# Import all model modules so their tables are registered on Base.metadata
# as soon as the `models` package is imported. This ensures cross-table
# relationships (e.g. the ats_reports.user_id -> users.id foreign key) can be
# resolved at runtime regardless of which model a route imports directly.
from . import user
from . import resume
from . import ats_report
from . import interview_session
from . import roadmap

__all__ = [
    "user",
    "resume",
    "ats_report",
    "interview_session",
    "roadmap",
]
