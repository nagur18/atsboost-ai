def calculate_formatting_score(
    resume_data
):
    score = 0

    if resume_data.get("Name"):
        score += 5

    if resume_data.get("Email"):
        score += 5

    if resume_data.get("Phone"):
        score += 5

    if len(
        resume_data.get(
            "Skills", []
        )
    ) > 0:
        score += 5

    return score

def calculate_skills_score(
    resume_data
):
    skills = resume_data.get(
        "Skills",
        []
    )

    count = len(skills)

    return min(
        count * 3,
        25
    )

def calculate_experience_score(
    resume_data
):
    experience = resume_data.get(
        "Experience",
        []
    )

    if len(experience) == 0:
        return 0

    if len(experience) == 1:
        return 8

    if len(experience) >= 2:
        return 15

    return 0

def calculate_project_score(
    resume_data
):
    projects = resume_data.get(
        "Projects",
        []
    )

    return min(
        len(projects) * 2,
        10
    )

COMMON_TECH_KEYWORDS = [
    "Python",
    "Java",
    "React",
    "SQL",
    "AWS",
    "Docker",
    "Git",
    "JavaScript",
]

def calculate_keyword_score(
    resume_data
):
    skills = resume_data.get(
        "Skills",
        []
    )

    matched = 0

    for keyword in COMMON_TECH_KEYWORDS:
        if keyword in skills:
            matched += 1

    score = (
        matched /
        len(COMMON_TECH_KEYWORDS)
    ) * 30

    return round(score)

def generate_ats_report(
    resume_data
):
    formatting = (
        calculate_formatting_score(
            resume_data
        )
    )

    keywords = (
        calculate_keyword_score(
            resume_data
        )
    )

    skills = (
        calculate_skills_score(
            resume_data
        )
    )

    experience = (
        calculate_experience_score(
            resume_data
        )
    )

    projects = (
        calculate_project_score(
            resume_data
        )
    )

    total = (
        formatting
        + keywords
        + skills
        + experience
        + projects
    )

    return {
        "formatting_score": formatting,
        "keyword_score": keywords,
        "skills_score": skills,
        "experience_score": experience,
        "projects_score": projects,
        "total_score": total
    }

def find_missing_skills(
    resume_data
):
    skills = set(
        resume_data.get(
            "Skills",
            []
        )
    )

    expected = set([
        "Python",
        "React",
        "SQL",
        "AWS",
        "Docker",
        "Git",
        "CI/CD"
    ])

    return list(
        expected - skills
    )

