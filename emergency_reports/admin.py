from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import AccidentIncident, FireIncident

# Register your models here.
# admin.site.register(User)
admin.site.register(AccidentIncident)
admin.site.register(FireIncident)
# admin.site.register(AccidentMedia)
# admin.site.register(FireMedia)
# admin.site.register(AccidentLog)
# admin.site.register(FireLog)
# admin.site.register(Contact)