'use client';

import React from 'react';
import Image from 'next/image';
import { IconCalendar, IconMapPin, IconUsersGroup, IconClock, IconArrowRight } from '@tabler/icons-react';
import heroSocial from '~/assets/images/night-socials.jpg';
import runners2024 from '~/assets/images/runners2024.jpg';
import CountdownTimer from '~/components/widgets/countdowntimer';
import MarathonPopup from '~/components/widgets/marathonpopup';
import { marathonCTA } from '~/shared/data/pages/home.data';

const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';
const ACCENT_Gold = '#FFD744';

const MARATHON_DATE = '2025-12-27T06:00:00'; // Marathon start time

const marathonDetails = {
  title: 'WNETF 2025 Arua Marathon',
  date: 'Saturday, December 27, 2025',
  time: 'Starts at 6:00 AM',
  location: 'Open ground opposite Total Arua Hill, next to Red Cross',
  cause: 'Raising UGX 50M to sponsor bright but needy students from West Nile.',
  categories: '2km • 5km • 10km • 21km (Half Marathon)',
};

export default function WNETFMarathonPage() {
  return (
    <div className="bg-white">
      {/* Pop up */}
      <MarathonPopup />
      {/* HERO */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={runners2024}
          alt="WNETF 2025 Arua Marathon"
          fill
          priority
          className="object-cover brightness-[0.55]"
        />

        <div
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white z-10"
          style={{ backgroundColor: 'rgba(3, 43, 83, 0.45)' }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">{marathonDetails.title}</h1>

          <p className="text-xl md:text-2xl font-semibold max-w-3xl mb-6">{marathonDetails.cause}</p>

          <a
            href="#details"
            className="px-8 py-3 text-lg font-bold rounded-full transition duration-300 shadow-xl hover:opacity-95"
            style={{ backgroundColor: ACCENT_Gold, color: PRIMARY_BLUE }}
          >
            View Marathon Details
          </a>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section id="details" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
          Marathon Information
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg shadow-lg border-t-4" style={{ borderColor: PRIMARY_BLUE }}>
            <IconCalendar size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
            <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>
              Date
            </h3>
            <p className="text-lg text-gray-700 font-bold">{marathonDetails.date}</p>
          </div>

          <div className="p-6 rounded-lg shadow-lg border-t-4" style={{ borderColor: PRIMARY_BLUE }}>
            <IconClock size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
            <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>
              Time
            </h3>
            <p className="text-lg text-gray-700 font-bold">{marathonDetails.time}</p>
          </div>

          <div className="p-6 rounded-lg shadow-lg border-t-4" style={{ borderColor: PRIMARY_BLUE }}>
            <IconMapPin size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
            <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>
              Location
            </h3>
            <p className="text-lg text-gray-700 font-bold">{marathonDetails.location}</p>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <CountdownTimer targetDate={MARATHON_DATE} />

      {/* RACE CATEGORIES */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>
          Race Categories
        </h2>
        <p className="text-xl text-gray-700 font-semibold">{marathonDetails.categories}</p>
      </section>

      {/* KIT POINTS */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: PRIMARY_BLUE }}>
          Running Kits Available
        </h2>
        <p className="text-lg text-center mb-6">
          Each kit costs <strong>UGX 35,000</strong>.
        </p>

        <ul className="grid md:grid-cols-2 gap-4 text-lg bg-gray-50 p-8 rounded-2xl shadow">
          <li>Total Energies Arua Hill</li>
          <li>Capital One Lounge</li>
          <li>WENRECo Offices</li>
          <li>NWSC Office</li>
          <li>Oak Diagnostic Centre</li>
          <li>Muni University</li>
          <li>Centenary Bank</li>
          <li>Orasea Supermarket</li>
          <li>Maradadi Stores – Ewuata</li>
          <li>West Nile Golf Club</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#E1F5FE] to-white text-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          {/* Left: Image */}
          <div className="md:w-1/2">
            <Image src={marathonCTA.image} alt="Marathon Banner" className="rounded-lg shadow-lg" priority/>
          </div>

          {/* Right: Text & Buttons */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: PRIMARY_BLUE }}>
              {marathonCTA.title}
            </h2>
            <p className="text-lg md:text-xl mb-4 text-gray-700">{marathonCTA.subtitle}</p>
            <p className="text-lg text-gray-700 mb-6">{marathonCTA.kitInfo}</p>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <a
                href={marathonCTA.buttons.find((btn) => btn.text === 'Learn More')?.href || '#'}
                className="
                  px-8 py-3 text-lg font-semibold rounded-full 
                  border-2 border-blue-900 text-blue-900 
                  hover:bg-blue-900 hover:text-white 
                  shadow-md hover:shadow-xl 
                  transition-all duration-300
                  text-center
                "
                          >
                            Learn More
                          </a>

                          <a
                            href={marathonCTA.buttons.find((btn) => btn.text === 'Get Kit')?.href || '#'}
                            className="
                  px-8 py-3 text-lg font-semibold rounded-full 
                  border-2 border-yellow-400 text-yellow-600 
                  hover:bg-yellow-400 hover:text-blue-900 
                  shadow-md hover:shadow-xl 
                  transition-all duration-300
                  text-center
                "
              >
                Get Kit
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
