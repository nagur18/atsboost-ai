from models.ats_report import ATSReport

from utils.token_generator import (
    generate_share_token
)

def create_share_link(
    db,
    report_id
):

    report = (
        db.query(ATSReport)
        .filter(
            ATSReport.id == report_id
        )
        .first()
    )

    if not report:
        return None

    token = generate_share_token()

    report.share_token = token

    db.commit()

    return token