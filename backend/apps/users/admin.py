from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("username", "email", "user_type", "is_staff", "is_superuser", "is_active")
    list_filter = ("user_type", "is_staff", "is_superuser", "is_active")

    
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Informações Pessoais"), {"fields": ("first_name", "last_name", "email", "phone", "profile_picture", "address", "user_type")}),
        (_("Permissões"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_("Datas importantes"), {"fields": ("last_login", "date_joined")}),
    )
    
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "password1", "password2", "is_active", "is_staff", "is_superuser", "user_type"),
        }),
    )

    search_fields = ("username", "email", "first_name", "last_name")
    ordering = ("username",)
    filter_horizontal = ("groups", "user_permissions")
