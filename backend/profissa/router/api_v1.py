from django.conf.urls import include
from django.urls import path

from apps.jobs.api.v1.router import router as jobs_router
from apps.reviews.api.v1.router import router as reviews_router
from apps.users.api.v1.router import router as users_router
from apps.jobrequests.api.router import router as jobrequests_router

api_v1_urls = [
    path("", include((jobs_router.urls, "jobs"), namespace="jobs")),
    path("", include((reviews_router.urls, "reviews"), namespace="reviews")),
    path("", include((users_router.urls, "users"), namespace="users")),
    path("", include((jobrequests_router.urls, "jobrequests"), namespace="jobrequests")),
]
