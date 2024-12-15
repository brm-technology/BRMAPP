from django.db import models

class Calcpipe(models.Model):
    Titlec = models.CharField(max_length=50)
    Descriptionc = models.CharField(max_length=200)
    Componc = models.CharField(max_length=200)
    Componlinkc = models.CharField(max_length=200)


    def __str__(self):
        return self.Titlec