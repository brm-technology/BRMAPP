from django.db import models

class Contact(models.Model):
    email = models.EmailField()
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True)
    text = models.TextField()

    def __str__(self):
        return f"{self.title} from {self.email} at {self.date}" 