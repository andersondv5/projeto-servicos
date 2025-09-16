from rest_framework import serializers
from apps.jobrequests.models import JobRequest

class JobRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRequest        
        fields = [
            'id',
            'scheduled_date',
            'message',
            'status',
            'job',
            'client',
            'professional',
        ]
        read_only_fields = [
            "scheduled_date",
            'status',
            "client", 
            "professional",            
        ]    

class JobRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRequest 
        fields = [
            'id',
            'scheduled_date',
            'message',
            'status',
            'job',
            'client',
            'professional',
            'is_deleted',
        ]     
        read_only_fields = [
            'id',
            'scheduled_date',
            'status',
            'job',
            'client', 
            'professional',            
        ]  
