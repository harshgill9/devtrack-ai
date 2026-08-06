from resumes.services.resume_analyzer import analyze_resume
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from resumes.models import Resume
from resumes.utils.pdf_extractor import extract_text_from_pdf
from resumes.serializers.resume_serializer import ResumeSerializer
from django.shortcuts import get_object_or_404


class ResumeListCreateView(generics.ListCreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        print("DATA:", request.data)
        print("FILES:", request.FILES)

        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print("ERRORS:", serializer.errors)
            return Response(serializer.errors, status=400)

        serializer.save(user=request.user)
        return Response(serializer.data, status=201)


class ResumeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

class SetDefaultResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        Resume.objects.filter(user=request.user).update(is_default=False)

        resume = Resume.objects.get(pk=pk, user=request.user)
        resume.is_default = True
        resume.save()

        return Response({
            "message": "Default resume updated successfully."
        })

class ResumeExtractTextView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(pk=pk, user=request.user)

            text = extract_text_from_pdf(resume.resume_file.path)

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "text": text
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )

class ResumeAnalyzeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(pk=pk, user=request.user)

            text = extract_text_from_pdf(resume.resume_file.path)

            result = analyze_resume(text)

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                **result
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )