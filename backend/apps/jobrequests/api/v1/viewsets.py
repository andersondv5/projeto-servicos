from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.jobrequests.models import JobRequest
from apps.jobs.models import Job
from .serializers import JobRequestSerializer, JobRequestUpdateSerializer
from drf_spectacular.utils import extend_schema
from apps.core.mixins.update_serializer_mixin import UpdateSerializerMixin

@extend_schema(tags=['Job Requests'])
class JobRequestViewSet(UpdateSerializerMixin, viewsets.ModelViewSet):
    serializer_class = JobRequestSerializer
    update_serializer_class = JobRequestUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):        
        if self.action in ['list', 'retrieve']:
            # O usuário vê apenas suas solicitações ou as que recebeu 
            user = self.request.user
            return JobRequest.objects.for_user(user)
        return JobRequest.objects.all() 

    def perform_create(self, serializer):
        # Preenche automaticamente o client e o professional
        job = Job.objects.get(id=self.request.data.get('job'))
        serializer.save(
            client=self.request.user,
            professional=job.professional,
            scheduled_date=timezone.now()
        )
