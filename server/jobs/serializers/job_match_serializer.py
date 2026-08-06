from rest_framework import serializers


class JobMatchSerializer(serializers.Serializer):
    resume_id = serializers.IntegerField()
    job_description = serializers.CharField()