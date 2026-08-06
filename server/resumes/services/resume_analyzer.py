def analyze_resume(text):
    text = text.lower()

    skills = [
        "python",
        "django",
        "react",
        "node.js",
        "javascript",
        "html",
        "css",
        "sql",
        "mongodb",
        "postgresql",
        "git",
        "docker",
        "aws"
    ]

    found_skills = []
    missing_skills = []

    for skill in skills:
        if skill in text:
            found_skills.append(skill)
        else:
            missing_skills.append(skill)

    score = min(100, len(found_skills) * 8)

    suggestions = []

    if "github" not in text:
        suggestions.append("Add your GitHub profile.")

    if "linkedin" not in text:
        suggestions.append("Add your LinkedIn profile.")

    if "internship" not in text:
        suggestions.append("Mention internship experience if available.")

    if len(missing_skills) > 0:
        suggestions.append("Learn and include more in-demand technical skills.")

    return {
        "ats_score": score,
        "found_skills": found_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }