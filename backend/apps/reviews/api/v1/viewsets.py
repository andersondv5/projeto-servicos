from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.reviews.models import Review
from .serializers import ReviewSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]