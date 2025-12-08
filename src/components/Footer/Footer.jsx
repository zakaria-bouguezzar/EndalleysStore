// src/components/Footer/Footer.jsx
import React from "react";
import { Instagram, Facebook } from "lucide-react";

// High-quality TikTok icon
const TikTokIcon = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M33.6 13.3c-2.4-1.3-4-3.9-4-6.8h-5.4V29c-.1 2.5-2.2 4.4-4.7 4.3-2.5-.1-4.4-2.2-4.3-4.7.1-2.4 2-4.3 4.4-4.3 1 0 1.9.3 2.7.8v-5.7c-7.2-1.2-14 3.7-15.2 10.9s3.7 14 10.9 15.2 14-3.7 15.2-10.9c.1-.7.2-1.4.2-2.1V17.8c2.1 1.4 4.6 2.2 7.2 2.2v-5.5c-2.5 0-4.9-.7-7-1.9z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Brand Name */}
        <h1 className="text-center text-3xl font-semibold tracking-wide text-gray-900 mb-4">
          ENDALLEYS
        </h1>
        <p className="text-center text-gray-500 text-sm mb-10">
          Premium Jewelry • Grillz • Rings • Necklaces
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-10 mb-10">
          <a
            href="https://www.instagram.com/endalleys?igsh=bGZ4OHl5cjkzaG5s "
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-700 transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram size={26} strokeWidth={1.5} />
          </a>

          <a
            href="https://www.tiktok.com/@endalleys?_r=1&_t=ZS-91vVSJu84q8 "
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-700 transition-all duration-300 hover:scale-110"
            aria-label="TikTok"
          >
            <TikTokIcon size={26} />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100078339475852&mibextid=wwXIfr&mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-700 transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook size={26} strokeWidth={1.5} />
          </a>
        </div>

        {/* Dark Red Divider */}
        <div className="w-20 h-[3px] bg-gradient-to-r from-red-700 to-red-800 mx-auto mb-6 rounded-full"></div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} ENDALLEYS — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;