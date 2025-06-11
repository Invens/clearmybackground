"use client";

import { useState, useEffect, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function HeroSection({ handleFileChange, handleDragOver, handleDragLeave, handleDrop, isDragging, error, router, exampleImages }) {
  const canvasRef = useRef(null);

  // Black Hole Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = width < 768 ? 50 : 100; // Fewer particles on mobile
    const blackHole = { x: width / 2, y: height / 2, radius: 50 };

    class Particle {
      constructor() {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 100; // Distance from black hole
        this.x = blackHole.x + Math.cos(angle) * distance;
        this.y = blackHole.y + Math.sin(angle) * distance;
        this.radius = Math.random() * 2 + 1; // Particle size
        this.speed = Math.random() * 0.02 + 0.01; // Orbital speed
        this.angle = angle;
        this.opacity = Math.random() * 0.5 + 0.5; // Glowing effect
      }

      update() {
        // Orbit around black hole
        this.angle += this.speed;
        const distance = Math.hypot(this.x - blackHole.x, this.y - blackHole.y);
        const pullStrength = 0.0005 / distance; // Gravitational pull
        this.x += Math.cos(this.angle) * this.speed - (this.x - blackHole.x) * pullStrength;
        this.y += Math.sin(this.angle) * this.speed - (this.y - blackHole.y) * pullStrength;

        // Fade particles as they get closer to the black hole
        this.opacity = Math.max(0, this.opacity - 0.0005);
        if (this.opacity <= 0 || distance < blackHole.radius) {
          // Reset particle when it gets too close or fades out
          const angle = Math.random() * Math.PI * 2;
          const newDistance = Math.random() * 200 + 100;
          this.x = blackHole.x + Math.cos(angle) * newDistance;
          this.y = blackHole.y + Math.sin(angle) * newDistance;
          this.opacity = Math.random() * 0.5 + 0.5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // White glowing particles
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#60A5FA"; // Blue glow
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Resize canvas on window resize
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      blackHole.x = width / 2;
      blackHole.y = height / 2;
    };

    window.addEventListener("resize", resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Subtle dark background
      ctx.fillRect(0, 0, width, height);

      // Draw black hole
      const gradient = ctx.createRadialGradient(
        blackHole.x,
        blackHole.y,
        0,
        blackHole.x,
        blackHole.y,
        blackHole.radius
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)"); // Black center
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fade to transparent
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center w-full max-w-4xl mt-20 px-4 z-10 relative">
      {/* Black Hole Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      ></canvas>

      {/* Drag Overlay */}
      {isDragging && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 border-4 border-dashed border-blue-600 animate-pulse">
          <p className="text-4xl font-semibold text-white">Drop Your Image</p>
        </div>
      )}

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center drop-shadow-lg">
        Free AI Background Remover
      </h1>
      <p className="text-xl text-gray-200 mb-8 text-center max-w-xl drop-shadow-md">
        Instantly remove image backgrounds with our free AI tool.
      </p>
      <div className="w-full max-w-lg bg-white bg-opacity-90 p-8 rounded-xl shadow-lg backdrop-blur-sm">
        <div
          className={`border-2 border-dashed ${isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300'} p-8 rounded-lg text-center transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="region"
          aria-label="Drag and drop image upload area"
        >
          <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-2" />
          <p className="text-lg text-gray-600">Drag & Drop Your Image Here</p>
          <p className="text-sm text-gray-400 mt-2">or</p>
          <label
            htmlFor="fileInput"
            className="mt-4 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Upload Image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </section>
  );
}