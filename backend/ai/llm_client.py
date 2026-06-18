"""Provider-agnostic LLM entrypoint used by the agents layer.

Selection logic (in order):
  1. LLM_PROVIDER env var, if set ("openrouter" or "gemini").
  2. Otherwise OpenRouter when OPENROUTER_API_KEY is present.
  3. Otherwise Gemini (the existing default).

This lets the project switch to OpenRouter's free models simply by adding
OPENROUTER_API_KEY to the backend .env — no code changes required.
"""

import os


def _select_model():
    provider = os.getenv("LLM_PROVIDER", "").strip().lower()

    if provider == "openrouter" or (
        not provider and os.getenv("OPENROUTER_API_KEY")
    ):
        from ai.openrouter_client import model as openrouter_model

        return openrouter_model

    from ai.gemini_client import model as gemini_model

    return gemini_model


model = _select_model()
