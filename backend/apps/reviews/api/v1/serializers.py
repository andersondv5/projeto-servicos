from rest_framework import serializers
from apps.reviews.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",           
            "rating",
            "comment",
            "job",
            "professional",
            "client",
        ]
        read_only_fields = [
            "professional",
            "client",
        ]
    
    def validate(self, data):       
        user = self.context["request"].user
        job = data.get("job")
        if Review.objects.filter(job=job, client=user).exists():
            raise serializers.ValidationError(
                {"detail": "Você já criou uma review para este serviço."}
            )
        return data

class ReviewUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [          
            "rating",
            "comment",
            "is_deleted"
        ]

        