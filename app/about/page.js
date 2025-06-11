import Header from "@/components/header/page";
import Link from "next/link";
export const metadata = {
  title: "About Us | cleanmybg.com",
  description:
    "Learn about cleanmybg.com, our mission, team, and commitment to building tools that simplify lives. Meet the innovators behind the scenes.",
  keywords: [
    "about us",
    "ai background remover",
    "cleanmybg",
    "Appmontize Media",
    "team behind cleanmybg",
    "our mission",
    "tech innovations",
    "about cleanmybg.com",
    "background removal tool team",
  ].join(", "),
};

export default function About() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cleanmybg.com/about" />
        <meta property="og:image" content="https://cleanmybg.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://cleanmybg.com/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://cleanmybg.com/about" />
        <title>{metadata.title}</title>
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
          <Header />
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-cyan-900 flex flex-col items-center justify-center px-4 sm:px-6 py-12 font-inter">
        <main className="w-full max-w-4xl glass-effect p-8 rounded-3xl shadow-xl transition-all duration-300 mt-24">
          <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
            About CleanMyBg
          </h1>
          <p className="text-gray-200 text-lg mb-6 text-center">
            Simplifying Image Editing with Cutting-Edge Technology
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Who We Are</h2>
            <p className="text-gray-200 mb-4">
              Welcome to <strong>CleanMyBg</strong>, your go-to platform for effortless image background removal. We are a proud product of <strong>CYPHERNXT LABS LLP</strong>, an innovative technology company based in New Delhi, India. At CleanMyBg, we empower creators, businesses, and individuals to transform their images with ease, delivering professional-grade results in just a few clicks.
            </p>
            <p className="text-gray-200">
              Founded under the vision of CYPHERNXT LABS LLP, CleanMyBg combines advanced AI-driven algorithms with a user-friendly interface to make image editing accessible to everyone. Whether you’re enhancing product photos, creating stunning visuals, or simply removing unwanted backgrounds, we’re here to streamline your creative process.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Our Mission</h2>
            <p className="text-gray-200">
              Our mission is to democratize image editing by providing a fast, reliable, and affordable solution for background removal. We aim to remove the complexity from photo editing, enabling users of all skill levels to achieve flawless results without expensive software or technical expertise.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Our Vision</h2>
            <p className="text-gray-200">
              We envision a world where creativity knows no bounds. CleanMyBg strives to be the leading platform for image enhancement, empowering users worldwide to bring their ideas to life with professional-quality visuals. Under CYPHERNXT LABS LLP’s commitment to innovation, we are continuously evolving to meet the needs of our global community.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Why Choose CleanMyBg?</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li><strong>AI-Powered Precision</strong>: Our advanced algorithms ensure accurate and seamless background removal.</li>
              <li><strong>User-Friendly Interface</strong>: Designed for simplicity, making editing effortless for beginners and professionals alike.</li>
              <li><strong>Secure Payments</strong>: Powered by Razorpay, our payment gateway ensures safe and reliable transactions.</li>
              <li><strong>Fast Results</strong>: Process images in seconds, saving you time and effort.</li>
              <li><strong>Global Reach</strong>: Backed by CYPHERNXT LABS LLP’s expertise, we serve users across the globe.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">About CYPHERNXT LABS LLP</h2>
            <p className="text-gray-200 mb-4">
              CYPHERNXT LABS LLP is a technology-driven company headquartered in New Delhi, India, dedicated to creating innovative solutions that simplify complex challenges. With a focus on artificial intelligence and user-centric design, CYPHERNXT LABS LLP develops products like CleanMyBg to empower individuals and businesses worldwide.
            </p>
            <p className="text-gray-200">
              Registered Office: H NO 81B, Village Meethapur, Badarpur, South Delhi, New Delhi, Delhi 110044, India
            </p>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Get Started Today</h2>
            <p className="text-gray-200 mb-6">
              Ready to transform your images? Join thousands of users who trust CleanMyBg for their editing needs.
            </p>
            <Link href="/upload" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 glow-hover">
           
                Try CleanMyBg Now
             
            </Link>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Contact Us</h2>
            <p className="text-gray-200">
              Have questions or need support? Reach out to our team at:
              <br />
              Email: <a href="mailto:support@cleanmybg.com" className="text-cyan-400 hover:underline">support@cleanmybg.com</a>
              <br />
              Address: H NO 81B, Village Meethapur, Badarpur, South Delhi, New Delhi, Delhi 110044, India
            </p>
          </section>
        </main>
      </div>
        </div>
      </body>
    </html>
  );
}
