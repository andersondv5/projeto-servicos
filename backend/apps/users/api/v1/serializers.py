from rest_framework import serializers
from apps.users.models import User
from apps.users.models import Profile
from drf_spectacular.utils import extend_schema_field


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "phone",
            "profile_picture",
        ]
        
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        extra_kwargs = {
            "password": {"write_only": True}
        }
        fields = [
            'id',
            'username',
            'password',
            'profile'
        ]
    
    @extend_schema_field(ProfileSerializer)
    def get_profile(self, instance):
        profile = Profile.objects.filter(user=instance).first()
        if profile:
            return ProfileSerializer(profile).data
        return None

class UserUpdateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        extra_kwargs = {
            "password": {"write_only": True}
        }
        fields = [
            'username',
            'password',
            'is_deleted'
        ]   
   