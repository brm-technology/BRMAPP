from django.db import models

class Stdpipe(models.Model):
    Title = models.CharField(max_length=50)
    Description = models.CharField(max_length=200)
    Compon = models.CharField(max_length=200)
    Componlink = models.CharField(max_length=200)

    def __str__(self):
        return self.Title