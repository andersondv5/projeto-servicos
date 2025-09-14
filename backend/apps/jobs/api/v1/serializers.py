from rest_framework import serializers
from apps.jobs.models import Job, JobCategory

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'description',
            'price',
            'professional',
            'category'            
        ]
        read_only_fields = ['professional']


class JobUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'title',
            'description',
            'price',
            'category',
            'is_deleted'            
        ]

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = [
            'id', 
            'name', 
            'description'
        ]

class JobCategoryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = [
            'name', 
            'description',
            'is_deleted'
        ]

        