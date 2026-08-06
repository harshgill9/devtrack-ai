def match_resume_with_job(resume_text, job_description):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    skills = [
        "python",
        "django",
        "react",
        "node.js",
        "javascript",
        "html",
        "css",
        "sql",
        "postgresql",
        "mongodb",
        "git",
        "docker",
        "aws",
    ]

    matched_skills = []
    missing_skills = []

    for skill in skills:
        if skill in job_description:
            if skill in resume_text:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

    total = len(matched_skills) + len(missing_skills)

    if total == 0:
        score = 0
    else:
        score = round((len(matched_skills) / total) * 100)

    recommendations = []

    for skill in missing_skills:
        recommendations.append(f"Add or learn {skill}")

    return {
        "match_score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "recommendations": recommendations,
    }