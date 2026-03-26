// src/lib/staticData.ts
// All static dummy data for the admin dashboard
// Replace with real API calls later

export const CURRENT_USER = {
  name: 'Charles Draecabo',
  initials: 'CD',
  email: 'charles@wnetf.com',
  role: 'Super Admin',
}

export const OVERVIEW_STATS = [
  { label: 'Active Students',  value: '27',      sub: '↑ 4 this intake',   color: 'green'  },
  { label: 'Applications',     value: '42',      sub: '8 pending review',  color: 'blue'   },
  { label: 'Total Raised',     value: 'UGX 18.4M', sub: 'This year',       color: 'amber'  },
  { label: 'Universities',     value: '7',       sub: 'Makerere, Muni…',   color: 'purple' },
]

export const RECENT_APPLICATIONS = [
  { id: '1', full_name: 'Akello Grace',   email: 'akello.grace@gmail.com',   university: 'Makerere University', course: 'BSc Computer Science', status: 'pending',   submitted_at: 'Mar 3, 2025'  },
  { id: '2', full_name: 'Oryem David',    email: 'david.oryem@gmail.com',    university: 'Muni University',     course: 'BEd Science',          status: 'reviewing', submitted_at: 'Mar 1, 2025'  },
  { id: '3', full_name: 'Adraa Stella',   email: 'stella.adraa@gmail.com',   university: 'MUST',                course: 'MBBS Medicine',         status: 'approved',  submitted_at: 'Feb 26, 2025' },
  { id: '4', full_name: 'Obitre Moses',   email: 'moses.obitre@gmail.com',   university: 'Gulu University',     course: 'BSc Agriculture',       status: 'pending',   submitted_at: 'Feb 24, 2025' },
  { id: '5', full_name: 'Amule Irene',    email: 'irene.amule@gmail.com',   university: 'Busitema University', course: 'BEng Civil Engineering',status: 'reviewing', submitted_at: 'Feb 20, 2025' },
]

export const APPLICATIONS = [
  { id: '1', full_name: 'Akello Grace',   email: 'akello.grace@gmail.com',  phone: '+256 701 234 567', university: 'Makerere',   course: 'BSc Computer Science',    district: 'Arua',    status: 'pending',   submitted_at: 'Mar 3, 2025'  },
  { id: '2', full_name: 'Oryem David',    email: 'david.oryem@gmail.com',   phone: '+256 702 345 678', university: 'Muni',       course: 'BEd Science',             district: 'Nebbi',   status: 'reviewing', submitted_at: 'Mar 1, 2025'  },
  { id: '3', full_name: 'Adraa Stella',   email: 'stella.adraa@gmail.com',  phone: '+256 703 456 789', university: 'MUST',       course: 'MBBS Medicine',           district: 'Zombo',   status: 'approved',  submitted_at: 'Feb 26, 2025' },
  { id: '4', full_name: 'Obitre Moses',   email: 'moses.obitre@gmail.com',  phone: '+256 704 567 890', university: 'Gulu',       course: 'BSc Agriculture',         district: 'Arua',    status: 'pending',   submitted_at: 'Feb 24, 2025' },
  { id: '5', full_name: 'Amule Irene',    email: 'irene.amule@gmail.com',   phone: '+256 705 678 901', university: 'Busitema',   course: 'BEng Civil Engineering',  district: 'Koboko',  status: 'reviewing', submitted_at: 'Feb 20, 2025' },
  { id: '6', full_name: 'Draru James',    email: 'james.draru@gmail.com',   phone: '+256 706 789 012', university: 'KYU',        course: 'BCom Accounting',         district: 'Maracha', status: 'approved',  submitted_at: 'Feb 18, 2025' },
  { id: '7', full_name: 'Andama Peace',   email: 'peace.andama@gmail.com',  phone: '+256 707 890 123', university: 'Kabale',     course: 'BSc Nursing',             district: 'Arua',    status: 'rejected',  submitted_at: 'Feb 15, 2025' },
  { id: '8', full_name: 'Ayikoru Salama', email: 'salama.ayikoru@gmail.com',phone: '+256 708 901 234', university: 'Makerere',   course: 'BA Social Work',          district: 'Nebbi',   status: 'approved',  submitted_at: 'Feb 10, 2025' },
]

export const STUDENTS = [
  { id: '1', full_name: 'Ayikoru Salama', email: 'salama@gmail.com',      district: 'Arua',    university: 'Makerere',   course: 'BA Social Work',          year_of_study: 'Year 3', scholarship_type: 'full',    scholarship_status: 'active'    },
  { id: '2', full_name: 'Feni Nobert',    email: 'nobert.feni@gmail.com', district: 'Nebbi',   university: 'Muni',       course: 'BEd Education',           year_of_study: 'Year 2', scholarship_type: 'partial', scholarship_status: 'active'    },
  { id: '3', full_name: 'Adraa Stella',   email: 'stella.adraa@gmail.com',district: 'Zombo',   university: 'MUST',       course: 'MBBS Medicine',           year_of_study: 'Year 4', scholarship_type: 'full',    scholarship_status: 'active'    },
  { id: '4', full_name: 'Draru James',    email: 'james.draru@gmail.com', district: 'Maracha', university: 'KYU',        course: 'BCom Accounting',         year_of_study: 'Year 1', scholarship_type: 'partial', scholarship_status: 'active'    },
  { id: '5', full_name: 'Andru Sarah',    email: 'sarah.andru@gmail.com', district: 'Arua',    university: 'Busitema',   course: 'BEng Electrical',         year_of_study: 'Year 3', scholarship_type: 'full',    scholarship_status: 'active'    },
  { id: '6', full_name: 'Acio Catherine', email: 'cathy.acio@gmail.com',  district: 'Koboko',  university: 'Gulu',       course: 'BSc Public Health',       year_of_study: 'Graduated', scholarship_type: 'partial', scholarship_status: 'graduated' },
]

export const DONATIONS = [
  { id: '1', donor_name: 'John Okullo',    donor_email: 'john.okullo@gmail.com', amount: 2000000,  currency: 'UGX', payment_method: 'MTN Mobile Money', purpose: 'Scholarship Fund', donated_at: 'Mar 4, 2025',  verified: true  },
  { id: '2', donor_name: 'Anonymous',      donor_email: '—',                     amount: 500,      currency: 'USD', payment_method: 'Bank Transfer',     purpose: 'General',          donated_at: 'Mar 2, 2025',  verified: true  },
  { id: '3', donor_name: 'Toby Foster',    donor_email: 'toby@foster.org',       amount: 1000,     currency: 'USD', payment_method: 'Card',              purpose: 'Marathon',         donated_at: 'Feb 27, 2025', verified: true  },
  { id: '4', donor_name: 'Candia Traders', donor_email: 'info@candia.co.ug',     amount: 5000000,  currency: 'UGX', payment_method: 'Bank Transfer',     purpose: 'Scholarship Fund', donated_at: 'Feb 20, 2025', verified: true  },
  { id: '5', donor_name: 'Amina Rashid',   donor_email: 'amina.r@gmail.com',     amount: 500000,   currency: 'UGX', payment_method: 'Airtel Money',      purpose: 'General',          donated_at: 'Feb 15, 2025', verified: false },
]

export const EVENTS = [
  { id: '1', title: 'Arua Marathon 2025',    event_type: 'Marathon',    event_date: 'Dec 27, 2025', location: 'Arua Hill Open Ground', registrations: 143, is_published: true,  kit_available: true  },
  { id: '2', title: 'WNETF Annual Dinner',   event_type: 'Dinner',      event_date: 'Nov 15, 2025', location: 'Arua City Hotel',       registrations: 62,  is_published: true,  kit_available: false },
  { id: '3', title: 'WestNile Night 2025',   event_type: 'Night Event', event_date: 'Oct 3, 2025',  location: 'Kampala',               registrations: 0,   is_published: false, kit_available: false },
]

export const BLOG_POSTS = [
  { id: '1', title: 'WNETF Supports 27 Students in 2024', author: 'Charles Draecabo', tags: ['Impact', 'Scholarships'], published_at: 'Jan 10, 2025', is_published: true  },
  { id: '2', title: 'Marathon 2024 — A Success Story',    author: 'Toby Foster',      tags: ['Events', 'Marathon'],     published_at: 'Dec 30, 2024', is_published: true  },
  { id: '3', title: 'New Partnerships for 2025',          author: 'Charles Draecabo', tags: ['Partnerships'],           published_at: '—',            is_published: false },
]

export const TEAM_MEMBERS = [
  { id: '1', full_name: 'Charles Draecabo', role: 'Project Manager',      email: 'charles@wnetf.com', is_active: true  },
  { id: '2', full_name: 'Toby Foster',      role: 'Program Coordinator',  email: 'toby@wnetf.com',    is_active: true  },
]

export const PARTNERS = [
  { id: '1', name: 'WestNile Foundation', partnership_type: 'Collaborator', website_url: 'wnf.org',              is_active: true },
  { id: '2', name: 'RDM Uganda',          partnership_type: 'Sponsor',      website_url: 'rdmuganda.org',        is_active: true },
  { id: '3', name: 'Candia Traders',      partnership_type: 'Donor',        website_url: 'candiatraders.co.ug',  is_active: true },
]
