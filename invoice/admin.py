from django.contrib import admin
from .models import *

# Register your models here.

class AdminClient(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'address', 'sex', 'ent_name')

class AdminInvoice(admin.ModelAdmin):
    list_display = ('client', 'save_by', 'invoice_date_time', 'total', 'last_updated_date', 'paid', 'invoice_type', 'socity')

admin.site.register(Client, AdminClient)
admin.site.register(Invoice, AdminInvoice)
admin.site.register(Article)