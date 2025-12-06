"use client";

import React from "react";
import { IconActivity } from "@tabler/icons-react";

const FLOATING_CTA_COLOR = "#FFD744"; // Gold
const FLOATING_CTA_TEXT_COLOR = "#032B53"; // Dark blue

const FloatingMarathonCTA: React.FC = () => {
  return (
    <a
      href="/about/marathon"
      className="fixed bottom-6 right-6 flex items-center space-x-2 px-5 py-3 rounded-full shadow-xl animate-bounce hover:scale-105 transition-all z-[9999]"
      style={{
        backgroundColor: FLOATING_CTA_COLOR,
        color: FLOATING_CTA_TEXT_COLOR,
      }}
    >
      <IconActivity size={24} />
      <span className="font-bold">Get a kit!</span>
    </a>
  );
};

export default FloatingMarathonCTA;
