from rest_framework.views import APIView
from rest_framework.response import Response
from resumes.models import Resume
from resumes.utils.pdf_extractor import extract_text_from_pdf
from jobs.services.job_matcher import match_resume_with_job
from jobs.serializers.job_match_serializer import JobMatchSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from jobs.models import Job
from jobs.serializers.job_serializer import JobSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter, 
        filters.OrderingFilter,
    ]
    
    filterset_fields = [
        "status",
        "location",
    ]

    search_fields = [
        "company",
        "position",
        "location",
    ]

    ordering_fields = [
        "created_at",
        "applied_date",
        "company",
    ]

    ordering = ["-created_at"]

    def get_queryset(self):
        return Job.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(user=self.request.user)

class JobMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = JobMatchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resume_id = serializer.validated_data["resume_id"]
        job_description = serializer.validated_data["job_description"]

        try:
            resume = Resume.objects.get(
                pk=resume_id,
                user=request.user
            )
        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )

        resume_text = extract_text_from_pdf(
            resume.resume_file.path
        )

        result = match_resume_with_job(
            resume_text,
            job_description
        )

        return Response(result)