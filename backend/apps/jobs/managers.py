from django.db import models
from .querysets import JobQuerySet, JobCategoryQuerySet

class JobManager(models.Manager):
    def get_queryset(self):
        return JobQuerySet(self.model, using=self._db)
    
    def actives(self):
        return self.get_queryset().actives()
    
    def by_category(self, category_id):
        return self.get_queryset().by_category(category_id)
    

class JobCategoryManager(models.Manager):
    def get_queryset(self):
        return JobCategoryQuerySet(self.model, using=self._db)
    
    def actives(self):
        return self.get_queryset().actives()
    