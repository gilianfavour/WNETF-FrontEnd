"use client";
import { FaFacebook, FaTwitter, FaLinkedin, FaHeart, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  const primaryColor = "#2596be";
  
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-gray-200 pt-6 pb-4 mt-0.5 border-t border-gray-700">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          
          {/* NGO Identity */}
          <div>
            <div className="flex items-center mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <h2 className="text-white text-xl font-bold tracking-tight">
                WNETF
              </h2>
            </div>

            {/* NOTE: Social icons removed from here so they can be placed just above the bottom bar */}
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {['About WNETF', 'Scholarship Programs', 'How to Apply', 'Donate & Support', 'Contact Us'].map((item, index) => (
                <li key={index}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <span 
                      className="w-2 h-2 rounded-full mr-3 group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: primaryColor }}
                    ></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Our Impact
            </h3>
            <ul className="space-y-4">
              {[
                'Secondary School Scholarships',
                'University Sponsorship',
                'Mentorship & Career Guidance',
                'Support for Vulnerable Learners',
                "Girls' Education Empowerment"
              ].map((item, index) => (
                <li key={index} className="flex items-start text-gray-300 group">
                  <span className="mr-2 mt-1" style={{ color: primaryColor }}>•</span>
                  <span className="text-sm group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Stay Connected
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <FaMapMarkerAlt className="mr-3" style={{ color: primaryColor }} />
                <span className="text-sm">West Nile Region, Uganda</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaEnvelope className="mr-3" style={{ color: primaryColor }} />
                <span className="text-sm">info@wnetf.org</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaPhone className="mr-3" style={{ color: primaryColor }} />
                <span className="text-sm">+256 700 000000</span>
              </div>
            </div>

            {/* Newsletter */}
            <form className="space-y-3">
              <label className="text-gray-300 text-sm font-medium">
                Get Scholarship Updates
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 focus:ring-2 transition-all duration-300"
                  style={{ borderColor: primaryColor }}
                />
                <button
                  type="submit"
                  className="text-white px-5 py-2.5 rounded-lg font-semibold"
                  style={{ backgroundColor: primaryColor }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* --- MOVED SOCIAL ICONS: placed here so they appear right before the bottom bar --- */}
        <div className="flex justify-center md:justify-start mb-6">
          <div className="flex space-x-4">
            {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-2.5 rounded-lg transition-all duration-300 text-white hover:scale-105"
                style={{ backgroundColor: primaryColor }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e7a9c")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = primaryColor)}
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>
        {/* -------------------------------------------------------------------- */}

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} WNETF — All Rights Reserved.
            </div>
            
            {/* Quote */}
            <div 
              className="text-gray-300 italic text-sm text-center"
              style={{ color: primaryColor }}
            >
              "Education is the bridge to a brighter tomorrow."
            </div>
            
            {/* Made with love */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-400 mx-1" />
              <span>for education</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
