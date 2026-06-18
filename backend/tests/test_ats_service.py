from services.ats_service import generate_ats_report


def test_generate_ats_report_returns_expected_scores():
    resume_data = {
        "Name": "Tom",
        "Email": "tom@gmail.com",
        "Phone": "9999999999",
        "Skills": ["Python", "React", "SQL"],
        "Education": ["B.Tech"],
        "Experience": ["Python Developer"],
        "Projects": ["Resume Analyzer", "Portfolio"],
    }

    report = generate_ats_report(resume_data)

    assert report["formatting_score"] == 20
    assert report["keyword_score"] == 11
    assert report["skills_score"] == 9
    assert report["experience_score"] == 8
    assert report["projects_score"] == 4
    assert report["total_score"] == 52
