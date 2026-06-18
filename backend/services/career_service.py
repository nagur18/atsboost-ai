def calculate_career_readiness(
    ats_score,
    skills_count,
    projects_count,
    interview_score
):
    score = (
        ats_score * 0.4
        + skills_count * 3
        + projects_count * 5
        + interview_score * 2
    )

    return min(
        round(score),
        100
    )