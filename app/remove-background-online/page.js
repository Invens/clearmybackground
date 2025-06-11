"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/page";
import Section2 from "@/components/homeSection/section2";
import Footer from "@/components/footer/page";
import "react-before-after-slider-component/dist/build.css";
import Head from "next/head";
import axios from "axios";

export default function Homepage() {
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [exampleImages, setExampleImages] = useState([]);
  const router = useRouter();
  const starCanvasRef = useRef(null);

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

  // Fetch example images from Pexels
  useEffect(() => {
    const fetchPexelsImages = async () => {
      const queries = ["dog", "zebra", "human"];
      const images = [];
      try {
        for (const query of queries) {
          const response = await axios.get("https://api.pexels.com/v1/search", {
            headers: {
              Authorization: "8clDBhjUV7XYRmTMpMLOPewgEzQk9YQa4pceuN1lm4KaFRYxRFlm4rpR",
            },
            params: {
              query,
              per_page: 1,
            },
          });
          if (response.data.photos.length > 0) {
            images.push({
              src: response.data.photos[0].src.large,
              alt: `Example: ${query} image with AI-removed background`,
            });
          }
        }
        setExampleImages(images);
      } catch (error) {
        console.error("Pexels API error:", error);
      }
    };
    fetchPexelsImages();
  }, []);

  // Starfield, Shooting Stars, and Comets Animation
  useEffect(() => {
    const starCanvas = starCanvasRef.current;
    const starCtx = starCanvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    starCanvas.width = width;
    starCanvas.height = height;

    const stars = [];
    const shootingStars = [];
    const comets = [];
    const starCount = 150;
    const centerRadius = 300;

    // Static Star
    class Star {
      constructor() {
        let x, y, dist;
        do {
          x = Math.random() * width;
          y = Math.random() * height;
          dist = Math.hypot(x - width / 2, y - height / 2);
        } while (dist < centerRadius);
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.phase = Math.random() * Math.PI * 2;
      }

      draw(time) {
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity * (0.5 + 0.5 * Math.sin(time * 0.001 + this.phase))})`;
        starCtx.fill();
      }
    }

    // Shooting Star
    class ShootingStar {
      constructor() {
        // Start at a random edge (left, top, or right)
        const edge = Math.floor(Math.random() * 3);
        if (edge === 0) { // Left
          this.x = 0;
          this.y = Math.random() * height;
        } else if (edge === 1) { // Top
          this.x = Math.random() * width;
          this.y = 0;
        } else { // Right
          this.x = width;
          this.y = Math.random() * height;
        }
        // Random angle (30-60°) converted to radians
        const angle = (Math.random() * 30 + 30) * Math.PI / 180;
        this.vx = Math.cos(angle) * (Math.random() * 5 + 10); // Speed: 10-15px/frame
        this.vy = Math.sin(angle) * (Math.random() * 5 + 10);
        if (edge === 0) { // Left: move right
          this.vx = Math.abs(this.vx);
        } else if (edge === 2) { // Right: move left
          this.vx = -Math.abs(this.vx);
        }
        this.radius = Math.random() * 1 + 1; // 1-2px
        this.lifetime = Math.random() * 30 + 30; // 30-60 frames (~0.5-1s)
        this.age = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.age++;
      }

      draw() {
        // Draw a line with a gradient tail
        const tailLength = 20;
        const gradient = starCtx.createLinearGradient(
          this.x, this.y,
          this.x - this.vx * tailLength / 15, this.y - this.vy * tailLength / 15
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - this.age / this.lifetime})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        starCtx.beginPath();
        starCtx.moveTo(this.x, this.y);
        starCtx.lineTo(this.x - this.vx * tailLength / 15, this.y - this.vy * tailLength / 15);
        starCtx.strokeStyle = gradient;
        starCtx.lineWidth = 1;
        starCtx.stroke();
      }
    }

    // Comet
    class Comet {
      constructor() {
        // Start at a random edge (left or top)
        const edge = Math.floor(Math.random() * 2);
        if (edge === 0) { // Left
          this.x = 0;
          this.y = Math.random() * height;
        } else { // Top
          this.x = Math.random() * width;
          this.y = 0;
        }
        // Random angle (0-90°) converted to radians
        const angle = Math.random() * 90 * Math.PI / 180;
        this.vx = Math.cos(angle) * (Math.random() * 3 + 5); // Speed: 5-8px/frame
        this.vy = Math.sin(angle) * (Math.random() * 3 + 5);
        if (edge === 0) { // Left: move right
          this.vx = Math.abs(this.vx);
        }
        this.radius = Math.random() * 2 + 2; // 2-4px
        this.lifetime = Math.random() * 60 + 60; // 60-120 frames (~1-2s)
        this.age = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.age++;
      }

      draw() {
        // Draw head
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(200, 200, 255, ${1 - this.age / this.lifetime})`;
        starCtx.fill();
        // Draw tail
        const tailLength = 40;
        const gradient = starCtx.createLinearGradient(
          this.x, this.y,
          this.x - this.vx * tailLength / 8, this.y - this.vy * tailLength / 8
        );
        gradient.addColorStop(0, `rgba(200, 200, 255, ${0.8 * (1 - this.age / this.lifetime)})`);
        gradient.addColorStop(1, `rgba(200, 200, 255, 0)`);
        starCtx.beginPath();
        starCtx.moveTo(this.x, this.y);
        starCtx.lineTo(this.x - this.vx * tailLength / 8, this.y - this.vy * tailLength / 8);
        starCtx.strokeStyle = gradient;
        starCtx.lineWidth = 3;
        starCtx.stroke();
      }
    }

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Resize handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      starCanvas.width = width;
      starCanvas.height = height;
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
      // Clear shooting stars and comets on resize
      shootingStars.length = 0;
      comets.length = 0;
    };
    window.addEventListener("resize", resize);

    // Animation loop
    const render = () => {
      starCtx.clearRect(0, 0, width, height);

      // Draw static stars
      stars.forEach((star) => star.draw(performance.now()));

      // Spawn shooting stars (2% chance)
      if (Math.random() < 0.02 && shootingStars.length < 2) {
        shootingStars.push(new ShootingStar());
      }
      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.update();
        ss.draw();
        if (ss.age > ss.lifetime || ss.x < 0 || ss.x > width || ss.y < 0 || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      // Spawn comets (1% chance)
      if (Math.random() < 0.01 && comets.length < 1) {
        comets.push(new Comet());
      }
      // Update and draw comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.update();
        comet.draw();
        if (comet.age > comet.lifetime || comet.x < 0 || comet.x > width || comet.y < 0 || comet.y > height) {
          comets.splice(i, 1);
        }
      }

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
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
        name: "Is cleanmybg really free?",
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
          text: "Yes, cleanmybg provides full-resolution images with no quality loss, completely free of charge.",
        },
      },
    ],
  };

  return (
    <>
      {/* SEO Meta Tags and FAQ Schema */}
      <Head>
        <title>AI Background Remover - Free Online Tool | cleanmybg</title>
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
        className="bg-black text-white flex flex-col items-center relative overflow-hidden font-inter"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Starfield Canvas */}
        <canvas
          ref={starCanvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        ></canvas>

        {/* Drag Overlay */}
        {isDragging && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 border-4 border-dashed border-blue-600">
            <p className="text-4xl font-semibold text-white tracking-wide">
              DROP IMAGE
            </p>
          </div>
        )}

        <Header />

        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center w-full max-w-3xl mt-28 px-6 z-10">
          <h1 className="text-3xl md:text-3xl font-bold text-white mb-6 text-center leading-tight">
            AI-Powered Background Remover
          </h1>
          <p className="text-lg text-yellow-500 font-bold mb-8 text-center max-w-2xl">
            Effortlessly remove backgrounds from images with our free, AI-driven tool. Create high-quality, transparent PNGs in seconds for e-commerce, design, and more.
          </p>

          {/* Upload Area */}
          <div className="w-full bg-transparent p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 upload-card">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Seamless Background Removal
            </h2>
            <div
              className="border-2 border-dashed border-blue-600 p-6 rounded-lg text-center hover:bg-blue-50 hover:bg-opacity-10 transition-colors duration-200"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className="text-lg text-gray-300">Drag & Drop Your Image Here</p>
            </div>

            <label
              htmlFor="fileInput"
              className="mt-6 block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium tracking-wide cursor-pointer hover:bg-blue-700 hover:shadow-md transition-all duration-300"
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
              <p className="text-red-500 mt-4 text-center animate-fadeIn">
                {error}
              </p>
            )}
          </div>

          {/* Example Images */}
          <div className="mt-12 text-center bg-gradient-to-r from-gray-900 to-blue-900 p-8 rounded-2xl border border-blue-500/30 shadow-xl max-w-4xl mx-auto animate-slideUp upload-card">
  <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 animate-pulse">
    Explore with Example Images
  </h2>
  <p className="text-lg text-gray-200 font-medium mb-6 animate-fadeIn">
    Test our AI background remover with these sample images.
  </p>
  <div className="flex justify-center gap-6">
    {exampleImages.map((item, index) => (
      <img
        key={index}
        src={item.src}
        alt={item.alt}
        className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 hover:border-blue-500 hover:ring-4 hover:ring-blue-500/50 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer shadow-md"
        onClick={() => {
          router.push(`/result?imageUrl=${encodeURIComponent(item.src)}`);
        }}
      />
    ))}
  </div>
</div>

        </section>

      

       
      </div>
      <Footer />
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        section {
          position: relative;
          transform: translateY(0);
          transition: transform 0.3s ease;
        }
        section:hover {
          transform: translateY(-5px);
        }
        .upload-card {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </>
  );
}