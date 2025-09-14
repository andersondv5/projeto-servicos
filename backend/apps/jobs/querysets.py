from django.db import models

class JobQuerySet(models.QuerySet):
    def actives(self):
        return self.filter(is_deleted=False)
    
    def by_category(self, category_id):
        return self.filter(category_id=category_id)
    
class JobCategoryQuerySet(models.QuerySet):
    def actives(self):
        return self.filter(is_deleted=False)


