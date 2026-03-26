<<<<<<< HEAD
# WNETF Project

![MySQL](https://img.shields.io/badge/MySQL-8.0-blue) ![Python](https://img.shields.io/badge/Python-3.9-green) ![Django](https://img.shields.io/badge/Django-4.x-blueviolet)

This repository contains the **WNETF** project, structured with a **frontend** and **backend**, along with a ready-to-use MySQL database.

---

## Project Structure

```
wnetf/
│
├─ backend/          # Django backend (API, models, database connection)
│
└─ frontend/         # Frontend application (HTML/CSS/JS or React/Next.js)
```

---

## Prerequisites

* Python 3.9+
* Django 4.x (any version <5)
* MySQL 8.0+
* Node.js (if using a JS frontend like React/Next.js)

---

## Database Setup

**Database Name:** `wnetf_db`

1. **Create the database**

```sql
CREATE DATABASE wnetf_db;
```

2. **Import the SQL file**

```bash
mysql -u your_username -p wnetf_db < wnetf_db.sql
```

3. **Verify the import**

```sql
USE wnetf_db;
SHOW TABLES;
```

> The SQL file contains sample data for immediate use.

---

## Backend Setup (Django)

1. **Create a virtual environment**

```bash
python3 -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows
```

2. **Install dependencies**

```bash
pip install -r backend/requirements.txt
```

> This will install all required Python packages listed in `requirements.txt`.

3. **Configure environment**

* Update `backend/.env` or `backend/settings.py` with:

  * Database name: `wnetf_db`
  * User, password, host

4. **Apply migrations**

```bash
cd backend
python manage.py migrate
```

5. **Run the development server**

```bash
python manage.py runserver
```

---
=======
<!-- Admin Dashbaord Follow ups -->

Here's what's been built — 9 files for your admin dashboard:
Start here → SETUP.md — follow the 6 steps to wire everything up.
Here's a summary of what each file does:

schema.sql — run this in Supabase SQL Editor to create all your tables with proper RLS security policies
lib/supabase.ts — Supabase client (drop into src/lib/)
admin/login/page.tsx — clean login screen at /admin/login
admin/(dashboard)/layout.tsx — the sidebar with nav + auth guard (redirects to login if not signed in)
admin/(dashboard)/page.tsx — overview with live stats cards + recent applications
applications/page.tsx — full table with search, filter by status, inline status updates
students/page.tsx — student list + add new student form
donations/page.tsx — donation list + record new donation + verify/unverify toggle


<!-- Django Team -->
Recommended to use:
JWT tokens with djangorestframework-simplejwt — it's the standard, works great with Next.js, and is straightforward for the Django team to set up.
>>>>>>> 8b346dc2933e504954c315eac93ee23562bd24d9
