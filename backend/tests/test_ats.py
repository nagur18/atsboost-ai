from services.ats_service import (
    generate_ats_report
)

def test_ats_score():

    sample_resume = {
        "Name": "Tom",
        "Email": "test@gmail.com",
        "Phone": "9999999999",
        "Skills": [
            "Python",
            "React",
            "SQL"
        ],
        "Experience": [
            "Developer"
        ],
        "Projects": [
            "ATSBoost"
        ]
    }

    report = generate_ats_report(
        sample_resume
    )

    assert (
        report["total_score"] > 0
    )