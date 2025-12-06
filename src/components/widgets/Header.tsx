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
      { label: "Our Marathon", href: "/about/marathon" },
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
    if (window.innerWidth < 1024) return;
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
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl p-3 rounded min-w-[380px]">
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
          <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-start px-4 py-4 space-y-2 transition-all z-[2000]"
          style={{zIndex: 9999}}>
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
