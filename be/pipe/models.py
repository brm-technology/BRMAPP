from django.db import models

class Asmeb3610(models.Model):
    NPS = models.CharField(max_length=10)
    DN = models.CharField(max_length=10)
    Sch = models.CharField(max_length=10)
    OD = models.CharField(max_length=10)
    Thk = models.CharField(max_length=10)
    Weight = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.NPS}in (DN{self.DN})- Sch {self.Sch}"
    
class Asmeb3619(models.Model):
    NPS = models.CharField(max_length=10)
    DN = models.CharField(max_length=10)
    Sch = models.CharField(max_length=10)
    OD = models.CharField(max_length=10)
    Thk = models.CharField(max_length=10)
    Weight = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.NPS}in (DN{self.DN})- Sch {self.Sch}"
    