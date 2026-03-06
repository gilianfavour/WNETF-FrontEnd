import os, textwrap
base = r'c:/Users/ALADINA/Desktop/WNETF/backend'

def w(rel, content):
    p = os.path.join(base, rel.replace('/', os.sep))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w') as f:
        f.write(textwrap.dedent(content).lstrip())
    print('wrote', rel)

# ── impact ────────────────────────────────────────────────────────────────────
w('impact/models.py', """
    from django.db import models
    class ImpactStat(models.Model):
        stat_value = models.CharField(max_length=50)   # e.g. '26', '9', '6'
        stat_label = models.CharField(max_length=200)  # e.g. 'Students Sponsored'
        description = models.TextField(blank=True)
        icon = models.CharField(max_length=100, blank=True)
        order = models.PositiveIntegerField(default=0)
        is_active = models.BooleanField(default=True)
        created_at = models.DateTimeField(auto_now_add=True)
        class Meta:
            ordering = ['order']
        def __str__(self):
            return f'{self.stat_value} {self.stat_label}'

    class ImpactStory(models.Model):
        title = models.CharField(max_length=300)
        content = models.TextField()
        image = models.ImageField(upload_to='impact/', blank=True, null=True)
        beneficiary_name = models.CharField(max_length=200, blank=True)
        is_featured = models.BooleanField(default=False)
        created_at = models.DateTimeField(auto_now_add=True)
        class Meta:
            ordering = ['-created_at']
        def __str__(self):
            return self.title
""")

w('impact/serializers.py', """
    from rest_framework import serializers
    from .models import ImpactStat, ImpactStory
    class ImpactStatSerializer(serializers.ModelSerializer):
        class Meta:
            model = ImpactStat
            fields = '__all__'
    class ImpactStorySerializer(serializers.ModelSerializer):
        class Meta:
            model = ImpactStory
            fields = '__all__'
""")

w('impact/views.py', """
    from rest_framework import generics
    from .models import ImpactStat, ImpactStory
    from .serializers import ImpactStatSerializer, ImpactStorySerializer

    class ImpactStatListView(generics.ListAPIView):
        queryset = ImpactStat.objects.filter(is_active=True)
        serializer_class = ImpactStatSerializer

    class ImpactStoryListView(generics.ListAPIView):
        queryset = ImpactStory.objects.all()
        serializer_class = ImpactStorySerializer

    class ImpactStoryDetailView(generics.RetrieveAPIView):
        queryset = ImpactStory.objects.all()
        serializer_class = ImpactStorySerializer
""")

w('impact/urls.py', """
    from django.urls import path
    from .views import ImpactStatListView, ImpactStoryListView, ImpactStoryDetailView
    urlpatterns = [
        path('stats/', ImpactStatListView.as_view(), name='impact-stats'),
        path('stories/', ImpactStoryListView.as_view(), name='impact-stories'),
        path('stories/<int:pk>/', ImpactStoryDetailView.as_view(), name='impact-story-detail'),
    ]
""")

# ── events ─────────────────────────────────────────────────────────────────────
w('events/models.py', """
    from django.db import models
    class Event(models.Model):
        title = models.CharField(max_length=300)
        description = models.TextField()
        date = models.DateTimeField()
        location = models.CharField(max_length=300)
        image = models.ImageField(upload_to='events/', blank=True, null=True)
        is_upcoming = models.BooleanField(default=True)
        registration_link = models.URLField(blank=True)
        created_at = models.DateTimeField(auto_now_add=True)
        class Meta:
            ordering = ['-date']
        def __str__(self):
            return self.title
""")

w('events/serializers.py', """
    from rest_framework import serializers
    from .models import Event
    class EventSerializer(serializers.ModelSerializer):
        class Meta:
            model = Event
            fields = '__all__'
""")

w('events/views.py', """
    from rest_framework import generics, filters
    from .models import Event
    from .serializers import EventSerializer

    class EventListView(generics.ListAPIView):
        serializer_class = EventSerializer
        filter_backends = [filters.SearchFilter, filters.OrderingFilter]
        search_fields = ['title', 'location']
        ordering_fields = ['date']
        def get_queryset(self):
            qs = Event.objects.all()
            upcoming = self.request.query_params.get('upcoming')
            if upcoming is not None:
                qs = qs.filter(is_upcoming=upcoming.lower()=='true')
            return qs

    class EventDetailView(generics.RetrieveAPIView):
        queryset = Event.objects.all()
        serializer_class = EventSerializer
""")

w('events/urls.py', """
    from django.urls import path
    from .views import EventListView, EventDetailView
    urlpatterns = [
        path('', EventListView.as_view(), name='event-list'),
        path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    ]
""")

# ── blog ───────────────────────────────────────────────────────────────────────
w('blog/models.py', """
    from django.db import models
    from django.utils.text import slugify

    class BlogPost(models.Model):
        title = models.CharField(max_length=300)
        slug = models.SlugField(unique=True, blank=True)
        excerpt = models.CharField(max_length=500)
        content = models.TextField()
        author = models.CharField(max_length=200, default='WNETF Team')
        image = models.ImageField(upload_to='blog/', blank=True, null=True)
        category = models.CharField(max_length=100, blank=True)
        is_published = models.BooleanField(default=True)
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
        class Meta:
            ordering = ['-created_at']
        def __str__(self):
            return self.title
        def save(self, *args, **kwargs):
            if not self.slug:
                self.slug = slugify(self.title)
            super().save(*args, **kwargs)
""")

w('blog/serializers.py', """
    from rest_framework import serializers
    from .models import BlogPost
    class BlogPostSerializer(serializers.ModelSerializer):
        class Meta:
            model = BlogPost
            fields = '__all__'
""")

w('blog/views.py', """
    from rest_framework import generics, filters
    from .models import BlogPost
    from .serializers import BlogPostSerializer

    class BlogListView(generics.ListAPIView):
        serializer_class = BlogPostSerializer
        filter_backends = [filters.SearchFilter, filters.OrderingFilter]
        search_fields = ['title', 'excerpt', 'author', 'category']
        ordering_fields = ['created_at']
        def get_queryset(self):
            qs = BlogPost.objects.filter(is_published=True)
            category = self.request.query_params.get('category')
            if category: qs = qs.filter(category__icontains=category)
            return qs

    class BlogDetailView(generics.RetrieveAPIView):
        queryset = BlogPost.objects.filter(is_published=True)
        serializer_class = BlogPostSerializer
        lookup_field = 'slug'
""")

w('blog/urls.py', """
    from django.urls import path
    from .views import BlogListView, BlogDetailView
    urlpatterns = [
        path('', BlogListView.as_view(), name='blog-list'),
        path('<slug:slug>/', BlogDetailView.as_view(), name='blog-detail'),
    ]
""")

# ── seed command ───────────────────────────────────────────────────────────────
os.makedirs(os.path.join(base, 'impact/management/commands'), exist_ok=True)
open(os.path.join(base, 'impact/management/__init__.py'), 'w').close()
open(os.path.join(base, 'impact/management/commands/__init__.py'), 'w').close()

w('impact/management/commands/seed_content.py', """
    from django.core.management.base import BaseCommand
    from impact.models import ImpactStat, ImpactStory
    from events.models import Event
    from blog.models import BlogPost
    from django.utils import timezone
    import datetime

    class Command(BaseCommand):
        help = 'Seed impact, events, and blog data'

        def handle(self, *args, **kwargs):
            # Impact Stats
            stats = [
                dict(stat_value='26', stat_label='Students Sponsored', description='Bright students from West Nile supported through university education.', order=1),
                dict(stat_value='9', stat_label='Graduates', description='Students who have completed their professional degrees with WNETF support.', order=2),
                dict(stat_value='6', stat_label='Universities', description='Partner universities across Uganda hosting WNETF scholars.', order=3),
                dict(stat_value='9', stat_label='Districts Reached', description='Districts across the West Nile region represented in our scholarship programme.', order=4),
            ]
            for s in stats:
                ImpactStat.objects.get_or_create(stat_label=s['stat_label'], defaults=s)

            # Impact Stories
            stories = [
                dict(title='From Arua to Makerere: Amelia\'s Journey', content='Amelia Anguyo grew up in a humble family in Arua. With WNETF support she is now in her 3rd year of Medicine at Makerere University, determined to return and serve her community.', beneficiary_name='Amelia Anguyo', is_featured=True),
                dict(title='Engineering the Future: Samuel\'s Story', content='Samuel Iga from Maracha completed his Bachelor of Electrical Engineering at Makerere University. He now works with a leading infrastructure firm and mentors younger WNETF scholars.', beneficiary_name='Samuel Iga', is_featured=True),
            ]
            for s in stories:
                ImpactStory.objects.get_or_create(title=s['title'], defaults=s)

            # Events
            events = [
                dict(title='West Nile Night — Monthly Fundraiser', description='Join us every last Friday of the month for the West Nile Night fundraising dinner. An evening of community, culture, and giving.', date=timezone.now() + datetime.timedelta(days=14), location='Kampala, Uganda', is_upcoming=True),
                dict(title='WNETF Annual Dinner 2024', description='Our flagship annual fundraising dinner bringing together donors, scholars, graduates and community leaders to celebrate impact and raise funds for the next cohort.', date=timezone.now() + datetime.timedelta(days=90), location='Kampala Serena Hotel', is_upcoming=True),
                dict(title='Scholar Orientation Day 2024', description='Annual orientation for newly admitted WNETF scholars. Meet your mentors, fellow scholars, and the WNETF board.', date=timezone.now() - datetime.timedelta(days=30), location='Arua, West Nile', is_upcoming=False),
            ]
            for e in events:
                Event.objects.get_or_create(title=e['title'], defaults=e)

            # Blog Posts
            posts = [
                dict(title='WNETF Awards 6 New Scholarships for 2024', slug='wnetf-scholarships-2024', excerpt='The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2024 academic year.', content='The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2024 academic year. These exceptional students from Arua, Nebbi, Moyo, Zombo, Adjumani and Maracha will pursue Medicine, Engineering, Nursing and Pharmacy at accredited Ugandan universities.\\n\\nThe selection was based on academic merit, financial need, and community service. We thank all our donors whose generosity makes this possible.', author='WNETF Secretariat', category='News'),
                dict(title='West Nile Night Raises 8 Million Shillings', slug='west-nile-night-fundraiser-results', excerpt='Last month\'s West Nile Night fundraising dinner exceeded expectations, raising UGX 8,000,000 towards student scholarships.', content='Last month\'s West Nile Night fundraising dinner exceeded expectations, raising UGX 8,000,000 towards student scholarships. Over 120 members of the West Nile diaspora and community attended the event held in Kampala.\\n\\nThe funds raised will directly contribute to tuition fees for current WNETF scholars in their upcoming semester.', author='Events Team', category='Fundraising'),
                dict(title='Meet Our Graduate: Moses Andama, Nursing', slug='graduate-story-moses-andama', excerpt='Moses Andama from Moyo District completed his Bachelor of Nursing Science and is now a registered nurse serving in Northern Uganda.', content='Moses Andama from Moyo District completed his Bachelor of Nursing Science at Makerere University with WNETF support. He is now a registered nurse serving at a government hospital in Northern Uganda.\\n\\n"I never imagined I would be where I am today without WNETF. I am committed to giving back to my community and mentoring the next generation of scholars," Moses says.', author='WNETF Team', category='Stories'),
            ]
            for p in posts:
                BlogPost.objects.get_or_create(slug=p['slug'], defaults=p)

            self.stdout.write(self.style.SUCCESS('Seeded impact stats, stories, events, and blog posts.'))
""")

print('All files written.')
