from django.db import models
from django.db.models import Q

class JobRequestsQuerySet(models.QuerySet):
    def actives(self):
        return self.filter(is_deleted=False)  
    
    def for_user(self, user):
        """Retorna todas as solicitações relacionadas ao usuário"""
        return self.actives().filter(Q(client=user) | Q(professional=user))
    




