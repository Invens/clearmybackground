import Header from "@/components/header/page";

export const metadata = {
  title: "Privacy Policy | ClearMyBackground",
  description:
    "Learn about our privacy practices at ClearMyBackground. Understand how we securely process your data with our AI background remover, ensure its safety, and respect your rights.",
  keywords:
    "privacy policy, AI background remover privacy, data processing, user data rights, cookies policy, clear my background, clearmybackground.com privacy, data protection, online tool privacy policy, secure image processing, free background removal privacy",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Privacy Policy | ClearMyBackground",
    description:
      "Discover how ClearMyBackground handles your data securely with our free AI background remover tool. Your privacy matters to us.",
    url: "https://clearmybackground.com/privacy", // Replace with your domain
    type: "website",
    images: [
      {
        url: "https://clearmybackground.com/logo.png", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "ClearMyBackground Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | ClearMyBackground",
    description:
      "Learn how we protect your data with our AI background remover at ClearMyBackground. Secure, free, and transparent.",
    image: "https://clearmybackground.com/logo.png", // Replace with actual image
  },
};

export default function PrivacyPolicy() {
  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://clearmybackground.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: "https://clearmybackground.com/privacy",
      },
    ],
  };

  return (
    <>
      {/* SEO Head Tags */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content={metadata.viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://clearmybackground.com/privacy" />
        <title>{metadata.title}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 flex flex-col items-center relative overflow-hidden mt-20">
        {/* Subtle Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e90ff_0,rgba(0,0,0,0.9)_75%)] opacity-10 pointer-events-none"></div>

        <Header />

        {/* Header Section */}
        <header className="w-full py-6 px-6 flex justify-center mt-4 z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Privacy Policy
          </h1>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-8 mt-8 z-10">
          {/* Last Updated */}
          <section className="mb-8">
            <p className="text-gray-400">
              <span className="font-bold text-blue-400">Last updated:</span> 01 December 2024
            </p>
          </section>

          {/* Intro Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 shadow-glow">Before We Get Into the Details…</h2>
            <p className="text-gray-300 leading-relaxed">
              If you’re wondering what happens to your files when you use our AI background remover, here’s the simple answer: We upload them securely, process them to remove backgrounds, provide the full-resolution results for download, and delete them shortly after. That’s it.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              We don’t publish your files, share them with third parties unexpectedly, or use them to train our AI unless you explicitly send them as feedback to improve our free online tool.
            </p>
          </section>

          {/* Who We Are */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 shadow-glow">Who We Are</h2>
            <p className="text-gray-300 leading-relaxed">
              We are <span className="font-bold text-purple-400">Appmontize Media</span>, the creators of <span className="font-bold text-purple-400">ClearMyBackground.com</span>, a free AI-powered tool for secure background removal.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Have questions about our privacy practices or your data? Reach out to us at{" "}
              <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:text-blue-300 transition-colors duration-300">
                info@appmontize.co.in
              </a>.
            </p>
          </section>

          {/* Data Processing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 shadow-glow">1. How We Process Your Data</h2>
            <h3 className="text-lg font-medium text-purple-400 mt-4">1.1 Information You Provide Us</h3>
            <p className="text-gray-300 leading-relaxed mt-2">
              When using our AI background remover, we may ask for your name, email address, or feedback to enhance your experience. Without this data, some features may not function optimally.
            </p>
            <h3 className="text-lg font-medium text-purple-400 mt-4">1.2 Information We Collect</h3>
            <p className="text-gray-300 leading-relaxed mt-2">
              We collect minimal data like your IP address, browser type, and usage patterns to improve our secure image processing services.
            </p>
            <h3 className="text-lg font-medium text-purple-400 mt-4">1.3 Cookies and Similar Technologies</h3>
            <p className="text-gray-300 leading-relaxed mt-2">
              We use cookies to optimize your experience with our online tool. Manage them via your browser settings or contact us at{" "}
              <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:text-blue-300 transition-colors duration-300">
                info@appmontize.co.in
              </a> for details.
            </p>
          </section>

          {/* Sharing Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 shadow-glow">2. Sharing Your Data</h2>
            <p className="text-gray-300 leading-relaxed">
              We may share data with trusted service providers to support our AI background remover or as required by law. Your data is never sold or shared without your explicit consent.
            </p>
          </section>

          {/* Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 shadow-glow">3. Retention of Personal Data</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your data only as long as necessary to deliver our free background removal service or comply with legal obligations. Once unneeded, it’s securely deleted.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 shadow-glow">4. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              You can access, correct, or delete your data, and opt-out of marketing emails. Exercise your rights by contacting us at{" "}
              <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:text-blue-300 transition-colors duration-300">
                info@appmontize.co.in
              </a>.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 shadow-glow">5. How to Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              Questions about this privacy policy or our secure data practices? Reach out to us:
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>
                <span className="font-bold text-purple-400">Email:</span>{" "}
                <a href="mailto:info@appmontize.co.in" className="text-blue-500 hover:text-blue-300 transition-colors duration-300">
                  info@appmontize.co.in
                </a>
              </li>
              <li>
                <span className="font-bold text-purple-400">Address:</span> 1 Innovation Drive, Singapore
              </li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}