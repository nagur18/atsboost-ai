from database.base import Base
from database.connection import engine

import models.user
import models.resume
import models.ats_report
import models.interview_session
import models.roadmap
import models

Base.metadata.create_all(
    bind=engine
)

print(
    "Tables Created Successfully"
)
