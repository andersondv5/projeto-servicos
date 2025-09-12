from rest_framework import viewsets, permissions
from apps.jobrequests.models import JobRequest
from apps.jobs.models import Job
from .serializers import JobRequestSerializer

class JobRequestViewSet(viewsets.ModelViewSet):
    queryset = JobRequest.objects.all()
    serializer_class = JobRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # O usuário vê apenas suas solicitações ou as que recebeu 
        user = self.request.user
        return JobRequest.objects.filter(client=user) | JobRequest.objects.filter(professional=user)

    def perform_create(self, serializer):
        # Preenche automaticamente o client e o professional
        job = Job.objects.get(id=self.request.data.get('job'))
        serializer.save(client=self.request.user, professional=job.professional)
