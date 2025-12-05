// /* eslint-disable @next/next/no-img-element */
// import { announcementData } from '~/shared/data/global.data';

// const Announcement = () => {
//   const { title, callToAction, callToAction2 } = announcementData;

//   return (
//     <div className="hidden overflow-hidden text-ellipsis whitespace-nowrap border-b border-blue-900 bg-blue-900 px-3 py-2 text-sm text-gray-200 md:block">
//       <span className="bg-blue-800 py-0.5 px-1 text-xs font-semibold">{title}</span>{' '}
//       {callToAction && callToAction.text && callToAction.href && (
//         <a
//           href={callToAction.href}
//           target="_blank"
//           rel="noreferrer noopened"
//           className="cursor-pointer text-gray-100 hover:underline"
//         >
//           {callToAction.icon && <callToAction.icon className="mr-1 -ml-1.5 h-5 w-5" />} {callToAction.text}
//         </a>
//       )}
//       {callToAction2 && callToAction2.text && callToAction2.href && (
//         <a
//           href={callToAction2.href}
//           target="_blank"
//           rel="noreferrer"
//           className="float-right rtl:float-left"
//           title={callToAction2.text}
//         >
//           <img
//             src="https://img.shields.io/twitter/url/https/twitter.com/onwidget.svg?style=social&amp;label=Follow%20%40onWidget"
//             alt="Follow @onWidget"
//             width="125"
//             height="20"
//           />
//         </a>
//       )}
//     </div>
//   );
// };

// export default Announcement;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const PRIMARY_COLOR = "#032B53";
const LIGHT_BACKGROUND = "#EAEAEA";
const HOVER_COLOR = "#1cb6cd";

export const BANNER_HEIGHT = 40;

const Announcement = () => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScroll) {
        setShowBanner(true);
        window.dispatchEvent(new CustomEvent("banner-visibility", { detail: true }));
      } else {
        setShowBanner(false);
        window.dispatchEvent(new CustomEvent("banner-visibility", { detail: false }));
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialIcons = [
    { icon: FaFacebookF, title: "Facebook" },
    { icon: FaLinkedinIn, title: "LinkedIn" },
    { icon: FaYoutube, title: "YouTube" },
    { icon: FaInstagram, title: "Instagram" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showBanner ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        height: `${BANNER_HEIGHT}px`,
        background: `linear-gradient(to right, ${LIGHT_BACKGROUND}, #FFFFFF, ${LIGHT_BACKGROUND})`,
        borderRadius: "0 0 6px 6px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex flex-col sm:flex-row w-full items-stretch text-[10px] sm:text-xs h-full">
        <div className="flex w-full py-1 px-2 justify-between items-center">

          {/* LEFT Contact */}
          <div
            className="relative flex items-center py-1 px-3 text-white text-xs"
            style={{
              backgroundColor: PRIMARY_COLOR,
              clipPath: "polygon(0 0, 100% 0, 97% 100%, 0 100%)",
              borderRadius: "0 3px 3px 6px",
            }}
          >
            <FaEnvelope className="mr-1 text-xs" />
            <span>inquiriesunett@gmail.com | info@unett.com</span>

            <span className="mx-2 text-gray-300 hidden sm:block">|</span>

            <FaPhoneAlt className="mr-1 text-xs hidden sm:block" />
            <span className="hidden sm:block">+256 772 603 162</span>
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
                  style={{ backgroundColor: HOVER_COLOR, color: "white" }}
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
