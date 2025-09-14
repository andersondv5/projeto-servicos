from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from apps.users.models import User
from .serializers import UserSerializer, UserUpdateSerializer
from drf_spectacular.utils import extend_schema
from apps.core.mixins.update_serializer_mixin import UpdateSerializerMixin

@extend_schema(tags=['User'])
class UserViewSet(UpdateSerializerMixin, viewsets.ModelViewSet):
    serializer_class = UserSerializer
    update_serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):           
        if self.action in ['list', 'retrieve']:
            return User.objects.actives()
        return User.objects.all()