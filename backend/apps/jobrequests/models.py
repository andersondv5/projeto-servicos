from django.db import models
from django.conf import settings
from apps.jobs.models import Job
from apps.core.models import BaseModel
from apps.users.models import User
from .managers import JobRequestsManager

class JobRequest(BaseModel):
    class Status(models.TextChoices):
        PENDING = "pending", "Pendente"
        ACCEPTED = "accepted", "Aceito"
        REJECTED = "rejected", "Recusado"

    job = models.ForeignKey(
        Job,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="requests",
        verbose_name="Serviço"
    )
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="job_requests",
        limit_choices_to={"user_type": User.UserType.CLIENT},
        verbose_name="Cliente"
    )
    professional = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="job_requests_received",
        limit_choices_to={"user_type": User.UserType.PROFESSIONAL},
        verbose_name="Profissional" 
    )
    scheduled_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Data/Horário Agendado"
    )
    message = models.TextField(
        blank=True,
        null=True,
        verbose_name="Mensagem"
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        verbose_name="Status"
    )
    
    objects = JobRequestsManager()

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=['professional', 'status']),
            models.Index(fields=['scheduled_date']),
        ]

    def __str__(self):
        return f"{self.client} → {self.professional} ({self.status})"
