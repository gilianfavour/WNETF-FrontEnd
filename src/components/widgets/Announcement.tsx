'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

const PRIMARY_COLOR = '#032B53';
const LIGHT_BACKGROUND = '#EAEAEA';
const HOVER_COLOR = '#1cb6cd';

export const BANNER_HEIGHT = 40;

const Announcement = () => {
  const [showBanner, setShowBanner] = useState(true);

  const [typeKey, setTypeKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypeKey((prev) => prev + 1);
    }, 8000); // restart every 8 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScroll) {
        setShowBanner(true);
        window.dispatchEvent(new CustomEvent('banner-visibility', { detail: true }));
      } else {
        setShowBanner(false);
        window.dispatchEvent(new CustomEvent('banner-visibility', { detail: false }));
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialIcons = [
    { icon: FaFacebookF, title: 'Facebook' },
    { icon: FaLinkedinIn, title: 'LinkedIn' },
    { icon: FaYoutube, title: 'YouTube' },
    { icon: FaInstagram, title: 'Instagram' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showBanner ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        height: `${BANNER_HEIGHT}px`,
        background: `linear-gradient(to right, ${LIGHT_BACKGROUND}, #FFFFFF, ${LIGHT_BACKGROUND})`,
        borderRadius: '0 0 6px 6px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex flex-col sm:flex-row w-full items-stretch text-[10px] sm:text-xs h-full">
        <div className="flex w-full py-1 px-2 justify-between items-center">
          {/* LEFT Contact */}
          <div
            className="relative flex items-center py-1 px-3 text-white text-xs"
            style={{
              backgroundColor: PRIMARY_COLOR,
              clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0 100%)',
              borderRadius: '0 3px 3px 6px',
            }}
          >
            <FaEnvelope className="mr-1 text-xs" />
            <span>inquirieswnetf@gmail.com | info@wnetf.com</span>

            <span className="mx-2 text-gray-300 hidden sm:block">|</span>

            <FaPhoneAlt className="mr-1 text-xs hidden sm:block" />
            <span className="hidden sm:block">+256 772 603 162</span>
          </div>

          {/* CENTER — Animated Announcement */}
          <div className="hidden sm:flex flex-1 relative px-4 mx-2 h-full items-center justify-center">
            <span
              key={typeKey}
              className="text-[#032B53] font-semibold animate-typewriter overflow-hidden border-r-2 border-r-[#032B53] whitespace-nowrap"
            >
              Join us for the West Nile Education Trust Fund Run – 27th Dec 2025 • Get a Kit!
            </span>
          </div>

          {/* RIGHT — Social Icons + Donate */}
          <div className="flex items-center gap-1 ml-auto">
            <div className="flex items-center gap-1">
              {socialIcons.map(({ icon: Icon, title }, index) => (
                <a
                  href="#"
                  key={index}
                  title={title}
                  className="flex items-center justify-center h-6 w-6 rounded-full"
                  style={{ backgroundColor: HOVER_COLOR, color: 'white' }}
                >
                  <Icon className="text-xs" />
                </a>
              ))}
            </div>

            <Link
              href="/donate"
              className="px-3 py-1 rounded font-semibold text-white flex items-center gap-1 text-[10px] sm:text-sm"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <span className="animate-pingSlow">🤍</span>
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
