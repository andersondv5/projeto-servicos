from django.contrib import admin
from apps.jobrequests.models import JobRequest

@admin.register(JobRequest)
class JobRequestAdmin(admin.ModelAdmin):
    
    list_display = ["id", "job", "client", "professional", "status", "scheduled_date"]
    
    list_filter = ["status", "scheduled_date", "job"]
    
    search_fields = ["client__username", "professional__username", "job__title"]
    
    ordering = ["-scheduled_date"]
