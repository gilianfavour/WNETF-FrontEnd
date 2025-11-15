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


'use client';

import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

const PRIMARY_COLOR = '#032B53';
const LIGHT_BACKGROUND = '#EAEAEA';
const HOVER_COLOR = '#0077B5'; // blue for hover

const Announcement = () => {
  const socialIcons = [
    { key: 'f', icon: FaFacebookF, title: 'Facebook' },
    { key: 'in', icon: FaLinkedinIn, title: 'LinkedIn' },
    { key: 'youtube', icon: FaYoutube, title: 'YouTube' },
    { key: 'insta', icon: FaInstagram, title: 'Instagram' },
    { key: 'in2', icon: FaLinkedinIn, title: 'LinkedIn 2' },
  ];

  return (
    <div
      className="flex flex-col sm:flex-row w-full overflow-hidden items-center text-sm"
      style={{
        background: `linear-gradient(to right, ${LIGHT_BACKGROUND}, #FFFFFF, ${LIGHT_BACKGROUND})`,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex flex-col sm:flex-row items-center w-full py-3.5 justify-between px-4 gap-3 sm:gap-0">
        {/* LEFT SIDE BLOCK */}
        <div className="flex justify-center sm:justify-start w-full sm:w-auto">
          <div
            className="relative flex flex-col sm:flex-row items-center justify-center sm:justify-start py-3 px-4 sm:px-6 text-white w-full sm:min-w-[350px] text-center sm:text-left"
            style={{
              backgroundColor: PRIMARY_COLOR,
              clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0 100%)',
              borderRadius: '0 3px 3px 6px',
              marginLeft: '0',
            }}
          >
            {/* Email Section */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start whitespace-nowrap transition-transform duration-300 hover:scale-105 mb-1 sm:mb-0" title="Email us">
              <FaEnvelope className="mr-2 text-lg" />
              <span className="text-xs sm:text-sm">inquiriesunett@gmail.com | info@unett.com</span>
            </div>

            <span className="hidden sm:block mx-4 text-gray-400">|</span>

            {/* Phone Section */}
            <div className="flex items-center justify-center sm:justify-start whitespace-nowrap transition-transform duration-300 hover:scale-105" title="Call us">
              <FaPhoneAlt className="mr-2 text-lg" />
              <span className="text-xs sm:text-sm">+256 772 603 162</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BLOCK: Social Icons */}
        <div className="flex justify-center sm:justify-end items-center space-x-3 w-full sm:w-auto">
          {socialIcons.map(({ icon: Icon, title }, index) => (
            <a
              key={index}
              href="#"
              target="_blank"
              rel="noreferrer"
              title={`Visit our ${title} page`}
              className="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300"
              style={{
                backgroundColor: PRIMARY_COLOR,
                color: 'white',
              }}
            >
              <Icon className="text-lg transition-all duration-300" />
              <style jsx>{`
                a:hover {
                  background-color: ${HOVER_COLOR} !important;
                }
                a:hover svg {
                  color: white !important;
                }
              `}</style>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
