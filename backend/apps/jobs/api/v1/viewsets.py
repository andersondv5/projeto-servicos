from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from apps.jobs.models import Job, JobCategory
from .serializers import JobSerializer, JobUpdateSerializer, JobCategorySerializer, JobCategoryUpdateSerializer
from apps.core.mixins.public_actions import PublicActionsMixin 
from apps.core.mixins.update_serializer_mixin import UpdateSerializerMixin
from rest_framework.permissions import IsAuthenticated

@extend_schema(tags=['Jobs'])
class JobViewSet(PublicActionsMixin, UpdateSerializerMixin,  viewsets.ModelViewSet):
    serializer_class = JobSerializer
    update_serializer_class = JobUpdateSerializer
    queryset = Job.objects.all()    
    permission_classes = [IsAuthenticated]

    def get_public_queryset(self):
        return Job.objects.actives()  
    
    def perform_create(self, serializer):
        serializer.save(professional=self.request.user)
    

@extend_schema(tags=['Job Categories'])
class JobCategoryViewSet(PublicActionsMixin, UpdateSerializerMixin, viewsets.ModelViewSet):
    serializer_class = JobCategorySerializer
    update_serializer_class = JobCategoryUpdateSerializer
    queryset = JobCategory.objects.all()
    permission_classes = [IsAuthenticated]

    def get_public_queryset(self):
        return JobCategory.objects.actives()
    