import os
import sys

# 1. Add application directory to sys.path
sys.path.insert(0, os.path.dirname(__file__))

# 2. Set Django settings module environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# 3. Import WSGI handler callable expected by Phusion Passenger
from config.wsgi import application
