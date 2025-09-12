from rest_framework import serializers
from apps.jobrequests.models import JobRequest

class JobRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRequest
        fields = [
            "id",
            "job",
            "client",
            "professional",
            "description",
            "requested_date",
            "scheduled_date",
            "status",
        ]
        read_only_fields = ["client", "professional", "requested_date", "status"]
