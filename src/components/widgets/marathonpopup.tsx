"use client";

import React, { useState, useEffect, useRef } from "react";
import CountdownTimer from "~/components/widgets/countdowntimer";
import { IconArrowRight } from '@tabler/icons-react';

const MARATHON_DATE = "2025-12-27T06:00:00";

const MarathonPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show popup after page loads
    setIsOpen(true);
  }, []);

  const handleClose = () => setIsOpen(false);

  // Close if click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[3000]">
      <div
        ref={popupRef}
        className="bg-white rounded-2xl p-8 max-w-lg w-full text-center relative shadow-xl"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-[#032B53] mb-4">
          WNETF 2025 Arua Marathon
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Join us on <strong>Saturday, December 27, 2025</strong> at the open ground opposite Total Arua Hill.
        </p>

        {/* Countdown */}
        <CountdownTimer targetDate={MARATHON_DATE} />

        {/* CTA */}
        <a
          href="/about/marathon"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg"
          style={{ backgroundColor: '#032B53' }}
        >
          View Marathon Details <IconArrowRight />
        </a>
      </div>
    </div>
  );
};

export default MarathonPopup;
