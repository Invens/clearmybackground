'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Header from './header/page';
import Footer from './footer/page';

export default function AuthForm({ type = 'login', onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isSignup = type === 'signup';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading(isSignup ? 'Creating account...' : 'Logging in...', { id: 'auth' });

    try {
      if (isSignup) {
        await onSubmit({ name, email, password });
        toast.success('Account created successfully!', { duration: 3000 });
      } else {
        await onSubmit({ email, password });
        toast.success('Logged in successfully!', { duration: 3000 });
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Authentication failed';
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setIsLoading(false);
      toast.dismiss('auth');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google');
    } catch (err) {
      toast.error('Google sign-in failed. Please try again.', { duration: 4000 });
    }
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#1a1a2e_0%,_#0f172a_50%,_#2a2a4e_100%)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            ClearMy<span className="text-indigo-400">Background</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto">
            Remove image backgrounds instantly with our powerful AI tool.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-extrabold text-white text-center mb-8">
            {isSignup ? 'Create Your Account' : 'Log In to Your Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors duration-200 placeholder-gray-400"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors duration-200 placeholder-gray-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-3 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors duration-200 placeholder-gray-400"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              }`}
              aria-label={isSignup ? 'Sign up' : 'Log in'}
            >
              {isLoading ? 'Processing...' : isSignup ? 'Sign Up' : 'Log In'}
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
              </div>
            </div>

            <motion.button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex w-full items-center justify-center space-x-2 bg-[#4285F4] text-white px-4 py-3 rounded-lg hover:bg-[#3578E5] transition-colors duration-200 focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2"
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
            </motion.button>
          </div>

          <p className="text-sm text-center text-gray-400 mt-6">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Log In
                </Link>
              </>
            ) : (
              <>
                New here?{' '}
                <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Create an account
                </Link>
              </>
            )}
          </p>
        </motion.div>

      
      </div>
      <Footer />
    </>
  );
}