
"use client";

import React from "react";
import Head from "next/head";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | CleanMyBg</title>
        <meta
          name="description"
          content="Learn how CleanMyBg, a product of CYPHERNXT LABS LLP, collects, uses, and protects your personal information and uploaded images in our Privacy Policy."
        />
        <meta
          name="keywords"
          content="cleanmybg privacy policy, background removal privacy, image editing privacy, CYPHERNXT LABS privacy, data protection cleanmybg, privacy policy image background removal"
        />
        <meta property="og:title" content="Privacy Policy | CleanMyBg" />
        <meta
          property="og:description"
          content="Learn how CleanMyBg, a product of CYPHERNXT LABS LLP, collects, uses, and protects your personal information and uploaded images in our Privacy Policy."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cleanmybg.com/privacy-policy" />
        <meta property="og:image" content="https://cleanmybg.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | CleanMyBg" />
        <meta
          name="twitter:description"
          content="Learn how CleanMyBg, a product of CYPHERNXT LABS LLP, collects, uses, and protects your personal information and uploaded images in our Privacy Policy."
        />
        <meta name="twitter:image" content="https://cleanmybg.com/logo.png" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-cyan-900 flex flex-col items-center justify-center px-4 sm:px-6 py-12 font-inter">
        <Header />
        <main className="w-full max-w-4xl glass-effect p-8 rounded-3xl shadow-xl transition-all duration-300 mt-4">
          <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-sm mb-4">
            Last Updated: June 11, 2025
          </p>
          <p className="text-gray-200 mb-6">
            At <strong>CleanMyBg</strong>, a product of <strong>CYPHERNXT LABS LLP</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information and uploaded images when you use our website and image background removal services (“Service”). By using our Service, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Service.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">1. Information We Collect</h2>
            <p className="text-gray-200 mb-4">
              We collect the following types of information to provide and improve our Service:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>
                <strong>Personal Information</strong>: Information you provide, such as your name, email address, and phone number, when you contact us, create an account, or use our contact form.
              </li>
              <li>
                <strong>Payment Information</strong>: When you purchase premium features, payment details (e.g., card information) are collected and processed securely by our third-party payment gateway, Razorpay. We do not store your payment details.
              </li>
              <li>
                <strong>Uploaded Images</strong>: Images you upload for background removal are processed and temporarily stored to provide the Service.
              </li>
              <li>
                <strong>Usage Data</strong>: Information about how you interact with our Service, such as IP address, browser type, device information, pages visited, and timestamps, collected automatically via cookies and analytics tools.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-200 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>To provide and maintain the Service, including processing uploaded images for background removal.</li>
              <li>To process payments for premium features via Razorpay.</li>
              <li>To communicate with you, including responding to inquiries and providing support.</li>
              <li>To improve our Service, such as analyzing usage patterns and enhancing functionality.</li>
              <li>To send promotional emails or updates about CleanMyBg (you can opt out at any time).</li>
              <li>To comply with legal obligations or protect our rights.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">3. How We Share Your Information</h2>
            <p className="text-gray-200 mb-4">
              We do not sell or rent your personal information to third parties. We may share your information in the following cases:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>
                <strong>With Service Providers</strong>: We share data with trusted third parties, such as Razorpay for payment processing and analytics providers, who are bound by confidentiality obligations.
              </li>
              <li>
                <strong>For Legal Purposes</strong>: We may disclose information to comply with legal requirements, respond to court orders, or protect our rights, property, or safety.
              </li>
              <li>
                <strong>With Your Consent</strong>: We may share information with other parties if you explicitly consent.
              </li>
            </ul>
            <p className="text-gray-200 mt-4">
              Razorpay’s handling of payment data is governed by their privacy policy, available at{" "}
              <a
                href="https://razorpay.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                https://razorpay.com/privacy/
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-200 mb-4">
              We use cookies and similar technologies to enhance your experience and analyze usage. Cookies are small files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Remember your preferences and settings.</li>
              <li>Track usage patterns to improve our Service.</li>
              <li>Deliver personalized content.</li>
            </ul>
            <p className="text-gray-200 mt-4">
              You can manage cookie preferences through your browser settings. Disabling cookies may affect the functionality of our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">5. Data Security</h2>
            <p className="text-gray-200">
              We implement reasonable technical and organizational measures to protect your personal information and uploaded images from unauthorized access, loss, or alteration. However, no online transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">6. Data Retention</h2>
            <p className="text-gray-200">
              We retain your personal information and uploaded images only for as long as necessary to provide the Service, fulfill legal obligations, or resolve disputes. Uploaded images are typically deleted after processing, unless required for ongoing service or legal purposes. Payment data is managed by Razorpay and not stored by us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">7. Your Rights</h2>
            <p className="text-gray-200 mb-4">
              Depending on your jurisdiction, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>
                <strong>Access</strong>: Request a copy of the personal information we hold about you.
              </li>
              <li>
                <strong>Correction</strong>: Request corrections to inaccurate or incomplete data.
              </li>
              <li>
                <strong>Deletion</strong>: Request deletion of your personal information, subject to legal obligations.
              </li>
              <li>
                <strong>Opt-Out</strong>: Unsubscribe from promotional emails or opt out of non-essential data processing.
              </li>
            </ul>
            <p className="text-gray-200 mt-4">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:support@cleanmybg.com"
                className="text-cyan-400 hover:underline"
              >
                support@cleanmybg.com
              </a>. We will respond within a reasonable timeframe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-200">
              Our Service may contain links to third-party websites, such as Razorpay or Pexels (used for background images). We are not responsible for the privacy practices or content of these websites. Please review their privacy policies before providing information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">9. Children’s Privacy</h2>
            <p className="text-gray-200">
              Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of such data, we will take steps to delete it. Contact us if you believe we have collected information from a child.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-200">
              Your information may be processed in servers located outside India, including by third-party providers like Razorpay. We ensure such transfers comply with applicable data protection laws, using appropriate safeguards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-200">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated “Last Updated” date. Continued use of the Service after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">12. Contact Us</h2>
            <p className="text-gray-200">
              For questions or concerns about this Privacy Policy or our data practices, please contact us at:
              <br />
              Email: <a href="mailto:support@cleanmybg.com" className="text-cyan-400 hover:underline">support@cleanmybg.com</a>
              <br />
              Address: H NO 81B, Village Meethapur, Badarpur, South Delhi, New Delhi, Delhi 110044, India
            </p>
          </section>
        </main>
        <Footer />
      </div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");
        .font-inter {
          font-family: "Inter", sans-serif;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}