from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.core.models import BaseModel, Address
from .managers import UserManager

class User(BaseModel, AbstractUser):
    class UserType(models.IntegerChoices):
            SUPER_USER = 0, "Super Usuário"
            CLIENT = 1, "Cliente"
            PROFESSIONAL = 2, "Profissional"
    
    phone = models.CharField(
        verbose_name="Número de (telefone/WhatsApp)",
        max_length=14, 
        blank=True, 
        null=True
    )
    user_type = models.IntegerField(
        verbose_name="Tipo de usuário",
        choices=UserType.choices,
        default=UserType.CLIENT
    )
    address = models.OneToOneField(
        Address,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )    
    profile_picture = models.ImageField(
        verbose_name="Foto de perfil",
        upload_to="profile_images/",
        blank=True,
        null=True
    )

    objects = UserManager()

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()
