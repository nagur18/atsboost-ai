"""Shared offline fallback responses.

When the configured AI provider is unavailable (no API key, quota exhausted,
network error), adapters return a deterministic JSON payload so the rest of
the pipeline keeps working instead of raising 500s. The shape mirrors what the
real prompts ask the model to return.
"""

import json
import re


def _fallback_resume_analysis(prompt: str) -> dict:
    resume_text = prompt.split("Resume:", 1)[-1]

    lines = [line.strip() for line in resume_text.splitlines() if line.strip()]

    email_match = re.search(r"[\w\.-]+@[\w\.-]+", resume_text)
    phone_match = re.search(r"\+?\d[\d\s-]{8,}", resume_text)

    skills = []
    for index, line in enumerate(lines):
        if line.lower().startswith("skills"):
            skills = [
                skill for skill in lines[index + 1:] if not skill.endswith(":")
            ]
            break

    name = lines[0] if lines else None

    return {
        "Name": name,
        "Email": email_match.group(0) if email_match else None,
        "Phone": phone_match.group(0) if phone_match else None,
        "Skills": skills,
        "Education": [],
        "Experience": [],
        "Projects": [],
        "note": "AI service is currently unavailable; this is fallback resume parsing.",
    }


def build_fallback(prompt: str) -> str:
    """Return a JSON string appropriate for the kind of prompt supplied."""
    prompt_lower = prompt.lower()

    if "analyze the resume" in prompt_lower or "extract:" in prompt_lower:
        return json.dumps(_fallback_resume_analysis(prompt))

    if "improvement" in prompt_lower or "tips" in prompt_lower or (
        "resume" in prompt_lower and "suggest" in prompt_lower
    ):
        return json.dumps(
            {
                "summary": "AI tips are temporarily unavailable. Here are general best practices.",
                "strengths": [
                    "Clear contact details",
                    "Relevant technical skills listed",
                ],
                "improvements": [
                    {
                        "issue": "Quantify your impact",
                        "suggestion": "Add metrics to achievements (e.g. 'improved performance by 30%').",
                    },
                    {
                        "issue": "Tailor keywords",
                        "suggestion": "Mirror keywords from the job description to pass ATS filters.",
                    },
                ],
                "keyword_suggestions": ["Docker", "CI/CD", "AWS", "REST APIs"],
                "formatting_tips": [
                    "Use a single-column, ATS-friendly layout.",
                    "Keep to standard section headings (Experience, Skills, Education).",
                ],
                "note": "Fallback tips — connect an AI provider for personalized analysis.",
            }
        )

    if "interview" in prompt_lower or "question" in prompt_lower:
        return json.dumps(
            {
                "technical": [
                    "Walk me through the main technologies on your resume.",
                    "Describe a challenging bug you fixed and how.",
                ],
                "behavioral": [
                    "Tell me about a time you handled a tight deadline.",
                ],
                "hr": ["Why do you want this role?"],
                "project": ["Explain the architecture of your favorite project."],
                "note": "AI service is currently unavailable; these are fallback interview prompts.",
            }
        )

    if "feedback" in prompt_lower or "answer" in prompt_lower:
        return json.dumps(
            {
                "score": 0,
                "feedback": "AI feedback is temporarily unavailable. Please try again later.",
                "strengths": [],
                "improvements": ["Retry when the AI service is available."],
            }
        )

    if "roadmap" in prompt_lower or "learning" in prompt_lower:
        return json.dumps(
            {
                "skill_priority": [],
                "weekly_plan": [],
                "projects": [],
                "resources": [],
                "career_advice": "AI roadmap is temporarily unavailable.",
            }
        )

    return json.dumps(
        {
            "status": "fallback",
            "message": "AI service is temporarily unavailable. Please try again later.",
        }
    )
