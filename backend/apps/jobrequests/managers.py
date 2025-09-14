from django.db import models
from .querysets import JobRequestsQuerySet

class JobRequestsManager(models.Manager):
    def get_queryset(self):
        return JobRequestsQuerySet(self.model, using=self._db)
    
    def actives(self):
        return self.get_queryset().actives()
    
    def for_user(self, user):
        return self.get_queryset().for_user(user)
    

    