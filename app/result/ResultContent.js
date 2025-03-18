"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

export default function Result() {
  const searchParams = useSearchParams();
  const initialImageUrl = searchParams.get("imageUrl");
  const [tabs, setTabs] = useState([]); // Array of { id, imageUrl, processedImageUrl }
  const [activeTab, setActiveTab] = useState(null); // ID of the active tab
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize with the first image from URL
  useEffect(() => {
    if (initialImageUrl && tabs.length === 0) {
      const newTab = { id: Date.now(), imageUrl: initialImageUrl, processedImageUrl: null };
      setTabs([newTab]);
      setActiveTab(newTab.id);
      processImage(newTab);
    }
  }, [initialImageUrl]);

  const processImage = async (tab) => {
    try {
      setIsProcessing(true);

      const response = await fetch(tab.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `uploaded-image-${tab.id}.jpg`, { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      const result = await axios.post("https://api.clearmybackground.com/remove-bg/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", result.data);
      const processedUrl = `https://api.clearmybackground.com${result.data.url}`;

      setTabs((prevTabs) =>
        prevTabs.map((t) =>
          t.id === tab.id ? { ...t, processedImageUrl: processedUrl } : t
        )
      );
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const newImageUrl = URL.createObjectURL(file);
    const newTab = { id: Date.now(), imageUrl: newImageUrl, processedImageUrl: null };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(newTab.id);
    processImage(newTab);
  };

  const handleDownload = async () => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    if (!activeTabData || !activeTabData.processedImageUrl) return;

    try {
      const response = await fetch(activeTabData.processedImageUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `background_removed_${activeTabData.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  // Particle animation effect
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);

    const createParticle = () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 1;
      const speedY = Math.random() * 1 - 0.5;
      const opacity = Math.random() * 0.5 + 0.5;
      particles.push({ x, y, size, speedY, opacity });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (particles.length < 100) createParticle();

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();

        particle.y += particle.speedY;
        particle.opacity -= 0.005;

        if (particle.opacity <= 0 || particle.y < 0 || particle.y > height) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Particle Animation Canvas */}
        <canvas
          id="particleCanvas"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        ></canvas>

        <main className="flex flex-col items-center w-full px-6 py-20 z-10">
          <div className="relative w-[600px] h-[400px] rounded-xl border border-gray-700 bg-gray-800 bg-opacity-50 backdrop-blur-md flex items-center justify-center overflow-hidden">
            {isProcessing ? (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Original Image with Fading Overlay */}
                  <img
                    src={tabs.find((tab) => tab.id === activeTab)?.imageUrl}
                    alt="Processing Image"
                    className="absolute inset-0 w-full h-full object-contain opacity-50"
                  />
                  {/* Scanning Line Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-blue-500 animate-scan-line shadow-glow"></div>
                  </div>
                  {/* Processing Text */}
                  <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-lg font-semibold tracking-wide animate-fadeIn">
                    AI Removing Background...
                  </p>
                </div>
              </div>
            ) : activeTab && tabs.find((tab) => tab.id === activeTab)?.processedImageUrl ? (
              <img
                src={tabs.find((tab) => tab.id === activeTab).processedImageUrl}
                alt="Processed Image"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            ) : (
              <p className="text-gray-400"></p>
            )}
          </div>

          {/* Tab Bar */}
          {tabs.length > 0 && (
            <div className="mt-4 flex gap-2 flex-wrap justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-glow"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Image {tabs.indexOf(tab) + 1}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            {activeTab &&
              !isProcessing &&
              tabs.find((tab) => tab.id === activeTab)?.processedImageUrl && (
                <button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium py-3 px-8 rounded-lg hover:from-green-600 hover:to-teal-600 hover:shadow-glow transition-all duration-300"
                >
                  Download
                </button>
              )}
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-glow transition-all duration-300"
            >
              Upload Another
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}