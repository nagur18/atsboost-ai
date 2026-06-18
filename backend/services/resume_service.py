import re


def extract_email(text):
    match = re.search(
        r'[\w\.-]+@[\w\.-]+',
        text
    )

    return match.group(0) if match else None


def extract_phone(text):
    match = re.search(
        r'\+?\d[\d\s-]{8,}',
        text
    )

    return match.group(0) if match else None


def build_resume_json(text):
    return {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "raw_text": text[:2000]
    }