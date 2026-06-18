from fastapi import APIRouter
from pydantic import BaseModel

from services.roadmap_service import (
    create_roadmap
)

router = APIRouter(
    prefix="/roadmap",
    tags=["Roadmap"]
)

class SkillsInput(BaseModel):
    skills: list

@router.post("/")
def roadmap(
    data: SkillsInput
):
    return create_roadmap(
        data.skills
    )