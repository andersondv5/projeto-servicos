from django.db import models
from apps.core.models import BaseModel
from apps.users.models import User
from .managers import JobManager, JobCategoryManager

class JobCategory(BaseModel):
    name = models.CharField("Nome da categoria", max_length=100, unique=True)
    description = models.TextField("Descrição", blank=True, null=True)

    objects = JobCategoryManager()

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return self.name
    

class Job(BaseModel):
    professional = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="jobs",
        limit_choices_to={"user_type": User.UserType.PROFESSIONAL},
        verbose_name="Profissional"
    )
    title = models.CharField("Título do serviço", max_length=150)
    description = models.TextField("Descrição", blank=True, null=True)
    category = models.ForeignKey(
        JobCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="jobs",
        verbose_name="Categoria"
    )
    price = models.DecimalField(
        "Preço estimado",
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    objects = JobManager()

    class Meta:
        verbose_name = "Serviço"
        verbose_name_plural = "Serviços"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
