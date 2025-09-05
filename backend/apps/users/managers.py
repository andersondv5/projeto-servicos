from django.contrib.auth.base_user import BaseUserManager
from .querysets import UserQuerySet

class UserManager(BaseUserManager):
    use_in_migrations = True

    def get_queryset(self):
        return UserQuerySet(self.model, using=self._db)
    
    def actives(self):
        return self.get_queryset().actives() 
    
    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError("O username deve ser definido")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser precisa ter is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser precisa ter is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)
