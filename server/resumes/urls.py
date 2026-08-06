from django.urls import path
from resumes.views import (
    ResumeListCreateView,
    ResumeDetailView,
    SetDefaultResumeView,
    ResumeExtractTextView,
    ResumeAnalyzeView,
)

urlpatterns = [
    path("", ResumeListCreateView.as_view(), name="resume-list-create"),
    path("<int:pk>/", ResumeDetailView.as_view(), name="resume-detail"),
    path("<int:pk>/set-default/", SetDefaultResumeView.as_view(), name="set-default-resume"),
    path("<int:pk>/extract-text/", ResumeExtractTextView.as_view(), name="resume-extract-text"),
    path("<int:pk>/analyze/", ResumeAnalyzeView.as_view(), name="resume-analyze"),
]