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

// --- Colors ---
const PRIMARY_COLOR = '#032B53';
const HOVER_BG = "#E1F5FE";

// --- Custom Link Component ---
const Link = ({
  href,
  children,
  onClick,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={className}
    style={style}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </a>
);

// --- Hook for Outside Click ---
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
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// --- Navigation Links ---
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

  // *** UPDATED: What we do — single link, no dropdown ***
  {
    label: "What we do",
    href: "/services",
    links: [],
  },

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
      { label: "Donate", href: "/donate#donate" },
      { label: "Volunteer With Us", href: "/volunteerForm#volunteerForm" },
    ],
  },
];

// --- Main Navigation Bar ---
const CustomNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    NAV_LINKS.map(() => false)
  );
  const navRef = useRef<HTMLUListElement | null>(null);

  const closeNavbar = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(NAV_LINKS.map(() => false));
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleDropdown = (index: number) => {
    if (!NAV_LINKS[index].links.length) return; // <--- prevents dropdown toggle on "What we do"
    setIsDropdownOpen((prev) =>
      prev.map((v, i) => (i === index ? !v : false))
    );
  };

  useOnClickOutside(navRef, () => {
    if (!isMenuOpen) {
      setIsDropdownOpen(NAV_LINKS.map(() => false));
    }
  });

  return (
    <nav
      className="fixed left-0 right-0 z-[1040] shadow-md transition-all"
      style={{
        backgroundColor: HOVER_BG,
        borderBottom: `4px solid ${PRIMARY_COLOR}`,
        top: "80px",
        height: isMenuOpen ? "auto" : "60px",
      }}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center h-full">

        {/* LOGO */}
        <div className="flex items-center h-full py-4">
          <a href="/" className="px-4">
            <img 
              src="/images/wnetf.png" 
              alt="Company Logo" 
              className="h-14 w-auto"
            />
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* NAV ITEMS */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:flex w-full lg:w-auto lg:ml-auto`}>
          <ul
            ref={navRef}
            className="flex flex-col lg:flex-row w-full justify-end items-center py-4 lg:py-0 lg:space-x-8 space-y-2 lg:space-y-0 pr-4"
          >
            {NAV_LINKS.map((item, idx) => (
              <li key={idx} className="relative group">

                {/* If it has no dropdown (like What we do) → render as link */}
                {!item.links.length ? (
                  <a
                    href={item.href}
                    className="font-bold text-black cursor-pointer py-2 px-3 block hover:text-maroon-600 transition duration-200"
                    onClick={closeNavbar}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <span
                      className="font-bold text-black cursor-pointer py-2 px-3 block hover:text-maroon-600 transition duration-200"
                      onClick={() => toggleDropdown(idx)}
                    >
                      {item.label}
                    </span>

                    {/* DROPDOWN */}
                    <div
                      className={`${
                        isDropdownOpen[idx] ? "block" : "hidden"
                      } lg:absolute lg:mt-2 lg:top-full lg:left-0 bg-white rounded-xl shadow-xl z-50 min-w-[220px] p-2 lg:group-hover:block transition-all duration-300`}
                    >
                      {item.links.map((link, subIdx) => (
                        <Link
                          key={subIdx}
                          href={link.href}
                          className="block py-3 px-5 text-gray-700 font-medium border-b last:border-0 hover:bg-red-50 transition duration-200"
                          onClick={closeNavbar}
                          style={{ borderBottomColor: "#eee" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = PRIMARY_COLOR;
                            e.currentTarget.style.backgroundColor = "#E1F5FE";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#333";
                            e.currentTarget.style.backgroundColor = "white";
                          }}
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
      </div>
    </nav>
  );
};

export default CustomNavbar;
