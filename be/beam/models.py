from django.db import models

class BeamEN100561(models.Model):
    Size = models.CharField(max_length=20)
    Secarea = models.CharField(max_length=10)
    a = models.CharField(max_length=10)
    b = models.CharField(max_length=10)
    t = models.CharField(max_length=10)
    r = models.CharField(max_length=10)

    def __str__(self):
        return f"L {self.Size}"
    
class BeamEN10365(models.Model):
    Proftype = models.CharField(max_length=10)
    Size = models.CharField(max_length=20)
    h = models.CharField(max_length=10)
    b = models.CharField(max_length=10)
    s = models.CharField(max_length=10)
    t = models.CharField(max_length=10)
    Secarea = models.CharField(max_length=10)


    def __str__(self):
        return f"{self.Proftype} {self.Size}"
    