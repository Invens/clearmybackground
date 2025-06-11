
"use client";

import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Link from "next/link";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | CleanMyBg</title>
        <meta
          name="description"
          content="Contact CleanMyBg for support, inquiries, or feedback about our image background removal service. Reach us via email, phone, or our contact form."
        />
        <meta
          name="keywords"
          content="contact cleanmybg, background removal support, image editing contact, cleanmybg support, CYPHERNXT LABS contact, image background removal, cleanmybg.com contact"
        />
        <meta property="og:title" content="Contact Us | CleanMyBg" />
        <meta
          property="og:description"
          content="Contact CleanMyBg for support, inquiries, or feedback about our image background removal service. Reach us via email, phone, or our contact form."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cleanmybg.com/contact" />
        <meta property="og:image" content="https://cleanmybg.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | CleanMyBg" />
        <meta
          name="twitter:description"
          content="Contact CleanMyBg for support, inquiries, or feedback about our image background removal service. Reach us via email, phone, or our contact form."
        />
        <meta name="twitter:image" content="https://cleanmybg.com/logo.png" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-cyan-900 flex flex-col items-center justify-center px-4 sm:px-6 py-12 font-inter">
        <Header />
        <main className="w-full max-w-4xl glass-effect p-8 rounded-3xl shadow-xl transition-all duration-300 mt-12">
          <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-gray-200 text-lg mb-8 text-center">
            We’re here to help! Whether you have questions about CleanMyBg’s image background removal service, need support, or want to share feedback, reach out to us anytime.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <section className="text-gray-200">
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">
                Get in Touch
              </h2>
              <p className="mb-4">
                Our team at CleanMyBg, a product of CYPHERNXT LABS LLP, is dedicated to providing exceptional support. Contact us via:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@cleanmybg.com"
                    className="text-cyan-400 hover:underline"
                  >
                    support@cleanmybg.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+911234567890" className="text-cyan-400 hover:underline">
                    +91 123-456-7890
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> H NO 81B, Village Meethapur, Badarpur,
                  South Delhi, New Delhi, Delhi 110044, India
                </li>
              </ul>
              <p className="mt-6">
                Follow us on{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  Twitter
                </a>{" "}
                and{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  LinkedIn
                </a>{" "}
                for updates and tips!
              </p>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-200 text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-900 text-gray-200 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                    placeholder="Your Name"
                    required
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-200 text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-900 text-gray-200 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                    placeholder="Your Email"
                    required
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-200 text-sm font-medium mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="_subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-900 text-gray-200 border ${
                      errors.subject ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                    placeholder="Subject"
                    required
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-200 text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 bg-gray-900 text-gray-200 border ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 resize-y`}
                    rows="5"
                    placeholder="Your Message"
                    required
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {submitStatus === "success" && (
                  <p className="text-green-500 text-sm">
                    Message sent successfully! We’ll get back to you soon.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm">
                    Failed to send message. Please try again later.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 glow-hover ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </section>
          </div>
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
        .glow-hover:hover {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
        }
      `}</style>
    </>
  );
}