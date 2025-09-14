from rest_framework.routers import DefaultRouter
from .viewsets import JobViewSet, JobCategoryViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'job-categories', JobCategoryViewSet, basename='category')
urlpatterns = router.urls