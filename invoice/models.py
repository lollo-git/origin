from django.db import models

from django.contrib.auth.models import User



class Client(models.Model):
    """"
    Name: client model definition
    """
    SEX_TYPES = (
        ('M', 'Masculin'),
        ('F', 'Feminin')
    )

    name = models.CharField(max_length=132)

    email =models.EmailField()

    phone = models.CharField(max_length=132)

    address = models.CharField(max_length=64)

    sex = models.CharField(max_length=1, choices=SEX_TYPES)

    save_by = models.ForeignKey(User, on_delete=models.PROTECT)

    ent_name = models.CharField(max_length = 85)

    class Meta:
        verbose_name = "client"
        verbose_name_plural = "clients"

    def _str_(self):
        return self.name



class Invoice(models.Model):
    """"
    Name: Invoice model definition
    Description: Facture de l'application
    Author: Lollo Ebengue Martinre Cherele
    """

    INVOICE_TYPE = (
        ('R', 'RECU'),
        ('P', 'PROFORMA'),
        ('F', 'FACTURE')
    )
    client = models.ForeignKey(Client, on_delete=models.PROTECT)

    save_by = models.ForeignKey(User, on_delete=models.PROTECT)

    invoice_date_time = models.DateTimeField(auto_now_add=True)

    total = models.DecimalField(max_digits=100000, decimal_places=2)

    last_updated_date = models.DateTimeField(null=True, blank=True)

    paid = models.BooleanField(default=False)

    invoice_type = models.CharField(max_length=1, choices=INVOICE_TYPE)

    socity = models.CharField(max_length=25)


    class Meta:
        verbose_name = "Invoice"
        verbose_name_plural = "Invoices"

    def _str_(self):
        return f"{self.client.name}_{self.invoice_date_time}"

    @property
    def get_total(self):
        articles = self.article_set.all()
        total = sum(article.get_total for article in articles)

class Article(models.Model):
     """"
    Name: Article model definition
    Description: Facture de l'application
    Author: Lollo Ebengue Martinre Cherele
    """
     
     invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
     
     name = models.CharField(max_length=32)
     
     quantity = models.IntegerField()
     
     unit_price = models.DecimalField(max_digits=100000, decimal_places=2)
     
     total = models.DecimalField(max_digits=100000, decimal_places=2)
     
     class Meta:
        verbose_name = "Article"
        verbose_name_plural ="Articles"

     
     @property
     def get_total(self):
         total = self.quantity * self.unit_price

    

