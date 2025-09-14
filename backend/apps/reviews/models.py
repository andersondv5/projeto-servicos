from django.db import models
from apps.core.models import BaseModel
from apps.jobs.models import Job
from apps.users.models import User
from .managers import ReviewManager


class Review(BaseModel):
    class Rating(models.IntegerChoices):
        ONE = 1, "(1)"
        TWO = 2, "(2)"
        THREE = 3, "(3)"
        FOUR = 4, "(4)"
        FIVE = 5, "(5)"

    job = models.ForeignKey(
        Job,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviews",
        verbose_name="Serviço"
    )
    professional = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews_received",
        limit_choices_to={"user_type": User.UserType.PROFESSIONAL},
        verbose_name="Profissional"
    )
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews_made",
        limit_choices_to={"user_type": User.UserType.CLIENT},
        verbose_name="Cliente"
    )
    rating = models.PositiveSmallIntegerField(
        "Nota",
        choices=Rating.choices
    )
    comment = models.TextField("Comentário", blank=True, null=True)
    
    objects = ReviewManager()
    
    class Meta:
        verbose_name = "Avaliação"
        verbose_name_plural = "Avaliações"
        ordering = ["-created_at"]
        unique_together = ("job", "client")  # Evita que o mesmo cliente avalie o mesmo serviço mais de uma vez

    def __str__(self):
        return f"Avaliação {self.rating}★ de {self.client.full_name} para {self.professional.full_name}"
