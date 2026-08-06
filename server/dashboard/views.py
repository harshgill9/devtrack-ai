from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from jobs.models import Job
from resumes.models import Resume


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        jobs = Job.objects.filter(user=user)
        resumes = Resume.objects.filter(user=user)

        data = {
            "total_jobs": jobs.count(),
            "applied": jobs.filter(status="Applied").count(),
            "interview": jobs.filter(status="Interview").count(),
            "offer": jobs.filter(status="Offer").count(),
            "rejected": jobs.filter(status="Rejected").count(),
            "total_resumes": resumes.count(),
            "default_resume": None,
        }

        default_resume = resumes.filter(is_default=True).first()

        if default_resume:
            data["default_resume"] = default_resume.title

        return Response(data)