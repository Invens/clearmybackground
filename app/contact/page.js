"use client"
import Head from "next/head";
import Header from "@/components/header/page";



export default function Contact() {
  return (
    <html lang="en">
      <Head>
        <title>Contact Us | ClearMyBackground.com</title>
        <meta name="description" content="Get in touch with the ClearMyBackground.com team for inquiries, feedback, or support. Contact us via email, phone, or by using our contact form." />
        <meta name="keywords" content="contact us, get in touch, clear my background, background removal contact, image background removal support, clearmybackground.com contact, support contact" />
        <meta property="og:title" content="Contact Us | ClearMyBackground.com" />
        <meta property="og:description" content="Get in touch with the ClearMyBackground.com team for inquiries, feedback, or support. Contact us via email, phone, or by using our contact form." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clearmybackground.com/contact" />
        <meta property="og:image" content="https://clearmybackground.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | ClearMyBackground" />
        <meta name="twitter:description" content="Get in touch with the ClearMyBackground.com team for inquiries, feedback, or support. Contact us via email, phone, or by using our contact form." />
        <meta name="twitter:image" content="https://clearmybackground.com/logo.png" />
      </Head>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
          <Header />
          <header className="w-full bg-white shadow-md py-4 px-6 flex justify-center mt-4">
            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
          </header>

          <main className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-8">
            {/* Contact Information */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-gray-700 leading-relaxed">
                Have questions, feedback, or inquiries? We’d love to hear from you! Use the form below
                to reach out, or contact us directly at:
              </p>
              <ul className="mt-4 space-y-2">
                <li>
                  <span className="font-bold text-gray-800">Email:</span>{" "}
                  <a
                    href="mailto:info@appmontize.co.in"
                    className="text-blue-500 hover:underline"
                  >
                    info@appmontize.co.in
                  </a>
                </li>
                <li>
                  <span className="font-bold text-gray-800">Phone:</span>{" "}
                  <a href="tel:+6587654321" className="text-blue-500 hover:underline">
                    +65 8765 4321
                  </a>
                </li>
                <li>
                  <span className="font-bold text-gray-800">Address:</span> 123 Media Drive, Singapore
                </li>
              </ul>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  // Get form values
                  const name = e.target.name.value;
                  const email = e.target.email.value;
                  const message = e.target.message.value;

                  // Construct mailto link
                  const mailtoLink = `mailto:info@appmontize.co.in?subject=Message from ${encodeURIComponent(
                    name
                  )}&body=${encodeURIComponent(
                    `Email: ${email}\n\nMessage:\n${message}`
                  )}`;

                  // Open mailto link
                  window.location.href = mailtoLink;
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                    placeholder="Type your message here"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
