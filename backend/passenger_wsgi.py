import os
import sys

# 1. Add application directory to sys.path
BASE_DIR = os.path.dirname(__file__)
sys.path.insert(0, BASE_DIR)

# 2. Add cPanel virtualenv site-packages to sys.path
VENV_PATHS = [
    os.path.expanduser('~/virtualenv/WNETF-FrontEnd/backend/3.10/lib/python3.10/site-packages'),
    os.path.expanduser('~/virtualenv/backend/3.10/lib/python3.10/site-packages'),
]
for site_pkg in VENV_PATHS:
    if os.path.exists(site_pkg) and site_pkg not in sys.path:
        sys.path.insert(0, site_pkg)

# 3. Set Django settings module environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# 4. Import WSGI handler callable expected by Phusion Passenger
from config.wsgi import application
