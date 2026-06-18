import json
import re

from ai.llm_client import model
from ai.prompts import (
    RESUME_ANALYSIS_PROMPT,
    RESUME_TIPS_PROMPT,
    INTERVIEW_QUESTIONS_PROMPT,
    INTERVIEW_FEEDBACK_PROMPT,
    ROADMAP_PROMPT,
)


def _parse_json(text: str):
    """Strip markdown fences / stray prose and parse the first JSON object."""
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?", "", cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r"```$", "", cleaned, flags=re.MULTILINE).strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Best-effort: grab the outermost {...} block.
        match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
        if match:
            return json.loads(match.group(0))
        raise

def analyze_resume(resume_text: str):
    prompt = RESUME_ANALYSIS_PROMPT.format(
        resume_text=resume_text
    )

    response = model.generate_content(prompt)

    text = response.text.strip()

    # Remove code fences if present
    text = re.sub(r"^```json", "", text, flags=re.MULTILINE)
    text = re.sub(r"```$", "", text, flags=re.MULTILINE)
    text = text.strip()

    parsed = json.loads(text)

    # Normalize top-level keys to Title case (e.g., 'skills' -> 'Skills') so downstream tests/clients
    # have a stable schema regardless of AI output casing.
    normalized = {
        (k[0].upper() + k[1:]) if k else k: v
        for k, v in parsed.items()
    }

    return normalized

from ai.prompts import (
    RECRUITER_SIMULATION_PROMPT
)

def recruiter_simulation(
    resume_data
):
    prompt = (
        RECRUITER_SIMULATION_PROMPT
        .replace(
            "{resume_data}",
            str(resume_data)
        )
    )

    response = (
        model.generate_content(
            prompt
        )
    )

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(
        cleaned
    )

def generate_interview_questions(
    resume_text: str
):
    prompt = (
        INTERVIEW_QUESTIONS_PROMPT
        .replace(
            "{resume_text}",
            resume_text
        )
    )

    response = model.generate_content(
        prompt
    )

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)

def evaluate_answer(
    question: str,
    answer: str
):
    prompt = (
        INTERVIEW_FEEDBACK_PROMPT
        .replace("{question}", question)
        .replace("{answer}", answer)
    )

    response = model.generate_content(
        prompt
    )

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)

def generate_learning_roadmap(
    skills
):
    prompt = (
        ROADMAP_PROMPT
        .replace(
            "{skills}",
            str(skills)
        )
    )

    response = model.generate_content(
        prompt
    )

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)


def generate_resume_tips(resume_data, ats_report):
    """Produce actionable, AI-generated tips and modifications for a resume.

    Returns a dict: summary, strengths[], improvements[{issue, suggestion}],
    keyword_suggestions[], formatting_tips[]. Falls back gracefully on error.
    """
    prompt = (
        RESUME_TIPS_PROMPT
        .replace("{resume_data}", json.dumps(resume_data, default=str))
        .replace("{ats_report}", json.dumps(ats_report, default=str))
    )

    response = model.generate_content(prompt)

    try:
        return _parse_json(response.text)
    except Exception:
        return {
            "summary": "Could not generate personalized tips right now.",
            "strengths": [],
            "improvements": [],
            "keyword_suggestions": [],
            "formatting_tips": [],
        }

