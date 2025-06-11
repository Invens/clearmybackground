
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

function Header() {
  const { user, credits, plan, isLoggedIn, logout } = useUser();
  const { status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsDropdownOpen(false); // Close dropdown when toggling mobile menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsMenuOpen(false); // Close mobile menu when toggling dropdown
  };

  const handleLogout = () => {
    logout();
    signOut({ callbackUrl: '/' });
    toast.success('Logged out successfully', { duration: 3000 });
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google');
    } catch (err) {
      toast.error('Google sign-in failed', { duration: 4000 });
    }
  };

  // Wait for session to stabilize
  if (status === 'loading') {
    return null; // Prevent rendering until session is ready
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <nav className="w-full bg-gradient-to-r from-gray-900 to-black shadow-lg p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center">
          <Image
            src="/clean.png"
            alt="CleanMyBg logo"
            width={1000}
            height={1000}
            className="w-12 h-12 object-contain"
            priority
          />
          <h1 className="ml-2 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CleanMy<span className="text-gray-200">BG</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-gray-200 hover:text-blue-400 transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="text-gray-200 hover:text-blue-400 transition-colors duration-200">
            Contact
          </Link>
          <Link href="/privacy" className="text-gray-200 hover:text-blue-400 transition-colors duration-200">
            Privacy
          </Link>
          <Link href="/faq" className="text-gray-200 hover:text-blue-400 transition-colors duration-200">
            FAQ
          </Link>

          {isLoggedIn && status === 'authenticated' ? (
            <>
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-gray-200 hover:text-blue-400 transition-colors duration-200"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="User avatar"
                        width={32}
                        height={32}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                    {credits} Credits
                  </span>
                </motion.button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-700/50 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {credits <= 10 && (
                <Link
                  href="/credits"
                  className="text-sm bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-medium hover:bg-yellow-300 transition-colors duration-200"
                  aria-label="Manage credits"
                >
                  {credits === 0 ? 'Buy Credits' : 'Manage Credits'}
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-200 hover:text-cyan-400 transition-colors duration-200">
                Login
              </Link>
              <Link href="/signup" className="text-sm text-gray-200 hover:text-cyan-400 transition-colors duration-200">
                Signup
              </Link>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center space-x-2 bg-[#ffffff] text-black px-4 py-2 rounded-lg hover:bg-[#3578E5] transition-colors duration-200"
                aria-label="Sign in with Google"
              >
                <Image
                  src="/google_logo.png"
                  alt="Google logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">Sign in with Google</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-200 hover:text-blue-400 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full right-0 mt-2 w-64 bg-gray-800 bg-opacity-95 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl z-50"
            >
              <div className="flex flex-col p-4 space-y-2">
                <Link
                  href="/about"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Privacy
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-200 hover:text-blue-400 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  FAQ
                </Link>

                {isLoggedIn && status === 'authenticated' ? (
                  <>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          {user?.avatar ? (
                            <Image
                              src={user.avatar}
                              alt="User avatar"
                              width={32}
                              height={32}
                              className="object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-white text-sm font-bold">
                              {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-200">
                          {user?.name || 'User'} ({plan || 'Free'})
                        </span>
                        <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                          {credits} Credits
                        </span>
                      </div>
                      <Link
                        href="/profile"
                        className="text-sm text-gray-200 hover:text-blue-400 transition-colors duration-200"
                        onClick={toggleMenu}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="text-left text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
                        aria-label="Log out"
                      >
                        Logout
                      </button>
                      {credits <= 10 && (
                        <Link
                          href="/credits"
                          className="text-sm bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-medium hover:bg-yellow-300 transition-colors duration-200"
                          onClick={toggleMenu}
                          aria-label="Manage credits"
                        >
                          {credits === 0 ? 'Buy Credits' : 'Manage Credits'}
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm text-gray-200 hover:text-cyan-400 transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm text-gray-200 hover:text-cyan-400 transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      Signup
                    </Link>
                    <button
                      onClick={() => {
                        handleGoogleLogin();
                        toggleMenu();
                      }}
                      className="flex items-center space-x-2 bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:bg-[#3578E5] transition-colors duration-200"
                      aria-label="Sign in with Google"
                    >
                      <Image
                        src="/google_logo.png"
                        alt="Google logo"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Sign in with Google</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default Header;