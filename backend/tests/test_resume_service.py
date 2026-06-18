from services.resume_service import build_resume_json


def test_build_resume_json_extracts_contact_details():
    text = "Contact: tom@example.com, +91 99999 99999"

    result = build_resume_json(text)

    assert result["email"] == "tom@example.com"
    assert result["phone"] == "+91 99999 99999"
    assert result["raw_text"] == text[:2000]
