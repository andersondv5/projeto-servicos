from rest_framework.routers import DefaultRouter
from .viewsets import JobRequestViewSet

router = DefaultRouter()
router.register(r"jobrequests", JobRequestViewSet, basename="jobrequest")

urlpatterns = router.urls
