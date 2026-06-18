def calculate_user_analytics(
    reports
):
    if not reports:
        return {
            "average_score": 0
        }

    avg = (
        sum(
            r.total_score
            for r in reports
        )
        / len(reports)
    )

    return {
        "average_score":
        round(avg, 2)
    }