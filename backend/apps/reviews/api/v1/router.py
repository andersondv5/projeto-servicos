from rest_framework.routers import DefaultRouter
from .viewsets import ReviewViewSet

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = router.urls