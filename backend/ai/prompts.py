
RECRUITER_SIMULATION_PROMPT = """
Act as:

1. ATS System
2. Technical Recruiter
3. Hiring Manager

Analyze the resume data below.

Return ONLY JSON.

Resume Data:

{resume_data}

JSON Format:

{
  "ats_perspective": {
    "result": ""
  },

  "recruiter_perspective": {
    "strengths": [],
    "weaknesses": [],
    "decision": ""
  },

  "hiring_manager_perspective": {
    "technical_strengths": [],
    "concerns": [],
    "decision": ""
  }
}
"""

RESUME_ANALYSIS_PROMPT = """
Analyze the resume below.

Extract:

1. Name
2. Email
3. Phone
4. Skills
5. Education
6. Experience
7. Projects

Return ONLY valid JSON.

Resume:

{resume_text}
"""

RESUME_TIPS_PROMPT = """
You are a senior career coach and professional resume reviewer.

Given the candidate's structured resume data and their ATS score breakdown,
provide concrete, actionable improvements to maximize their ATS score and
recruiter appeal. Be specific and practical.

Resume Data:
{resume_data}

ATS Report:
{ats_report}

Return ONLY valid JSON (no markdown) in EXACTLY this format:

{
  "summary": "one or two sentence overall assessment",
  "strengths": ["..."],
  "improvements": [
    { "issue": "what's wrong or missing", "suggestion": "how to fix it" }
  ],
  "keyword_suggestions": ["missing or weak keywords to add"],
  "formatting_tips": ["specific formatting/structure tips"]
}
"""

INTERVIEW_QUESTIONS_PROMPT = """
You are a senior technical interviewer.

Based on the resume below generate:

10 Technical Questions
5 Behavioral Questions
5 HR Questions
5 Project Questions

Return JSON only.

Resume:

{resume_text}
"""

INTERVIEW_FEEDBACK_PROMPT = """
You are a senior interviewer.

Evaluate the answer.

Return:

Score out of 10
Strengths
Weaknesses
Improvements

Question:
{question}

Answer:
{answer}

Return JSON only.
"""

ROADMAP_PROMPT = """
You are a Senior Career Mentor.

Based on the missing skills below:

{skills}

Generate:

1. Skill Priority Order
2. 4 Week Learning Roadmap
3. Recommended Projects
4. Recommended Free Resources
5. Career Advice

Return JSON only.

Format:

{
  "skill_priority": [],
  "weekly_plan": [],
  "projects": [],
  "resources": [],
  "career_advice": ""
}
"""