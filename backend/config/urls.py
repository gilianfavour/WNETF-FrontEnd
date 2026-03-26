from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
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
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
