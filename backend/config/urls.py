from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "name": "WNETF API Server",
        "status": "online",
        "version": "1.0.0"
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),

    # Standard /api/ prefix routes
    path('api/beneficiaries/', include('beneficiaries.urls')),
    path('api/applications/', include('applications.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/donate/', include('donate.urls')),
    path('api/volunteer/', include('volunteer.urls')),
    path('api/subscribe/', include('subscribe.urls')),
    path('api/impact/', include('impact.urls')),
    path('api/events/', include('events.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/management/', include('management.urls')),

    # Fallback routes without /api/ prefix
    path('beneficiaries/', include('beneficiaries.urls')),
    path('applications/', include('applications.urls')),
    path('contact/', include('contact.urls')),
    path('donate/', include('donate.urls')),
    path('volunteer/', include('volunteer.urls')),
    path('subscribe/', include('subscribe.urls')),
    path('impact/', include('impact.urls')),
    path('events/', include('events.urls')),
    path('blog/', include('blog.urls')),
    path('management/', include('management.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
