"""OpenRouter chat-completions adapter.

OpenRouter exposes an OpenAI-compatible API and offers several free models
(suffixed with ":free"). This adapter keeps the same interface as the Gemini
adapter — `generate_content(prompt) -> namespace.text` — so the agents layer is
provider-agnostic. On any error it falls back to deterministic offline output.
"""

import os
from types import SimpleNamespace

import httpx

from ai.fallback import build_fallback

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_MODEL = "google/gemini-2.0-flash-exp:free"


class OpenRouterModelAdapter:
    def __init__(self, model_name: str | None = None):
        self.model_name = model_name or os.getenv(
            "OPENROUTER_MODEL", DEFAULT_MODEL
        )

    def _api_key(self) -> str:
        key = os.getenv("OPENROUTER_API_KEY")
        if not key:
            raise RuntimeError(
                "OPENROUTER_API_KEY is not configured. Set it in the backend .env file."
            )
        return key

    def generate_content(self, prompt: str):
        try:
            headers = {
                "Authorization": f"Bearer {self._api_key()}",
                "Content-Type": "application/json",
                # Optional attribution headers recommended by OpenRouter.
                "HTTP-Referer": os.getenv(
                    "OPENROUTER_SITE_URL", "http://localhost:3000"
                ),
                "X-Title": os.getenv("OPENROUTER_APP_NAME", "ATSBoost AI"),
            }
            payload = {
                "model": self.model_name,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant. When asked for JSON, return ONLY valid JSON with no markdown fences.",
                    },
                    {"role": "user", "content": prompt},
                ],
            }
            with httpx.Client(timeout=60) as client:
                response = client.post(
                    OPENROUTER_URL, headers=headers, json=payload
                )
                response.raise_for_status()
                data = response.json()
                text = data["choices"][0]["message"]["content"]
        except Exception:
            text = build_fallback(prompt)

        return SimpleNamespace(text=text)


model = OpenRouterModelAdapter()
