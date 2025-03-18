"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/page";
import Section2 from "@/components/homeSection/section2";
import Footer from "@/components/footer/page";
import "react-before-after-slider-component/dist/build.css";
import Head from "next/head";

export default function Homepage() {
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setError("Select an image file.");
      return;
    }
    setError("");
    const imageUrl = URL.createObjectURL(selectedFile);
    router.push(`/result?imageUrl=${encodeURIComponent(imageUrl)}`);
  };

  // Drag-and-drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const selectedFile = event.dataTransfer.files[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setError("Drop a valid image.");
      return;
    }
    setError("");
    const imageUrl = URL.createObjectURL(selectedFile);
    router.push(`/result?imageUrl=${encodeURIComponent(imageUrl)}`);
  };

  // Water simulation effect
  useEffect(() => {
    const canvas = document.getElementById("waterCanvas");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let ripples = [];

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);

    const createRipple = (x, y) => {
      ripples.push({ x, y, radius: 0, opacity: 1 });
    };

    document.addEventListener("mousemove", (e) => {
      createRipple(e.clientX, e.clientY);
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(30, 144, 255, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ripple.radius += 2;
        ripple.opacity -= 0.02;

        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", createRipple);
    };
  }, []);

  // FAQ Schema Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an AI background remover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An AI background remover uses artificial intelligence to automatically detect and remove backgrounds from images, leaving you with a transparent PNG.",
        },
      },
      {
        "@type": "Question",
        name: "Is ClearMyBackground really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our tool is 100% free to use with no limits or subscriptions required.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use it for commercial projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. The transparent images you create are yours to use for e-commerce, design, or any other purpose.",
        },
      },
      {
        "@type": "Question",
        name: "What file types are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support all common image formats, including JPG, PNG, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Does it preserve full resolution without quality loss?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ClearMyBackground provides full-resolution images with no quality loss, completely free of charge.",
        },
      },
    ],
  };

  return (
    <>
      {/* SEO Meta Tags and FAQ Schema */}
      <Head>
        <title>AI Background Remover - Free Online Tool | ClearMyBackground</title>
        <meta
          name="description"
          content="Remove backgrounds from images instantly with our free AI background remover. Create full-resolution transparent backgrounds online effortlessly for e-commerce, design, and more."
        />
        <meta
          name="keywords"
          content="AI background remover, remove background with ai,remove background online, free background removal, transparent background maker, AI image editor, remove bg free, background eraser, full resolution transparent PNG"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="AI Background Remover - Free Online Tool" />
        <meta
          property="og:description"
          content="Easily remove backgrounds with our AI-powered tool. Free, fast, and perfect for creating full-resolution transparent PNGs online."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:image" content="/og-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div
        className="bg-black text-white flex flex-col items-center relative overflow-hidden"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Water Simulation Canvas */}
        <canvas
          id="waterCanvas"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        ></canvas>

        {/* Drag Overlay */}
        {isDragging && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 border-4 border-dashed border-blue-500 animate-pulse">
            <p className="text-4xl font-bold text-blue-400 tracking-wider">
              DROP IMAGE
            </p>
          </div>
        )}

        <Header />

        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center w-full max-w-2xl mt-20 px-6 z-10">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient mb-8">
            AI Background Remover
          </h1>
          <p className="text-lg text-gray-300 mb-6 text-center">
            Remove backgrounds from images online with our free AI-powered tool. Create full-resolution transparent PNGs instantly.
          </p>

          {/* Upload Area */}
          <div className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">
              Free Background Removal Made Easy
            </h2>
            <div
              className="border-2 border-dashed border-blue-600 p-6 rounded-lg text-center hover:bg-blue-900 hover:bg-opacity-20 transition-colors duration-200"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className="text-lg text-gray-300">Drag & Drop Your Image Here</p>
            </div>

            <label
              htmlFor="fileInput"
              className="mt-6 block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-medium tracking-wide cursor-pointer hover:from-blue-600 hover:to-purple-700 hover:shadow-glow transition-all duration-300"
            >
              Upload Image
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload image to remove background with AI"
            />

            {error && (
              <p className="text-red-400 mt-4 text-center animate-fadeIn">
                {error}
              </p>
            )}
          </div>

          {/* Example Images */}
          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">
              Try Our AI Background Eraser with Examples
            </h2>
            <p className="text-gray-400 mb-4">
              Test our transparent background maker with these sample images.
            </p>
            <div className="flex justify-center gap-4">
              {[
                {
                  src: "/remove-background-from-image-example1.jpg",
                  alt: "Example 1: AI-removed background image for e-commerce",
                },
                {
                  src: "/remove-background-from-image-example2.jpg",
                  alt: "Example 2: Transparent PNG created with AI background remover",
                },
                {
                  src: "/remove-background-from-image-example3.jpg",
                  alt: "Example 3: Free background removal for design projects",
                },
              ].map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-700 hover:border-blue-500 hover:scale-110 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    const imageUrl = window.location.origin + item.src;
                    router.push(`/result?imageUrl=${encodeURIComponent(imageUrl)}`);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 w-full max-w-4xl px-6 z-10">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
            How Our AI Background Remover Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">1. Upload</h3>
              <p className="text-gray-300">
                Drag and drop or upload your image to our free tool.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">2. Process</h3>
              <p className="text-gray-300">
                Our AI instantly analyzes and removes the background.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">3. Download</h3>
              <p className="text-gray-300">
                Get your full-resolution transparent PNG at no cost.
              </p>
            </div>
          </div>
        </section>

        <Section2 />

        {/* Why Choose Us Section */}
        <section className="py-16 w-full max-w-4xl px-6 z-10">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Why Choose ClearMyBackground?
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-300">AI-Powered Precision</h3>
                <p className="text-gray-400">
                  Our advanced AI ensures accurate background removal, even with complex images.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Completely Free</h3>
                <p className="text-gray-400">
                  No hidden fees—enjoy unlimited background removal at no cost.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Full Resolution Quality</h3>
                <p className="text-gray-400">
                  Get high-quality, full-resolution images without any loss, completely free.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Fast & Easy</h3>
                <p className="text-gray-400">
                  Create transparent backgrounds in seconds with a simple upload.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 w-full max-w-4xl px-6 z-10">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-300">
                What is an AI background remover?
              </h3>
              <p className="text-gray-400">
                An AI background remover uses artificial intelligence to automatically detect and remove backgrounds from images, leaving you with a transparent PNG.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-300">
                Is ClearMyBackground really free?
              </h3>
              <p className="text-gray-400">
                Yes! Our tool is 100% free to use with no limits or subscriptions required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-300">
                Can I use it for commercial projects?
              </h3>
              <p className="text-gray-400">
                Absolutely. The transparent images you create are yours to use for e-commerce, design, or any other purpose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-300">
                What file types are supported?
              </h3>
              <p className="text-gray-400">
                We support all common image formats, including JPG, PNG, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-300">
                Does it preserve full resolution without quality loss?
              </h3>
              <p className="text-gray-400">
                Yes, ClearMyBackground provides full-resolution images with no quality loss, completely free of charge.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}