from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.core.models import BaseModel, Address
from .managers import UserManager

class User(BaseModel, AbstractUser):
    class UserType(models.IntegerChoices):
            CLIENT = 0, "Cliente"
            PROFESSIONAL = 1, "Profissional"    
    
    user_type = models.IntegerField(
        verbose_name="Tipo de usuário",
        choices=UserType.choices,
        default=UserType.CLIENT
    )

    objects = UserManager()

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()


class Profile(BaseModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    phone = models.CharField(
        verbose_name="Número de telefone/WhatsApp",
        max_length=14,
        blank=True,
        null=True
    )
    address = models.OneToOneField(
        Address,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    profile_picture = models.ImageField(
        verbose_name="Foto de perfil",
        upload_to="profile_images/",
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = "Perfil de Usuário"
        verbose_name_plural = "Perfis de Usuários"

    def __str__(self):
        return f"Perfil de {self.user}"
