from django.db import models

class FlangeB165(models.Model):
    Type = models.CharField(max_length=30)
    PCL = models.CharField(max_length=10)
    NPS = models.CharField(max_length=10)
    P = models.CharField(max_length=10)
    E = models.CharField(max_length=10)
    F = models.CharField(max_length=10)
    Rr = models.CharField(max_length=10)
    K = models.CharField(max_length=10)
    dD = models.CharField(max_length=10)
    Faceod = models.CharField(max_length=10)
    OD = models.CharField(max_length=10)
    BCD = models.CharField(max_length=10)
    BHD = models.CharField(max_length=10)
    Bno = models.CharField(max_length=10)
    Bsize = models.CharField(max_length=10)
    L1 = models.CharField(max_length=10)
    L2 = models.CharField(max_length=10)
    L3 = models.CharField(max_length=10)
    Thk = models.CharField(max_length=10)
    X = models.CharField(max_length=10)
    Y = models.CharField(max_length=10)
    B = models.CharField(max_length=10)
    B1 = models.CharField(max_length=10)
    D = models.CharField(max_length=10)
    r = models.CharField(max_length=10)
    T = models.CharField(max_length=10)
    Q = models.CharField(max_length=10)
    Ah = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.Type}-{self.NPS}in-{self.PCL}#"
    
