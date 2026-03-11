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