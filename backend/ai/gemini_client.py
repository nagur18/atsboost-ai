import json
import os
import re
from types import SimpleNamespace

from dotenv import load_dotenv
from google import genai

load_dotenv()


class GeminiModelAdapter:
    def __init__(self, model_name: str = "gemini-2.5-flash"):
        self.model_name = model_name
        self._client = None

    def _fallback_payload(self, prompt: str) -> str:
        prompt_lower = prompt.lower()

        if "analyze the resume" in prompt_lower or "extract:" in prompt_lower:
            return json.dumps(
                self._fallback_resume_analysis(prompt)
            )

        if "interview" in prompt_lower or "question" in prompt_lower:
            return json.dumps({
                "questions": [
                    "Tell me about your experience with the main technologies in your resume.",
                    "Describe a challenging project you worked on and how you solved it."
                ],
                "note": "AI service is currently unavailable due to quota limits; these are fallback interview prompts."
            })

        if "feedback" in prompt_lower or "answer" in prompt_lower:
            return json.dumps({
                "score": 0,
                "feedback": "AI feedback is temporarily unavailable because the Gemini quota has been reached. Please try again later.",
                "strengths": [],
                "improvements": ["Retry when the AI service is available."]
            })

        return json.dumps({
            "status": "fallback",
            "message": "AI service is temporarily unavailable. Please try again later."
        })

    def _fallback_resume_analysis(self, prompt: str) -> dict:
        resume_text = prompt.split(
            "Resume:",
            1
        )[-1]

        lines = [
            line.strip()
            for line in resume_text.splitlines()
            if line.strip()
        ]

        email_match = re.search(
            r"[\w\.-]+@[\w\.-]+",
            resume_text
        )
        phone_match = re.search(
            r"\+?\d[\d\s-]{8,}",
            resume_text
        )

        skills = []
        for index, line in enumerate(lines):
            if line.lower().startswith("skills"):
                skills = [
                    skill
                    for skill in lines[index + 1:]
                    if not skill.endswith(":")
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
            "note": "AI service is currently unavailable; this is fallback resume parsing."
        }

    def _get_client(self):
        if self._client is None:
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise RuntimeError(
                    "GEMINI_API_KEY is not configured. Set it in the backend .env file before calling AI endpoints."
                )
            self._client = genai.Client(api_key=api_key)
        return self._client

    def generate_content(self, prompt: str):
        try:
            response = self._get_client().models.generate_content(
                model=self.model_name,
                contents=prompt,
            )
            text = getattr(response, "text", str(response))
        except Exception:
            text = self._fallback_payload(prompt)

        return SimpleNamespace(text=text)


model = GeminiModelAdapter()
