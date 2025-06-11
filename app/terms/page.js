
"use client";

import React from "react";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-cyan-900 flex flex-col items-center justify-center px-4 sm:px-6 py-12 font-inter">
        <main className="w-full max-w-4xl glass-effect p-8 rounded-3xl shadow-xl transition-all duration-300">
          <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
            Terms and Conditions
          </h1>
          <p className="text-gray-300 text-sm mb-4">
            Last Updated: May 11, 2025
          </p>
          <p className="text-gray-200 mb-6">
            These Terms and Conditions ("Terms") govern your use of the website and services provided by <strong>CYPHERNXT LABS LLP</strong> ("we", "us", "our"), whose registered office is located at H NO 81B, Village Meethapur, Badarpur, South Delhi, New Delhi, Delhi 110044, India. The terms "you", "your", "user", or "visitor" refer to any natural or legal person visiting our website and/or purchasing services from us. By accessing or using our website or services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">1. Service Description</h2>
            <p className="text-gray-200 mb-4">
              Our website provides an image background removal service ("Service"), allowing users to upload images and use our tools to remove or replace backgrounds. The Service may include free features with limited usage quotas and premium features requiring payment via Razorpay, our third-party payment gateway.
            </p>
            <p className="text-gray-200">
              We reserve the right to modify, suspend, or discontinue any part of the Service at our discretion without prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">2. Use of the Service</h2>
            <p className="text-gray-200 mb-4">
              By using the Service, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Upload images in supported formats (e.g., JPEG, PNG) and ensure they are of sufficient quality for processing.</li>
              <li>Not upload images that are illegal, obscene, offensive, or infringe on third-party rights.</li>
              <li>Comply with all applicable laws and regulations in India and your jurisdiction.</li>
              <li>Not attempt to reverse-engineer, hack, or interfere with the Service’s functionality.</li>
              <li>Maintain the confidentiality of your account credentials, if applicable.</li>
            </ul>
            <p className="text-gray-200 mt-4">
              Unauthorized use of the Service may result in termination of access and may give rise to a claim for damages and/or be a criminal offense.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">3. Payment Terms</h2>
            <p className="text-gray-200 mb-4">
              Premium features of the Service, such as advanced background removal or higher usage quotas, require payment. All payments are processed securely through Razorpay.
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>
                <strong>Payment Processing</strong>: Payments are subject to Razorpay’s terms of service, available at{" "}
                <a
                  href="https://razorpay.com/terms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  https://razorpay.com/terms/
                </a>. You agree to comply with Razorpay’s policies.
              </li>
              <li>
                <strong>Fees</strong>: You agree to pay the fees displayed at the time of purchase. All fees are in Indian Rupees (INR) unless otherwise specified and are non-refundable except as outlined in Section 4.
              </li>
              <li>
                <strong>Failed Transactions</strong>: We are not liable for any loss or damage arising from declined transactions due to exceeding card limits or other issues with your payment method, as determined by our acquiring bank or Razorpay.
              </li>
              <li>
                <strong>Payment Disputes</strong>: Disputes related to payments must be resolved through Razorpay’s dispute resolution process. We are not responsible for errors caused by Razorpay.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">4. Refund Policy</h2>
            <p className="text-gray-200 mb-4">
              Refunds for payments made through Razorpay are subject to the following:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Refunds may be requested within 7 days of payment if the Service fails to deliver the promised background removal functionality.</li>
              <li>Refund requests must be submitted via email to{" "}
                <a href="mailto:support@cyphernxtlabs.com" className="text-cyan-400 hover:underline">
                  support@cyphernxtlabs.com
                </a>, including your transaction ID and a detailed reason for the request.
              </li>
              <li>Approved refunds will be processed through Razorpay within 5-10 business days.</li>
              <li>No refunds will be issued for issues caused by user-uploaded images (e.g., low quality, unsupported formats) or user error.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-200 mb-4">
              All content, software, and technology on our website, including the design, layout, look, appearance, graphics, and background removal algorithms, are owned by or licensed to CYPHERNXT LABS LLP and are protected by copyright and other intellectual property laws.
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>
                <strong>User Content</strong>: You retain ownership of images you upload but grant us a non-exclusive, worldwide, royalty-free license to process, store, and use these images solely for providing the Service.
              </li>
              <li>
                <strong>Processed Images</strong>: You are responsible for ensuring you have the right to edit and use processed images. We do not claim ownership of processed images.
              </li>
              <li>
                <strong>Prohibited Use</strong>: Reproduction, distribution, or modification of our website’s content or technology is prohibited without our prior written consent.
              </li>
            </ul>
            <p className="text-gray-200 mt-4">
              All trademarks reproduced on our website that are not our property or licensed to us are acknowledged. Unauthorized use of our content may result in legal action.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">6. Third-Party Links and Services</h2>
            <p className="text-gray-200 mb-4">
              Our website may include links to third-party websites, such as Razorpay for payments or Pexels for background images. These links are provided for your convenience, and we do not endorse or control these websites.
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>We are not responsible for the content, accuracy, or practices of third-party websites.</li>
              <li>Your use of third-party services, including Razorpay, is subject to their respective terms and policies.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-200 mb-4">
              To the fullest extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>The Service is provided "as is" without warranties of any kind, express or implied, regarding accuracy, timeliness, performance, or suitability.</li>
              <li>We are not liable for any direct or indirect damages arising from the use or inability to use the Service, including issues with processed images, payment processing, or third-party services (e.g., Razorpay, Pexels).</li>
              <li>We are not responsible for inaccuracies or errors in information or materials on our website.</li>
            </ul>
            <p className="text-gray-200 mt-4">
              Your use of the Service is at your own risk, and it is your responsibility to ensure the Service meets your specific requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">8. User Responsibilities</h2>
            <p className="text-gray-200 mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Provide accurate and lawful information when using the Service.</li>
              <li>Not upload images containing illegal, obscene, or harmful content.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
              <li>Comply with these Terms and any applicable policies.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">9. Privacy</h2>
            <p className="text-gray-200">
              Your personal information and uploaded images are handled in accordance with our Privacy Policy. Please review our Privacy Policy for details on data collection, use, and protection.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">10. Termination</h2>
            <p className="text-gray-200 mb-4">
              We may suspend or terminate your access to the Service at our discretion, including for:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Violation of these Terms.</li>
              <li>Non-payment of fees owed.</li>
              <li>Abuse or misuse of the Service.</li>
            </ul>
            <p className="text-gray-200">
              Upon termination, you must cease using the Service, and any processed images may no longer be accessible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">11. Governing Law and Dispute Resolution</h2>
            <p className="text-gray-200">
              These Terms are governed by the laws of India. Any disputes arising from the use of our website or services will be resolved exclusively in the courts of New Delhi, India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-200">
              We may update these Terms at our sole discretion. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the Service after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">13. Contact Information</h2>
            <p className="text-gray-200">
              For questions or concerns about these Terms, please contact us at:
              <br />
              Email: <a href="mailto:support@cyphernxtlabs.com" className="text-cyan-400 hover:underline">support@cyphernxtlabs.com</a>
              <br />
              Address: H NO 81B, Village Meethapur, Badarpur, South Delhi, New Delhi, Delhi 110044, India
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">14. Disclaimer</h2>
            <p className="text-gray-200">
              The content of these Terms is created at CYPHERNXT LABS LLP’s sole discretion. Razorpay shall not be liable for any content provided herein and shall not be responsible for any claims or liability arising due to non-adherence to these Terms.
            </p>
          </section>
        </main>
      </div>
      <Footer />
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
