"use client"; // Adding "use client" since we'll use useEffect for animations
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  // Logo pulse animation effect
  useEffect(() => {
    const logo = document.getElementById("footer-logo");
    if (logo) {
      logo.classList.add("animate-pulse-glow");
    }
  }, []);

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-gray-200 py-8 relative overflow-hidden">
      {/* Subtle Tech Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e90ff_0,rgba(0,0,0,0.9)_75%)] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center z-10">
        {/* Left Section: Logo and Brand Name */}
        <div className="flex items-center mb-6 md:mb-0">
          <Image
            id="footer-logo"
            src="/clean.png"
            alt="cleanmybg Logo - AI Background Remover"
            width={1000}
            height={1000}
            className="w-20 h-20  transition-all duration-300"
          />
          <h1 className="ml-3 text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CleanMy<span className="text-gray-300">Bg</span>
          </h1>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link
            href="/about"
            className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300 relative group"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/privacy"
            className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300 relative group"
          >
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/terms"
            className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300 relative group"
          >
            Terms & Conditions
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/contact"
            className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300 relative group"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/faq"
            className="text-gray-300 hover:text-blue-400 hover:shadow-glow transition-all duration-300 relative group"
          >
            FAQ
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </nav>

        {/* Right Section: Copyright */}
        <div className="mt-6 md:mt-0 text-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} cleanmybg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;