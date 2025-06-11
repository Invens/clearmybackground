
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import api from "@/utils/api";
import { useUser } from "@/context/UserContext";
import { Stage, Layer, Image as KonvaImage, Transformer, Rect } from "react-konva";
import useImage from "use-image";

import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

export default function Result() {
  const searchParams = useSearchParams();
  const initialImageUrl = searchParams.get("imageUrl");
  const { token, isLoggedIn, credits, fetchCredits } = useUser();

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bgImages, setBgImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("nature");

  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);

  const [stageDimensions, setStageDimensions] = useState({ width: 800, height: 500 });
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [bgImageUrl, setBgImageUrl] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [pixelWidth, setPixelWidth] = useState(800);
  const [pixelHeight, setPixelHeight] = useState(500);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("16:10");

  const [mainImage] = useImage(mainImageUrl, "anonymous");
  const [bgImage] = useImage(bgImageUrl, "anonymous");

  const [scale, setScale] = useState(1);
  const [activeTabType, setActiveTabType] = useState("Photo");

  // Minimum and maximum dimensions for resizing
  const MIN_WIDTH = 400;
  const MAX_WIDTH = 1200;
  const MIN_HEIGHT = 250;
  const MAX_HEIGHT = 750;
  const ASPECT_RATIO = 800 / 500; // Default 16:10

  // Common aspect ratios
  const aspectRatios = [
    { label: "16:10", value: 16 / 10 },
    { label: "16:9", value: 16 / 9 },
    { label: "4:3", value: 4 / 3 },
    { label: "1:1", value: 1 },
    { label: "3:2", value: 3 / 2 },
  ];

  // Initialize container size and handle window resize
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { offsetWidth, offsetHeight } = containerRef.current;
      const newWidth = Math.min(Math.max(offsetWidth, MIN_WIDTH), MAX_WIDTH);
      const newHeight = Math.min(Math.max(offsetHeight, MIN_HEIGHT), MAX_HEIGHT);
      setStageDimensions({ width: newWidth, height: newHeight });
      setPixelWidth(newWidth);
      setPixelHeight(newHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Handle canvas resizing with mouse
  const handleResize = (e, direction) => {
    if (!containerRef.current) return;
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = stageDimensions.width;
    const startHeight = stageDimensions.height;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes("right")) newWidth += deltaX;
      if (direction.includes("left")) newWidth -= deltaX;
      if (direction.includes("bottom")) newHeight += deltaY;
      if (direction.includes("top")) newHeight -= deltaY;

      newWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
      newHeight = Math.min(Math.max(newHeight, MIN_HEIGHT), MAX_HEIGHT);

      if (maintainAspectRatio) {
        const currentRatio = aspectRatios.find((ar) => ar.label === selectedAspectRatio)?.value || ASPECT_RATIO;
        if (direction.includes("width")) {
          newHeight = newWidth / currentRatio;
        } else {
          newWidth = newHeight * currentRatio;
        }
        newWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
        newHeight = Math.min(Math.max(newHeight, MIN_HEIGHT), MAX_HEIGHT);
      }

      setStageDimensions({ width: newWidth, height: newHeight });
      setPixelWidth(Math.round(newWidth));
      setPixelHeight(Math.round(newHeight));
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Handle pixel input changes
  const handlePixelChange = (type, value) => {
    let newWidth = pixelWidth;
    let newHeight = pixelHeight;

    if (type === "width") {
      newWidth = Math.min(Math.max(parseInt(value) || MIN_WIDTH, MIN_WIDTH), MAX_WIDTH);
      setPixelWidth(newWidth);
      if (maintainAspectRatio) {
        const currentRatio = aspectRatios.find((ar) => ar.label === selectedAspectRatio)?.value || ASPECT_RATIO;
        newHeight = Math.round(newWidth / currentRatio);
        newHeight = Math.min(Math.max(newHeight, MIN_HEIGHT), MAX_HEIGHT);
        setPixelHeight(newHeight);
      }
    } else {
      newHeight = Math.min(Math.max(parseInt(value) || MIN_HEIGHT, MIN_HEIGHT), MAX_HEIGHT);
      setPixelHeight(newHeight);
      if (maintainAspectRatio) {
        const currentRatio = aspectRatios.find((ar) => ar.label === selectedAspectRatio)?.value || ASPECT_RATIO;
        newWidth = Math.round(newHeight * currentRatio);
        newWidth = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
        setPixelWidth(newWidth);
      }
    }

    setStageDimensions({ width: newWidth, height: newHeight });
  };

  // Handle aspect ratio change
  const handleAspectRatioChange = (e) => {
    const newRatio = e.target.value;
    setSelectedAspectRatio(newRatio);
    const ratioValue = aspectRatios.find((ar) => ar.label === newRatio).value;
    const newHeight = Math.round(stageDimensions.width / ratioValue);
    const constrainedHeight = Math.min(Math.max(newHeight, MIN_HEIGHT), MAX_HEIGHT);
    const constrainedWidth = Math.round(constrainedHeight * ratioValue);
    setStageDimensions({
      width: Math.min(Math.max(constrainedWidth, MIN_WIDTH), MAX_WIDTH),
      height: constrainedHeight,
    });
    setPixelWidth(Math.round(constrainedWidth));
    setPixelHeight(constrainedHeight);
  };

  // Fetch Pexels backgrounds
  useEffect(() => {
    const fetchPexels = async () => {
      try {
        const res = await axios.get("https://api.pexels.com/v1/search", {
          headers: { Authorization: process.env.NEXT_PUBLIC_PEXELS_KEY },
          params: { query: searchQuery, per_page: 25 },
        });
        setBgImages(res.data.photos.map((p) => p.src.large));
      } catch (e) {
        console.error("Pexels API error:", e);
      }
    };
    fetchPexels();
  }, [searchQuery]);

  // Initialize tab & process image
  useEffect(() => {
    if (!initialImageUrl || tabs.length) return;
    const tab = { id: Date.now(), imageUrl: initialImageUrl, processedImageUrl: null };
    setTabs([tab]);
    processImage(tab);
  }, [initialImageUrl, token]);

  // Attach Konva transformer
  useEffect(() => {
    if (transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [mainImage]);

  // Process image for background removal
  const processImage = async (tab) => {
    try {
      setIsProcessing(true);
      const resp = await fetch(tab.imageUrl);
      const blob = await resp.blob();
      const file = new File([blob], `upload-${tab.id}.jpg`, { type: blob.type });

      const formData = new FormData();
      formData.append("image", file);

      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const { data } = await api.post("/image/remove", formData, { headers });

      setTabs((prev) =>
        prev.map((t) =>
          t.id === tab.id ? { ...t, processedImageUrl: data.processedUrl } : t
        )
      );
      setMainImageUrl(data.processedUrl);
      setActiveTab(tab.id);

      if (isLoggedIn) await fetchCredits();
    } catch (err) {
      console.error("Image processing error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to process image. You might be out of credits or not logged in."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Download canvas image
  const handleDownload = () => {
    transformerRef.current.nodes([]);
    transformerRef.current.getLayer().batchDraw();

    const uri = stageRef.current.toDataURL({ pixelRatio: 2, mimeType: "image/png" });

    transformerRef.current.nodes([imageRef.current]);
    transformerRef.current.getLayer().batchDraw();

    const link = document.createElement("a");
    link.download = `edited_image_${activeTab}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Remove background
  const handleRemoveBackground = () => {
    setBgColor(null);
    setBgImageUrl(null);
  };

  // Zoom controls
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.1, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.1, 0.5));

  // Compute centering
  const { width, height } = stageDimensions;
  const imgW = mainImage ? mainImage.width * scale * 0.3 : 0;
  const imgH = mainImage ? mainImage.height * scale * 0.3 : 0;
  const imgX = (width - imgW) / 2;
  const imgY = (height - imgH) / 2;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-cyan-900 flex flex-col items-center justify-center px-4 sm:px-6 py-12 font-inter">
        <main className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
          {/* Left Side: Canvas & Controls */}
          <div className="lg:w-2/3 w-full">
            <div
              ref={containerRef}
              className="relative rounded-3xl overflow-hidden glass-effect shadow-lg transition-all duration-300"
              style={{ width: `${stageDimensions.width}px`, height: `${stageDimensions.height}px` }}
            >
              <Stage
                ref={stageRef}
                width={width}
                height={height}
                className="absolute top-0 left-0"
              >
                <Layer>
                  {bgColor && <Rect x={0} y={0} width={width} height={height} fill={bgColor} />}
                  {bgImage && (
                    <KonvaImage
                      image={bgImage}
                      width={width}
                      height={height}
                      listening={false}
                    />
                  )}
                </Layer>
                <Layer>
                  {tabs.find((t) => t.id === activeTab)?.processedImageUrl && (
                    <>
                      <KonvaImage
                        image={mainImage}
                        x={imgX}
                        y={imgY}
                        width={imgW}
                        height={imgH}
                        draggable
                        ref={imageRef}
                      />
                      <Transformer ref={transformerRef} />
                    </>
                  )}
                </Layer>
              </Stage>
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
                  <p className="text-cyan-300 font-semibold text-lg animate-pulse">
                    Processing Image...
                  </p>
                </div>
              )}
              {/* Resize Handles */}
              <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-500 rounded-full cursor-se-resize"
                onMouseDown={(e) => handleResize(e, "bottom-right")}
              />
              <div
                className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 rounded-full cursor-ne-resize"
                onMouseDown={(e) => handleResize(e, "top-right")}
              />
              <div
                className="absolute bottom-0 left-0 w-4 h-4 bg-cyan-500 rounded-full cursor-sw-resize"
                onMouseDown={(e) => handleResize(e, "bottom-left")}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <div className="flex items-center gap-2">
                <label className="text-gray-200 text-sm">Width:</label>
                <input
                  type="number"
                  value={pixelWidth}
                  onChange={(e) => handlePixelChange("width", e.target.value)}
                  className="w-20 p-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  min={MIN_WIDTH}
                  max={MAX_WIDTH}
                />
                <span className="text-gray-200">px</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-gray-200 text-sm">Height:</label>
                <input
                  type="number"
                  value={pixelHeight}
                  onChange={(e) => handlePixelChange("height", e.target.value)}
                  className="w-20 p-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  min={MIN_HEIGHT}
                  max={MAX_HEIGHT}
                />
                <span className="text-gray-200">px</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-gray-200 text-sm">Aspect:</label>
                <select
                  value={selectedAspectRatio}
                  onChange={handleAspectRatioChange}
                  className="p-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {aspectRatios.map((ratio) => (
                    <option key={ratio.label} value={ratio.label}>
                      {ratio.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleZoomOut}
                className="text-cyan-300 text-2xl bg-gray-800 bg-opacity-50 w-12 h-12 rounded-full hover:bg-opacity-70 transition-all duration-200 glow-hover"
              >
                −
              </button>
              <button
                onClick={handleZoomIn}
                className="text-cyan-300 text-2xl bg-gray-800 bg-opacity-50 w-12 h-12 rounded-full hover:bg-opacity-70 transition-all duration-200 glow-hover"
              >
                +
              </button>
              <button
                onClick={() => setScale(1)}
                className="text-cyan-300 text-xl bg-gray-800 bg-opacity-50 w-12 h-12 rounded-full hover:bg-opacity-70 transition-all duration-200 glow-hover"
              >
                ⟳
              </button>
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 glow-hover"
              >
                Download
              </button>
              <button
                onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 glow-hover ${
                  maintainAspectRatio
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {maintainAspectRatio ? "Lock Aspect" : "Unlock Aspect"}
              </button>
            </div>
          </div>

          {/* Right Side: Background Options & Remove BG */}
          <div className="lg:w-1/3 w-full flex flex-col gap-6">
            <div className="glass-effect p-6 rounded-3xl shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-6">
                  <button
                    className={`text-lg font-semibold transition-colors duration-200 ${
                      activeTabType === "Photo"
                        ? "text-cyan-300 border-b-2 border-cyan-300"
                        : "text-gray-300 hover:text-cyan-200"
                    }`}
                    onClick={() => setActiveTabType("Photo")}
                  >
                    Photo
                  </button>
                  <button
                    className={`text-lg font-semibold transition-colors duration-200 ${
                      activeTabType === "Colour"
                        ? "text-cyan-300 border-b-2 border-cyan-300"
                        : "text-gray-300 hover:text-cyan-200"
                    }`}
                    onClick={() => setActiveTabType("Colour")}
                  >
                    Colour
                  </button>
                </div>
                <button className="text-gray-300 hover:text-cyan-200 text-2xl transition-colors duration-200">
                  ×
                </button>
              </div>

              {activeTabType === "Photo" && (
                <>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search backgrounds..."
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                  />
                  <p className="text-gray-300 text-sm mb-4">
                    Explore 30+ million backgrounds powered by Pexels
                  </p>
                  <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {bgImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-700 cursor-pointer hover:scale-105 transition-transform duration-200 glow-hover"
                        onClick={() => {
                          setBgImageUrl(src);
                          setBgColor(null);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {activeTabType === "Colour" && (
                <div className="mb-6">
                  <h4 className="text-cyan-300 font-semibold text-lg mb-4">
                    Select a Color
                  </h4>
                  <div className="flex gap-3 flex-wrap">
                    <input
                      type="color"
                      value={bgColor || "#ffffff"}
                      onChange={(e) => {
                        setBgImageUrl(null);
                        setBgColor(e.target.value);
                      }}
                      className="w-12 h-12 border-2 border-gray-700 rounded-lg cursor-pointer"
                    />
                    {[
                      "#ffffff",
                      "#000000",
                      "#f87171",
                      "#60a5fa",
                      "#34d399",
                      "#facc15",
                      "#a855f7",
                      "#ec4899",
                      "#22d3ee",
                      "#fb923c",
                    ].map((color) => (
                      <div
                        key={color}
                        className="w-10 h-10 border-2 border-gray-700 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 glow-hover"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setBgImageUrl(null);
                          setBgColor(color);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleRemoveBackground}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 glow-hover"
              >
                Remove Background
              </button>
            </div>
          </div>
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
        .glow-hover:hover {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
        }
      `}</style>
    </>
  );
}