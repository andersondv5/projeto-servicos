from django.db import models
from .querysets import JobQuerySet, JobCategoryQuerySet

class JobManager(models.Manager):
    def get_queryset(self):
        return JobQuerySet(self.model, using=self._db)
    
    def actives(self):
        return self.get_queryset().actives()
    

class JobCategoryManager(models.Manager):
    def get_queryset(self):
        return JobCategoryQuerySet(self.model, using=self._db)
    
    def actives(self):
        return self.get_queryset().actives()
    