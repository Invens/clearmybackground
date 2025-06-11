'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';

export default function ProfilePage() {
  const { token, isLoggedIn, setUserData: setContextUserData } = useUser();
  const { status } = useSession(); // Check auth status
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Log initial state for debugging
    console.log('ProfilePage useEffect: isLoggedIn=', isLoggedIn, 'token=', token, 'authStatus=', status);

    // Wait for authentication status to stabilize
    if (status === 'loading') {
      return; // Do nothing while session is loading
    }

    if (status === 'unauthenticated' || !isLoggedIn || !token) {
      toast.error('Please log in to view your profile.', { duration: 4000 });
      setTimeout(() => {
        router.push('/login');
      }, 4000);
      return;
    }

    let isMounted = true;

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || 'Failed to fetch profile';
          console.error('API Error:', errorMessage, 'Status:', response.status);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('API Response:', data);
        const formattedData = {
          name: data.name || 'User',
          email: data.email || 'No email',
          credits: data.credits || 0,
          plan: data.subscriptionPlan || 'Free', // Map subscriptionPlan to plan
          avatar: data.avatar || null,
        };
        if (isMounted) {
          setUserData(formattedData);
          setContextUserData?.(formattedData);
        }
      } catch (err) {
        console.error('Fetch Profile Error:', err);
        if (isMounted) {
          setError(err.message);
          toast.error(err.message, { duration: 4000 });
          if (err.message.includes('Unauthorized') || err.message.includes('Invalid token')) {
            setTimeout(() => {
              router.push('/login');
            }, 4000);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false; // Cleanup to prevent state updates after unmount
    };
  }, [isLoggedIn, token, status, router, setContextUserData]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#1a1a2e_0%,_#0f172a_50%,_#2a2a4e_100%)] flex items-center justify-center">
      
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (status === 'unauthenticated' || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#1a1a2e_0%,_#0f172a_50%,_#2a2a4e_100%)] flex items-center justify-center">
        <p className="text-white text-lg">Redirecting to login...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#1a1a2e_0%,_#0f172a_50%,_#2a2a4e_100%)] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#1a1a2e_0%,_#0f172a_50%,_#2a2a4e_100%)] flex items-center justify-center">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );
  }

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
            Your <span className="text-indigo-400">Profile</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto">
            Manage your ClearMyBackground account and credits.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              {userData?.avatar ? (
                <Image
                  src={userData.avatar}
                  alt="Profile avatar"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl text-white font-bold">
                  {userData?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{userData?.name}</h2>
            <p className="text-sm text-gray-400">{userData?.email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg">
              <span className="text-gray-200 font-medium">Credits</span>
              <span className="text-indigo-400 font-bold">{userData?.credits}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg">
              <span className="text-gray-200 font-medium">Plan</span>
              <span className="text-indigo-400 font-bold">{userData?.plan}</span>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Link
              href="/credits"
              className="block w-full py-3 bg-indigo-600 text-white text-center rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label="Manage credits"
            >
              {userData?.credits === 0 ? 'Buy Credits' : 'Manage Credits'}
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer */}
        
      </div>
      <Footer />
    </>
  );
}