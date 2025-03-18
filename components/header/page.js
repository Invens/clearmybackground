"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 to-black shadow-lg p-4 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Logo and Brand Name */}
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="ClearMyBackground logo"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full border border-blue-500"
          />
          <h1 className="ml-2 text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ClearMy<span className="text-gray-300">Background</span>
          </h1>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8">
        <Link
          href="/about"
          className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300"
        >
          Contact
        </Link>
        <Link
          href="/privacy"
          className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300"
        >
          Privacy
        </Link>
        <Link
          href="/faq"
          className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300"
        >
          FAQ
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <div className="cursor-pointer" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300 hover:text-blue-400 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-lg w-48 border border-gray-700 shadow-lg">
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-300 hover:bg-blue-900 hover:text-blue-400 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-300 hover:bg-blue-900 hover:text-blue-400 transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="block px-4 py-2 text-gray-300 hover:bg-blue-900 hover:text-blue-400 transition-all duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/faq"
              className="block px-4 py-2 text-gray-300 hover:bg-blue-900 hover:text-blue-400 transition-all duration-200"
            >
              FAQ
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;