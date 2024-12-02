import Header from "@/components/header/page"

export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <Header/>
        <header className="w-full bg-white shadow-md py-4 px-6 flex justify-center mt-4">
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        </header>
  
        <main className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-8">
          {/* Last Updated */}
          <section className="mb-6">
            <p className="text-gray-700">
              <span className="font-bold">Last updated:</span> 01 December 2024
            </p>
          </section>
  
          {/* Intro Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Before we get into the details…</h2>
            <p className="text-gray-700 leading-relaxed">
              If you’re wondering what happens to your files when you upload them, here’s the simple
              answer: We upload them securely, process them as expected, provide the results for
              download, and delete them shortly after. That’s it.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We don’t publish your files, we don’t share them with anyone unexpected, and we don’t
              use them to improve our products unless you explicitly send them to our team as
              feedback.
            </p>
          </section>
  
          {/* Who We Are */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              We are <span className="font-bold">Appmontize Media</span>, and this privacy policy
              applies to our website <span className="font-bold">ClearMyBackground.com</span>
              (referred to as the “Service” or “Services”).
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you have any questions, suggestions, or concerns about your data or this privacy
              policy, please contact us at{" "}
              <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:underline">
                info@appmontize.co.in
              </a>
              .
            </p>
          </section>
  
          {/* Data Processing */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. How We Process Your Data</h2>
            <h3 className="text-lg font-medium text-gray-800">1.1 Information You Provide Us</h3>
            <p className="text-gray-700 leading-relaxed mt-2">
              We may ask for your name, email address, and feedback to provide better services. If you
              don’t provide your data, some features of the Service may not work as intended.
            </p>
            <h3 className="text-lg font-medium text-gray-800 mt-4">1.2 Information We Collect</h3>
            <p className="text-gray-700 leading-relaxed mt-2">
              We collect data such as your IP address, browser type, and usage patterns to improve our
              Services.
            </p>
            <h3 className="text-lg font-medium text-gray-800 mt-4">1.3 Cookies and Similar Technologies</h3>
            <p className="text-gray-700 leading-relaxed mt-2">
              We use cookies to enhance your experience. You can manage cookies through your browser
              settings. For more details, contact us at{" "}
              <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:underline">
                info@appmontize.co.in
              </a>
              .
            </p>
          </section>
  
          {/* Sharing Data */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Sharing Your Data</h2>
            <p className="text-gray-700 leading-relaxed">
              We may share your data with service providers to improve our Services or as required by
              law. Your data will never be sold or shared without your consent.
            </p>
          </section>
  
          {/* Retention */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Retention of Personal Data</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain personal data as long as necessary to provide the Service or comply with
              applicable laws. When no longer needed, your data will be securely deleted.
            </p>
          </section>
  
          {/* Your Rights */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, correct, or delete your data. You can also opt-out of
              marketing communications. To exercise your rights, contact us at{" "}
              <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:underline">
                info@appmontize.co.in
              </a>
              .
            </p>
          </section>
  
          {/* Contact Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. How to Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this policy or your data, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="font-bold text-gray-800">Email:</span>{" "}
                <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:underline">
                  info@appmontize.co.in
                </a>
              </li>
              <li>
                <span className="font-bold text-gray-800">Address:</span> 1 Innovation Drive, Singapore
              </li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
  