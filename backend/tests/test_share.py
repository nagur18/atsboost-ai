from fastapi.testclient import TestClient

from database.session import SessionLocal
from main import app
from models.ats_report import ATSReport
from models.user import User  # noqa: F401


client = TestClient(app)


def test_generate_share_link_for_existing_report():
    db = SessionLocal()

    try:
        report = ATSReport(
            user_id=None,
            total_score=91,
            formatting_score=20,
            keyword_score=25,
            skills_score=24,
            experience_score=22
        )
        db.add(report)
        db.commit()
        db.refresh(report)

        response = client.post(
            f"/share/{report.id}"
        )

        assert response.status_code == 200
        share_url = response.json()["share_url"]
        assert "/share/view/" in share_url

        token = share_url.rsplit("/", 1)[-1]
        db.commit()
        db.refresh(report)
        assert report.share_token == token
    finally:
        db.close()


def test_generate_share_link_returns_404_for_missing_report():
    response = client.post(
        "/share/999999"
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Report not found"
