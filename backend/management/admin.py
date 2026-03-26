from django.contrib import admin
from .models import TeamMember, Partner

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'role', 'email', 'is_active', 'order')
    list_filter = ('is_active', 'role')
    search_fields = ('full_name', 'role', 'email')

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'partnership_type', 'is_active', 'website_url')
    list_filter = ('partnership_type', 'is_active')
    search_fields = ('name',)
