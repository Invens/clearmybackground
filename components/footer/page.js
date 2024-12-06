import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo and Brand Name */}
        <div className="flex items-center mb-4 md:mb-0">
          <Image
            src="/logo.png"
            alt="ClearMyBackground logo"
            width={1000}
            height={1000}
            className="w-10 h-10"
          />
          <h1 className="ml-2 text-lg md:text-xl font-bold text-gray-100">
            ClearMy<span className="text-gray-400">Background</span>
          </h1>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-4">
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
        </nav>

        {/* Right Section: Copyright */}
        <div className="mt-4 md:mt-0 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ClearMyBackground. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
