from django.db import models

class UserQuerySet(models.QuerySet):
    def actives(self):
        return self.filter(is_deleted=False)
