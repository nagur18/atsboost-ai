from ai.agents import (
    generate_interview_questions,
    evaluate_answer
)

def generate_questions(
    resume_text: str
):
    return generate_interview_questions(
        resume_text
    )

def evaluate_interview_answer(
    question: str,
    answer: str
):
    return evaluate_answer(
        question,
        answer
    )