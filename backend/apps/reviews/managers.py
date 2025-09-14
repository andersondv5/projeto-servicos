from django.db import models
from .querysets import ReviewQuerySet

class ReviewManager(models.Manager):
    def get_queryset(self):
        return ReviewQuerySet(self.model, using=self._db)
    
    def actives(self):
        return self.get_queryset().actives()
    
    def by_job(self, job_id):
        return self.get_queryset().by_job(job_id)
    
    def by_client(self, client):
        return self.get_queryset().by_client(client)
    

    