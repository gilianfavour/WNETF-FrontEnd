# WNETF Admin — Django 

# ============================================================
# AUTH
# Package: djangorestframework-simplejwt
# ============================================================

POST   /api/auth/login/          # { email, password } → { access, refresh }
POST   /api/auth/refresh/        # { refresh } → { access }
POST   /api/auth/logout/         # { refresh } → 200 OK
GET    /api/auth/me/             # → { id, email, name, role }

# ============================================================
# APPLICATIONS
# ============================================================

GET    /api/applications/               # list — ?status=pending&search=name
POST   /api/applications/               # create (public — from site form)
GET    /api/applications/:id/           # detail
PATCH  /api/applications/:id/           # update status, reviewed_by, etc.
DELETE /api/applications/:id/           # delete

# Response shape (list item):
# {
#   id, full_name, email, phone, district,
#   university_applied_to, course_applied_for,
#   statement_of_need, documents_url,
#   status,             # pending | reviewing | approved | rejected
#   submitted_at, reviewed_at, reviewed_by
# }

# ============================================================
# STUDENTS
# ============================================================

GET    /api/students/                   # list — ?status=active&search=name
POST   /api/students/                   # create
GET    /api/students/:id/               # detail
PUT    /api/students/:id/               # full update
PATCH  /api/students/:id/               # partial update
DELETE /api/students/:id/               # delete

# Response shape:
# {
#   id, full_name, photo_url, gender, date_of_birth,
#   district, phone, email,
#   university, course, year_of_study,
#   scholarship_type,    # full | partial | grant
#   scholarship_status,  # active | graduated | suspended
#   intake_year, expected_graduation_year, notes,
#   created_at
# }

# ============================================================
# DONATIONS
# ============================================================

GET    /api/donations/                  # list — ?verified=true&search=name
POST   /api/donations/                  # create (admin records it)
GET    /api/donations/:id/              # detail
PATCH  /api/donations/:id/             # update (e.g. mark verified)
DELETE /api/donations/:id/              # delete

# Response shape:
# {
#   id, donor_name, donor_email, phone,
#   amount, currency,         # UGX | USD | EUR
#   payment_method,           # MTN Mobile Money | Airtel | Bank Transfer | Card | Cash
#   transaction_reference,
#   purpose,                  # general | marathon | scholarship fund | specific student
#   is_anonymous,
#   donated_at, verified
# }

# ============================================================
# EVENTS
# ============================================================

GET    /api/events/                     # list — ?is_published=true
POST   /api/events/                     # create
GET    /api/events/:id/                 # detail
PUT    /api/events/:id/                 # update
DELETE /api/events/:id/                 # delete

# ============================================================
# EVENT REGISTRATIONS
# ============================================================

GET    /api/events/:id/registrations/   # list registrations for an event
POST   /api/events/:id/registrations/   # register (public)
PATCH  /api/registrations/:id/          # update payment status

# ============================================================
# BLOG POSTS
# ============================================================

GET    /api/blog/                       # list — ?is_published=true
POST   /api/blog/                       # create
GET    /api/blog/:id/                   # detail
PUT    /api/blog/:id/                   # update
DELETE /api/blog/:id/                   # delete

# ============================================================
# TEAM MEMBERS
# ============================================================

GET    /api/team/                       # list
POST   /api/team/                       # create
PATCH  /api/team/:id/                   # update
DELETE /api/team/:id/                   # delete

# ============================================================
# PARTNERS
# ============================================================

GET    /api/partners/                   # list
POST   /api/partners/                   # create
PATCH  /api/partners/:id/               # update
DELETE /api/partners/:id/               # delete

# ============================================================
# IMPACT STATS (the numbers on the homepage)
# ============================================================

GET    /api/stats/                      # list
POST   /api/stats/                      # create
PATCH  /api/stats/:id/                  # update
DELETE /api/stats/:id/                  # delete

# ============================================================
# TESTIMONIALS
# ============================================================

GET    /api/testimonials/               # list
POST   /api/testimonials/               # create
PATCH  /api/testimonials/:id/           # update
DELETE /api/testimonials/:id/           # delete

# ============================================================
# NEWSLETTER SUBSCRIBERS
# ============================================================

GET    /api/subscribers/                # list (admin only)
POST   /api/subscribers/                # subscribe (public)
DELETE /api/subscribers/:id/            # unsubscribe

# ============================================================
# DASHBOARD STATS (single endpoint for overview page)
# ============================================================

GET    /api/dashboard/stats/
# Response:
# {
#   total_applications: 42,
#   pending_applications: 10,
#   total_students: 27,
#   active_students: 20,
#   total_donations: 15,
#   total_donated_ugx: 5000000,
#   total_donated_usd: 1200,
#   upcoming_events: 2
# }

# ============================================================
# NOTES FOR BACKEND TEAM
# ============================================================
# 1. All endpoints except public ones require:
#    Header: Authorization: Bearer <access_token>
#
# 2. Public endpoints (no auth needed):
#    POST /api/applications/
#    POST /api/subscribers/
#    POST /api/events/:id/registrations/
#    GET  /api/events/         (published only)
#    GET  /api/blog/           (published only)
#    GET  /api/team/           (active only)
#    GET  /api/partners/       (active only)
#    GET  /api/stats/          (visible only)
#    GET  /api/testimonials/   (published only)
#
# 3. Pagination: use ?page=1&page_size=20 on all list endpoints
#
# 4. CORS: allow the Next.js frontend origin
#    (localhost:3000 in dev, wnetf.com in prod)
#
# 5. Install: pip install djangorestframework djangorestframework-simplejwt django-cors-headers