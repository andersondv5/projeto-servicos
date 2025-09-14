from django.db import models

class ReviewQuerySet(models.QuerySet):
    def actives(self):
        return self.filter(is_deleted=False)
    
    def by_job(self, job_id):
        return self.actives().filter(job_id=job_id)
    
    def actives_by_client(self, client):
        return self.actives().filter(client=client)
    
    def by_client(self, client):
        return self.filter(client=client)


