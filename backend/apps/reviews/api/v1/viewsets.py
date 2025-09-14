from rest_framework import viewsets
from apps.reviews.models import Review
from .serializers import ReviewSerializer, ReviewUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from apps.core.mixins.public_actions import PublicActionsMixin 
from apps.core.mixins.update_serializer_mixin import UpdateSerializerMixin

@extend_schema(tags=['Review'])
class ReviewViewSet(PublicActionsMixin, UpdateSerializerMixin,  viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    update_serializer_class = ReviewUpdateSerializer
    queryset = Review.objects.actives()   
    public_actions = ["list", "retrieve"]
    permission_classes = [IsAuthenticated]    
    
    def get_queryset(self):
        if self.is_public_action():
            return Review.objects.actives() 
        return Review.objects.by_client(self.request.user)
    
    def perform_create(self, serializer):
        job = serializer.validated_data.get('job')
        serializer.save(
            job=job,
            professional=job.professional,
            client=self.request.user
        )
