from ai.agents import (
    generate_interview_questions
)

def test_interview():

    questions = (
        generate_interview_questions(
            "Python Developer"
        )
    )

    assert questions