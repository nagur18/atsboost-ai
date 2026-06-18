from fastapi import APIRouter
from pydantic import BaseModel

from services.interview_service import (
    generate_questions,
    evaluate_interview_answer
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)

class ResumeInput(BaseModel):
    resume_text: str

class FeedbackInput(BaseModel):
    question: str
    answer: str

@router.post("/questions")
def interview_questions(
    data: ResumeInput
):
    return generate_questions(
        data.resume_text
    )

@router.post("/feedback")
def interview_feedback(
    data: FeedbackInput
):
    return evaluate_interview_answer(
        data.question,
        data.answer
    )