from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.jobrequests.models import JobRequest
from apps.jobs.models import Job
from .serializers import JobRequestSerializer
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Job Requests'])
class JobRequestViewSet(viewsets.ModelViewSet):
    queryset = JobRequest.objects.all()
    serializer_class = JobRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # O usuário vê apenas suas solicitações ou as que recebeu 
        user = self.request.user
        return JobRequest.objects.for_user(user)

    def perform_create(self, serializer):
        # Preenche automaticamente o client e o professional
        job = Job.objects.get(id=self.request.data.get('job'))
        serializer.save(
            client=self.request.user,
            professional=job.professional,
            scheduled_date=timezone.now()
        )
