import json

import pytest

from ai.gemini_client import GeminiModelAdapter


class BrokenClient:
    class Models:
        def generate_content(self, **kwargs):
            raise RuntimeError("quota exhausted")

    models = Models()


def test_generate_content_returns_fallback_when_ai_call_fails(monkeypatch):
    adapter = GeminiModelAdapter()

    monkeypatch.setattr(adapter, "_get_client", lambda: BrokenClient())

    result = adapter.generate_content("Generate interview questions for Python Developer")

    assert result.text
    assert json.loads(result.text)
