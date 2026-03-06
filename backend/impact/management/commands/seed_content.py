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
            dict(stat_value='26+', stat_label='Students Sponsored', description='Bright students from West Nile supported through university education.', order=1),
            dict(stat_value='9', stat_label='Graduates', description='Students who have completed their professional degrees with WNETF support.', order=2),
            dict(stat_value='6', stat_label='Universities', description='Partner universities across Uganda hosting WNETF scholars.', order=3),
            dict(stat_value='9', stat_label='Districts Reached', description='Districts across the West Nile region represented in our scholarship programme.', order=4),
            dict(stat_value='UGX 180M+', stat_label='Invested in Education', description='Total tuition and living support disbursed to WNETF scholars since inception.', order=5),
            dict(stat_value='100%', stat_label='Graduate Employment', description='All WNETF graduates are currently employed or in post-graduate study.', order=6),
        ]
        for s in stats:
            obj, created = ImpactStat.objects.get_or_create(stat_label=s['stat_label'], defaults=s)
            if not created:
                for k, v in s.items():
                    setattr(obj, k, v)
                obj.save()

        # Impact Stories
        stories = [
            dict(
                title="From Arua to Makerere: Amelia's Journey",
                content="Amelia Anguyo grew up in a humble family in Arua City. Her father, a subsistence farmer, could not afford university tuition despite Amelia's outstanding O-Level and A-Level results. With WNETF support she enrolled in the Bachelor of Medicine and Surgery at Makerere University College of Health Sciences. Now in her 3rd year, Amelia volunteers at Mulago Hospital on weekends and dreams of returning to West Nile to establish a women's health clinic. 'WNETF did not just pay my fees — they believed in me when no one else could,' she says.",
                beneficiary_name='Amelia Anguyo',
                is_featured=True
            ),
            dict(
                title="Engineering the Future: Samuel's Story",
                content="Samuel Iga from Maracha District completed his Bachelor of Electrical Engineering at Makerere University with First Class Honours. He sat his final exams knowing that without WNETF, he would have had to defer his degree for the third consecutive year. Today Samuel works with a leading infrastructure consultancy firm in Kampala and actively mentors four younger WNETF scholars. 'I want to be the person I needed when I was struggling,' he says. Samuel is also pursuing a Masters degree part-time.",
                beneficiary_name='Samuel Iga',
                is_featured=True
            ),
            dict(
                title="Healing Communities: Grace in Nursing",
                content="Grace Adiru from Nebbi District dreamed of becoming a nurse since childhood, inspired by the nurses who cared for her mother during a prolonged illness. Financial constraints made university seem impossible until WNETF stepped in. Grace completed her Bachelor of Nursing Science at Clarke International University and is now a registered nurse at a government hospital in Nebbi. She runs a voluntary health education programme in her village every Saturday morning.",
                beneficiary_name='Grace Adiru',
                is_featured=False
            ),
            dict(
                title="Law and Justice: Patrick Speaks for West Nile",
                content="Patrick Drani from Zombo District is in his final year of the Bachelor of Laws at Uganda Christian University. He intends to practise human rights law and return to West Nile to provide affordable legal services to rural communities. WNETF covered four years of his tuition when his family could not. 'Access to justice should not be a privilege. I will dedicate my career to making sure it is not,' Patrick says.",
                beneficiary_name='Patrick Drani',
                is_featured=False
            ),
        ]
        for s in stories:
            ImpactStory.objects.get_or_create(title=s['title'], defaults=s)

        # Events
        now = timezone.now()
        events = [
            dict(
                title='West Nile Night — Monthly Fundraiser Dinner',
                description='Join us every last Friday of the month for the West Nile Night fundraising dinner. An evening of West Nile culture, music, food, and community generosity. All proceeds go directly to student scholarships. Tables available for groups and individuals.',
                date=now + datetime.timedelta(days=14),
                location='Nexus Lounge, Kampala',
                is_upcoming=True,
                registration_link='mailto:inquirieswnetf@gmail.com'
            ),
            dict(
                title='WNETF Annual Gala Dinner 2025',
                description='Our flagship annual fundraising gala brings together donors, scholars, graduates, board members and community leaders to celebrate impact and raise funds for the incoming cohort of scholars. Black-tie event with live entertainment, keynote speakers and a silent auction.',
                date=now + datetime.timedelta(days=90),
                location='Kampala Serena Hotel, Kampala',
                is_upcoming=True,
                registration_link='mailto:inquirieswnetf@gmail.com'
            ),
            dict(
                title='Scholar Meet & Greet — New Cohort 2025',
                description='Newly selected WNETF scholars for 2025 will meet their mentors, board representatives and fellow scholars for the first time. An orientation on academic expectations, code of conduct and support systems available through WNETF.',
                date=now + datetime.timedelta(days=35),
                location='Arua City, West Nile',
                is_upcoming=True,
                registration_link=''
            ),
            dict(
                title='WNETF Fun Run — Arua 2024',
                description='Our inaugural community fun run held in Arua City raised over UGX 12,000,000 for the scholarship fund. Hundreds of participants from the West Nile community, diaspora visitors, and scholars turned out to run, walk, and celebrate education.',
                date=now - datetime.timedelta(days=80),
                location='Arua City Stadium, West Nile',
                is_upcoming=False,
                registration_link=''
            ),
            dict(
                title='Scholar Orientation Day 2024',
                description='Annual orientation for newly admitted WNETF scholars. Scholars received their first stipend, met the WNETF board, and connected with graduating mentors who shared their university experiences and tips for success.',
                date=now - datetime.timedelta(days=180),
                location='Arua, West Nile',
                is_upcoming=False,
                registration_link=''
            ),
            dict(
                title='West Nile Night — Annual Fundraiser 2024',
                description='The 2024 edition of the West Nile Night raised UGX 8,000,000 in a single evening. Over 120 members of the West Nile diaspora and community attended the event at Nexus Lounge Kampala. Highlights included a cultural performance and a live testimonial from two WNETF graduates.',
                date=now - datetime.timedelta(days=45),
                location='Nexus Lounge, Kampala',
                is_upcoming=False,
                registration_link=''
            ),
        ]
        for e in events:
            Event.objects.get_or_create(title=e['title'], defaults=e)

        # Blog Posts
        posts = [
            dict(
                title='WNETF Awards 6 New Scholarships for 2025',
                slug='wnetf-scholarships-2025',
                excerpt='The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2025 academic year, representing five districts across the region.',
                content='The West Nile Education Trust Fund is proud to announce six new scholarship recipients for the 2025 academic year. These exceptional students from Arua, Nebbi, Moyo, Zombo, Adjumani and Maracha will pursue Medicine, Engineering, Nursing, Pharmacy, Law and Computer Science at accredited Ugandan universities.\n\nThe selection committee reviewed over 80 applications this year — the highest number since WNETF was founded. Selection criteria included academic merit (minimum 15 points at A-Level), demonstrated financial need, community involvement, and a written personal statement.\n\n"The standard of applicants this year was extraordinary," said the WNETF Chair. "Every single applicant deserves support. We are working hard to grow our donor base so we can reach more deserving students."\n\nWe thank all our donors whose generosity makes this possible. To sponsor a student, visit our Donate page.',
                author='WNETF Secretariat',
                category='News',
                is_published=True
            ),
            dict(
                title='West Nile Night Raises UGX 8 Million',
                slug='west-nile-night-fundraiser-results-2024',
                excerpt="Last month's West Nile Night fundraising dinner exceeded all expectations, raising UGX 8,000,000 towards student scholarships in a single evening.",
                content="Last month's West Nile Night fundraising dinner exceeded all expectations, raising UGX 8,000,000 towards student scholarships. Over 120 members of the West Nile diaspora and community attended the event held at Nexus Lounge in Kampala.\n\nHighlights of the evening included a cultural performance by West Nile artists, a heartfelt live testimonial from two WNETF graduates — Moses Andama (Nursing) and Samuel Iga (Electrical Engineering) — and a live auction that alone raised UGX 2,400,000.\n\nThe funds raised will directly contribute to tuition fees for current WNETF scholars in their upcoming semester. The committee thanks all attendees, performers, and sponsors who made the evening possible.\n\nThe next West Nile Night is scheduled for the last Friday of next month. All are welcome.",
                author='Events Team',
                category='Fundraising',
                is_published=True
            ),
            dict(
                title='Graduate Story: Moses Andama, Bachelor of Nursing Science',
                slug='graduate-story-moses-andama',
                excerpt='Moses Andama from Moyo District completed his Bachelor of Nursing Science and is now a registered nurse serving communities in Northern Uganda.',
                content='Moses Andama from Moyo District completed his Bachelor of Nursing Science at Makerere University with WNETF support. He is now a registered nurse serving at a government hospital in Northern Uganda, specialising in paediatric care.\n\n"I never imagined I would be where I am today without WNETF. Growing up in Moyo, university felt like a dream for other people — not for someone like me. WNETF changed that completely."\n\nMoses is currently enrolled in a part-time post-graduate diploma in Public Health and volunteers every Saturday at a rural health outpost near his home village. He is also an active WNETF mentor, meeting monthly with two current scholars who are pursuing nursing.\n\n"I am committed to giving back to my community and making sure the next generation does not face the same barriers I did."',
                author='WNETF Team',
                category='Stories',
                is_published=True
            ),
            dict(
                title='How to Apply for a WNETF Scholarship',
                slug='how-to-apply-wnetf-scholarship',
                excerpt='A step-by-step guide to applying for a WNETF scholarship, including eligibility criteria, required documents, and key deadlines.',
                content='Applications for WNETF scholarships open each year in January and close at the end of February. Here is what you need to know.\n\nEligibility:\n- Must be a student from the West Nile region of Uganda (Arua, Nebbi, Moyo, Zombo, Adjumani, Maracha, Madi-Okollo, Koboko, or Terego districts)\n- Must be currently enrolled (or admitted) to an accredited Ugandan university\n- Must demonstrate financial need\n- Must have achieved a minimum of 15 points at A-Level (or equivalent)\n\nRequired Documents:\n- National ID or Birth Certificate\n- A-Level and O-Level certificates\n- University admission letter or student ID\n- Bank statement or financial affidavit from parent/guardian\n- Two reference letters (one academic, one community)\n- A 250-word personal statement\n\nHow to Apply:\nVisit the Applications page on this website and complete the online form. Upload all required documents as a single PDF.\n\nDeadline: 28 February each year.\n\nSuccessful applicants are notified by 31 March and receive their first disbursement before the start of the academic year.',
                author='WNETF Secretariat',
                category='Scholarships',
                is_published=True
            ),
            dict(
                title='WNETF Partners with Local Schools for Mentorship Programme',
                slug='wnetf-school-mentorship-programme',
                excerpt='WNETF graduates are now visiting secondary schools in West Nile to mentor O-Level and A-Level students, inspiring the next generation of scholars.',
                content='WNETF has launched a new school mentorship programme in partnership with six secondary schools across Arua and Nebbi districts. Each month, WNETF graduates visit the schools to speak with S.4 and S.6 students about university pathways, scholarship opportunities, and career prospects.\n\n"Many students do not apply for WNETF scholarships simply because they do not know we exist," said the programme coordinator. "This mentorship programme puts our graduates directly in front of the students who need them most."\n\nThe programme is currently active at Mvara Secondary School, St. Joseph College Ombaci, Arua Progressive Secondary School, Sacred Heart Girls Arua, Ediofe Girls Secondary School, and St. Daniel Comboni College.\n\nIf your school would like to participate in the programme, please contact us via the Contact page.',
                author='Programmes Team',
                category='Programmes',
                is_published=True
            ),
        ]
        for p in posts:
            obj, created = BlogPost.objects.get_or_create(slug=p['slug'], defaults=p)
            if not created:
                for k, v in p.items():
                    setattr(obj, k, v)
                obj.save()

        self.stdout.write(self.style.SUCCESS('Seeded impact stats, stories, events, and blog posts.'))
