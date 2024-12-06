"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Page() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-white shadow-lg p-4 flex justify-between items-center">
      {/* Logo and Brand Name */}
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="ClearMyBackground logo"
            width={1000}
            height={1000}
            className="w-12 h-12"
          />
          <h1 className="ml-2 text-lg md:text-xl font-bold text-gray-800">
            ClearMy<span className="text-gray-400">Background</span>
          </h1>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/about" className="text-gray-600 hover:text-blue-500">
          About Us
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-500">
          Contact Us
        </Link>
        <Link href="/privacy" className="text-gray-600 hover:text-blue-500">
          Privacy Policy
        </Link>
        <Link href="/faq" className="text-gray-600 hover:text-blue-500">
          FAQ
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <div
          className="menu-button cursor-pointer"
          onClick={toggleMenu} // Toggle menu visibility on click
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
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
          <div className="menu absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
            >
              Contact Us
            </Link>
            <Link
              href="/privacy"
              className="block px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
            >
              Privacy Policy
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Page;
