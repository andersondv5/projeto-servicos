from django.db import models

class JobQuerySet(models.QuerySet):
    def actives(self):
        return self.filter(is_deleted=False)
    
class JobCategoryQuerySet(models.QuerySet):
    def actives(self):
        return self.filter(is_deleted=False)


