'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import Script from 'next/script';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    features: [
      '2 background removals/month',
      'Watermark-free',
      'Custom background upload',
    ],
    credits: 2,
    button: { text: 'Current Plan', disabled: true },
  },
  {
    name: 'Pay-as-you-go',
    price: '₹10/image',
    features: [
      'HD/4K quality',
      'Watermark-free',
      'Custom background upload',
      'Priority Support',
    ],
    button: {
      text: 'Buy Credits',
      planType: 'payg',
    },
  },
  {
    name: 'Premium',
    price: '₹149/month',
    features: [
      '300 background removals/month',
      'HD/4K quality',
      'Watermark-free',
      'Priority Support',
    ],
    credits: 100,
    button: {
      text: 'Subscribe',
      planType: 'premium',
      amount: 149,
      credits: 300,
    },
  },
  {
    name: 'Business',
    price: '₹399/month',
    features: [
      '1000 background removals/month',
      'Batch Upload',
      'Commercial License',
      'Priority Queue',
    ],
    credits: 1000,
    button: {
      text: 'Subscribe',
      planType: 'business',
      amount: 399,
      credits: 1000,
    },
  },
];

export default function CreditPlansPage() {
  const { token, user, credits, isLoggedIn, fetchCredits } = useUser();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [paygQuantity, setPaygQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async (plan) => {
    if (!isLoggedIn || !token) {
      toast.error('Please log in to continue.', { duration: 3000 });
      return;
    }

    let amount, credits;
    if (plan.planType === 'payg') {
      if (paygQuantity < 1) {
        toast.error('Please select at least 1 image.', { duration: 3000 });
        return;
      }
      credits = paygQuantity;
      amount = paygQuantity * 10;
    } else {
      credits = plan.credits || 0;
      amount = plan.amount;
    }

    setIsLoading(true);
    toast.loading('Processing payment...', { id: 'payment' });

    try {
      const res = await fetch(`${API}/payment/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          credits,
          planType: plan.planType || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const { orderId, amount: orderAmount, currency } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency,
        name: 'Background Remover',
        description: `${plan.planType ? plan.planType + ' plan' : 'credit purchase'}`,
        order_id: orderId,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        handler: function (response) {
          toast.success('Payment successful! Credits updated.', { duration: 3000 });
          setTimeout(() => {
            fetchCredits();
          }, 2000);
        },
        theme: {
          color: '#4f46e5',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment failed: ${response.error.description}`, { duration: 4000 });
      });
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      toast.error(`Payment failed: ${err.message}`, { duration: 4000 });
    } finally {
      setIsLoading(false);
      toast.dismiss('payment');
    }
  };

  return (
    <>
          <Header />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-[150px]">
        <div className="max-w-7xl mx-auto"> 
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Choose Your Plan
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                aria-labelledby={`plan-${plan.name.toLowerCase()}`}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.name}
                </div>
                <h2 id={`plan-${plan.name.toLowerCase()}`} className="text-2xl font-bold text-gray-900 text-center mt-6">
                  {plan.name}
                </h2>
                <p className="text-3xl font-semibold text-indigo-600 text-center mt-2">{plan.price}</p>
                <p className="text-sm text-gray-500 text-center mb-4">
                  {plan.name === 'Pay-as-you-go' ? 'Per image' : 'Per month'}
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.name === 'Pay-as-you-go' && (
                  <div className="mb-6">
                    <label
                      htmlFor="paygQuantity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Number of Images
                    </label>
                    <input
                      id="paygQuantity"
                      type="number"
                      min="1"
                      value={paygQuantity}
                      onChange={(e) => setPaygQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={isLoading}
                      aria-describedby="payg-total"
                    />
                    <p id="payg-total" className="text-sm text-gray-500 mt-1">
                      Total: ₹{paygQuantity * 10}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => {
                    if (!plan.button.disabled) handleBuy(plan.button);
                  }}
                  disabled={plan.button.disabled || isLoading}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
                    plan.button.disabled || isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  }`}
                  aria-label={`Select ${plan.name} plan`}
                >
                  {isLoading && !plan.button.disabled ? 'Processing...' : plan.button.text}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-600">
              You currently have <span className="font-semibold text-indigo-600">{credits}</span> credits.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}