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
