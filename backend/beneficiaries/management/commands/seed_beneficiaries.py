from django.core.management.base import BaseCommand
from beneficiaries.models import Beneficiary

SEED_DATA = [
    dict(name='Amelia Anguyo', course='Bachelor of Medicine and Surgery', university='Makerere University', year='3rd Year', district='Arua', is_graduate=False),
    dict(name='David Olia', course='Bachelor of Engineering (Civil)', university='Kyambogo University', year='2nd Year', district='Nebbi', is_graduate=False),
    dict(name='Grace Draru', course='Bachelor of Pharmacy', university='Mbarara University', year='4th Year', district='Zombo', is_graduate=False),
    dict(name='Moses Andama', course='Bachelor of Nursing Science', university='Makerere University', year='Graduate', district='Moyo', is_graduate=True),
    dict(name='Patience Aciro', course='Bachelor of Medicine and Surgery', university='Gulu University', year='1st Year', district='Adjumani', is_graduate=False),
    dict(name='Samuel Iga', course='Bachelor of Engineering (Electrical)', university='Makerere University', year='Graduate', district='Maracha', is_graduate=True),
]

class Command(BaseCommand):
    help = 'Seed the database with initial beneficiaries'
    def handle(self, *args, **kwargs):
        created = 0
        for entry in SEED_DATA:
            _, was_created = Beneficiary.objects.get_or_create(name=entry['name'], defaults=entry)
            if was_created: created += 1
        self.stdout.write(self.style.SUCCESS(f'Seeded {created} beneficiaries.'))
