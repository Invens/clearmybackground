"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/header/page";

export default function Result() {
  const searchParams = useSearchParams();
  const initialImageUrl = searchParams.get("imageUrl");
  const [tabs, setTabs] = useState([
    { id: 1, imageUrl: initialImageUrl, processedImageUrl: null, isProcessing: true },
  ]);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    if (activeTabData && activeTabData.imageUrl && activeTabData.isProcessing) {
      processImage(activeTab);
    }
  }, [tabs, activeTab]);

  const processImage = async (tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab || !tab.imageUrl) return;

    try {
      const response = await fetch(tab.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "uploaded-image.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      const result = await axios.post("http://127.0.0.1:5000/process/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTabs((prevTabs) =>
        prevTabs.map((t) =>
          t.id === tabId
            ? { ...t, processedImageUrl: `http://127.0.0.1:5000${result.data.url}`, isProcessing: false }
            : t
        )
      );
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const handleNewTab = () => {
    const newTabId = tabs.length + 1;
    setTabs([...tabs, { id: newTabId, imageUrl: null, processedImageUrl: null, isProcessing: false }]);
    setActiveTab(newTabId);
  };

  const handleFileUpload = (event, tabId) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setTabs((prevTabs) =>
      prevTabs.map((t) => (t.id === tabId ? { ...t, imageUrl, isProcessing: true } : t))
    );

    processImage(tabId); // Process the uploaded image
  };

  const handleDownload = async (tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab.processedImageUrl) return;

    try {
      const response = await fetch(tab.processedImageUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `processed-image-${tabId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <main className="flex flex-col items-center w-full px-6 py-10">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <div key={tab.id} className="relative w-[600px] h-[400px] rounded-lg shadow-lg flex flex-col items-center justify-center overflow-hidden bg-checkered">
                  {tab.isProcessing ? (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                    </div>
                  ) : tab.processedImageUrl ? (
                    <img
                      src={tab.processedImageUrl}
                      alt="Processed Image"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <label
                        htmlFor={`fileUpload-${tab.id}`}
                        className="cursor-pointer bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                      >
                        Upload Image
                      </label>
                      <input
                        id={`fileUpload-${tab.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, tab.id)}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              )
          )}

          {/* Download Button */}
          {!tabs[activeTab - 1]?.isProcessing && tabs[activeTab - 1]?.processedImageUrl && (
            <div className="mt-6">
              <button
                onClick={() => handleDownload(activeTab)}
                className="bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 transition"
              >
                Download
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="absolute bottom-4 left-4 flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-16 h-16 rounded-lg bg-cover bg-center border-2 ${
                  activeTab === tab.id ? "border-blue-500" : "border-gray-300"
                }`}
                style={{
                  backgroundImage: `url(${tab.imageUrl || "/placeholder.png"})`,
                }}
              ></button>
            ))}
            <button
              onClick={handleNewTab}
              className="w-16 h-16 rounded-lg bg-blue-500 text-white flex items-center justify-center"
            >
              +
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
