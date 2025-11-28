// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import { IconRss } from '@tabler/icons-react';
// import { useOnClickOutside } from '~/hooks/useOnClickOutside';
// import ToggleDarkMode from '~/components/atoms/ToggleDarkMode';
// import Link from 'next/link';
// import Logo from '~/components/atoms/Logo';
// import ToggleMenu from '../atoms/ToggleMenu';
// import { headerData } from '~/shared/data/global.data';
// import CTA from '../common/CTA';
// import { CallToActionType } from '~/shared/types';

// const Header = () => {
//   const { links, actions, isSticky, showToggleTheme, showRssFeed, position } = headerData;

//   const ref = useRef(null);

//   const updatedIsDropdownOpen =
//     links &&
//     links.map(() => {
//       return false;
//     });

//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>(updatedIsDropdownOpen as boolean[]);
//   const [isToggleMenuOpen, setIsToggleMenuOpen] = useState<boolean>(false);

//   const handleDropdownOnClick = (index: number) => {
//     setIsDropdownOpen((prevValues) => {
//       const newValues = [...(prevValues as boolean[])];
//       newValues.forEach((value, i) => {
//         if (value === true) {
//           newValues[i] = false;
//         } else {
//           newValues[i] = i === index;
//         }
//       });
//       return newValues;
//     });
//   };
//   const handleCloseDropdownOnClick = (index: number) => {
//     setIsDropdownOpen((prevValues) => {
//       const newValues = [...(prevValues as boolean[])];
//       newValues[index] = false;
//       return newValues;
//     });
//   };

//   const handleToggleMenuOnClick = () => {
//     setIsToggleMenuOpen(!isToggleMenuOpen);
//   };

//   useOnClickOutside(ref, () => {
//     setIsDropdownOpen(updatedIsDropdownOpen as boolean[]);
//   });

//   return (
//     <header
//       className={`top-0 z-40 mx-auto w-full flex-none bg-white transition-all duration-100 ease-in dark:bg-slate-900 md:bg-white/90 md:backdrop-blur-sm dark:md:bg-slate-900/90 ${
//         isSticky ? 'sticky' : 'relative'
//       } ${isToggleMenuOpen ? 'h-screen md:h-auto' : 'h-auto'}`}
//       id="header"
//     >
//       <div className="mx-auto w-full max-w-7xl md:flex md:justify-between md:py-3.5 md:px-4">
//         <div
//           className={`flex justify-between py-3 px-3 md:py-0 md:px-0 ${
//             isToggleMenuOpen
//               ? 'md:bg-transparent md:dark:bg-transparent md:border-none bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-600'
//               : ''
//           }`}
//         >
//           <Link
//             className="flex items-center"
//             href="/"
//             onClick={() =>
//               isToggleMenuOpen ? handleToggleMenuOnClick() : setIsDropdownOpen(updatedIsDropdownOpen as boolean[])
//             }
//           >
//             <Logo />
//           </Link>
//           <div className="flex items-center md:hidden">
//             <ToggleMenu handleToggleMenuOnClick={handleToggleMenuOnClick} isToggleMenuOpen={isToggleMenuOpen} />
//           </div>
//         </div>
//         <nav
//           className={`${isToggleMenuOpen ? 'block px-3' : 'hidden'} h-screen md:w-full ${
//             position === 'right' ? 'justify-end' : position === 'left' ? 'justify-start' : 'justify-center'
//           } w-auto overflow-y-auto dark:text-slate-200 md:mx-5 md:flex md:h-auto md:items-center md:overflow-visible`}
//           aria-label="Main navigation"
//         >
//           <ul
//             ref={ref}
//             className="flex w-full flex-col mt-2 mb-36 md:m-0 text-xl md:w-auto md:flex-row md:self-center md:pt-0 md:text-base"
//           >
//             {links &&
//               links.map(({ label, href, icon: Icon, links }, index) => (
//                 <li key={`item-link-${index}`} className={links?.length ? 'dropdown' : ''}>
//                   {links && links.length ? (
//                     <>
//                       <button
//                         className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
//                         onClick={() => handleDropdownOnClick(index)}
//                       >
//                         {label}{' '}
//                         {Icon && (
//                           <Icon
//                             className={`${
//                               isDropdownOpen[index] ? 'rotate-180' : ''
//                             } ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden h-3.5 w-3.5 md:inline`}
//                           />
//                         )}
//                       </button>
//                       <ul
//                         className={`${
//                           isDropdownOpen[index] ? 'block' : 'md:hidden'
//                         } rounded pl-4 font-medium drop-shadow-xl md:absolute md:min-w-[200px] md:bg-white/90 md:pl-0 md:backdrop-blur-md dark:md:bg-slate-900/90 md:border md:border-gray-200 md:dark:border-slate-700`}
//                       >
//                         {links.map(({ label: label2, href: href2 }, index2) => (
//                           <li key={`item-link-${index2}`}>
//                             <Link
//                               className="whitespace-no-wrap block py-2 px-5 first:rounded-t last:rounded-b dark:hover:bg-gray-700 md:hover:bg-gray-200"
//                               href={href2 as string}
//                               onClick={() =>
//                                 isToggleMenuOpen ? handleToggleMenuOnClick() : handleCloseDropdownOnClick(index)
//                               }
//                             >
//                               {label2}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   ) : (
//                     <Link
//                       className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
//                       href={href as string}
//                       onClick={() => (isToggleMenuOpen ? handleToggleMenuOnClick() : handleDropdownOnClick(index))}
//                     >
//                       {label}
//                     </Link>
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </nav>
//         <div
//           className={`${
//             isToggleMenuOpen ? 'block' : 'hidden'
//           } fixed bottom-0 left-0 w-full justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0 md:bg-transparent md:dark:bg-transparent md:border-none bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-600`}
//         >
//           <div className="flex w-full items-center justify-between md:w-auto">
//             {showToggleTheme && <ToggleDarkMode />}
//             {showRssFeed && (
//               <Link
//                 className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
//                 aria-label="RSS Feed"
//                 href=""
//               >
//                 <IconRss className="h-5 w-5" />
//               </Link>
//             )}
//             {actions && actions.length > 0 && (
//               <div className="ml-4 rtl:ml-0 rtl:mr-4 flex w-max flex-wrap justify-end">
//                 {actions.map((callToAction, index) => (
//                   <CTA
//                     key={`item-action-${index}`}
//                     callToAction={callToAction as CallToActionType}
//                     linkClass="btn btn-primary m-1 py-2 px-5 text-sm font-semibold shadow-none md:px-6"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { BANNER_HEIGHT } from "./Announcement";

const PRIMARY_COLOR = "#032B53";
const HOVER_BG = "#E1F5FE";

/* ------------------------------- */
interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Link: React.FC<CustomLinkProps> = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

/* ------------------------------- */
const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (e: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

/* ------------------------------- */
const NAV_LINKS = [
  {
    label: "About Us",
    links: [
      { label: "West Nile Education Trust Fund", href: "/about/wnetf" },
      { label: "WNETF-Strategic Plan", href: "/about/strategic_plan" },
      { label: "WestNile Foundation", href: "/about/wnf" },
      { label: "Our Partners", href: "/about/partners" },
      { label: "Our Team", href: "/about/team" },
      { label: "Annual Dinner", href: "/about/AnnualDinner" },
      { label: "WestNile Night", href: "/about/wnNight" },
    ],
  },
  { label: "What we do", href: "/whatwedo", links: [] },
  {
    label: "Latest",
    links: [
      { label: "Impact", href: "/impact#impact" },
      { label: "Events", href: "/events#events" },
      { label: "Blog", href: "/blog#blog" },
    ],
  },

  {
    label: "Connect with us",
    links: [
      { label: "Contact", href: "/join" },
      { label: "Donate", href: "/donate" },
      { label: "Volunteer With Us", href: "/volunteerForm#volunteerForm" },
    ],
  },
];

/* ------------------------------- */
const CustomNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(80);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const isShrunk = navHeight === 60;
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLUListElement | null>(null);

  useOnClickOutside(navRef, () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  });

  /* --- Shrink Navbar on scroll --- */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setNavHeight(current > lastScrollY.current ? 60 : 70);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --- Listen for banner visibility events --- */
  useEffect(() => {
    const handler = (e: any) => setBannerVisible(e.detail);
    window.addEventListener("banner-visibility", handler);
    return () => window.removeEventListener("banner-visibility", handler);
  }, []);

  return (
    <nav
      className="fixed left-0 w-full z-[1040] shadow-md"
      style={{
        backgroundColor: HOVER_BG,
        borderBottom: `4px solid ${PRIMARY_COLOR}`,
        height: `${navHeight}px`,
        top: bannerVisible ? `${BANNER_HEIGHT}px` : "0px",
        transition: "height 0.3s ease, top 0.3s ease",
      }}
    >
      <style>
        {`
          @keyframes pulseGlow {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div className="container mx-auto flex items-center justify-between h-full px-4">
        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img
            src="/images/wnetf.png"
            className={`object-contain transition-all ${isShrunk ? "h-14" : "h-20"}`}
            alt="Logo"
          />
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul
            ref={navRef}
            className={`flex gap-8 items-center font-semibold transition-all ${isShrunk ? "text-base" : "text-lg"
              }`}
          >
            {NAV_LINKS.map((item, idx) => (
              <li key={idx} className="relative group">
                {!item.links.length ? (
                  <a
                    href={item.href}
                    className="font-bold text-black py-2 px-3 hover:bg-[#E1F5FE]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <span className="font-bold text-black py-2 px-3 cursor-pointer hover:bg-[#E1F5FE]">
                      {item.label}
                    </span>
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl p-3 rounded min-w-[220px]">
                      {item.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          className="block py-2 px-4 hover:bg-[#E1F5FE]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

              </li>
            ))}
          </ul>
        </div>

        {/* APPLY BUTTON - visible on all screens */}
        <div className="flex lg:flex-none">
          <a
            href="/apply"
            className={`text-white rounded-lg shadow animate-[pulseGlow_2s_infinite] hover:scale-110 px-3 py-1 text-sm`}
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Apply Here
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 ml-4 relative z-50"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
            )}
          </svg>
        </button>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-start px-4 py-4 space-y-2 transition-all">
            {NAV_LINKS.map((item, idx) => (
              <div
                key={idx}
                className="w-full"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {!item.links.length ? (
                  <Link
                    href={item.href ?? "#"}
                    className="block w-full py-2 px-4 text-black rounded hover:bg-[#E1F5FE]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>

                ) : (
                  <>
                    <div
                      onClick={() =>
                        setActiveDropdown(activeDropdown === idx ? null : idx)
                      }
                      className="flex justify-between items-center w-full py-2 px-4 text-black rounded hover:bg-[#E1F5FE] cursor-pointer"
                    >
                      {item.label}
                      <span className="ml-2">{activeDropdown === idx ? "▲" : "▼"}</span>
                    </div>
                    {activeDropdown === idx && (
                      <div className="pl-4 flex flex-col space-y-1">
                        {item.links.map((link, i) => (
                          <Link
                            key={i}
                            href={link.href}
                            className="block w-full py-2 px-4 text-black rounded hover:bg-[#E1F5FE]"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
