"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/header/page";
import Section2 from "@/components/homeSection/section2";
import Footer from "@/components/footer/page";
import "react-before-after-slider-component/dist/build.css";

export default function Homepage() {
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setError("Please select a valid file to upload.");
      return;
    }
    setError("");

    try {
      // Validate the file type
      if (!selectedFile.type.startsWith("image/")) {
        setError("Invalid file type. Please upload an image.");
        return;
      }

      // Use FileReader to handle compatibility issues
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result; // Base64 URL
        router.push(`/result?imageUrl=${encodeURIComponent(imageUrl)}`);
      };
      reader.readAsDataURL(selectedFile); // Read as Base64 to avoid compatibility issues
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred while processing the image. Please try again.");
    }
  };

  const handleUrlUpload = () => {
    if (!url) {
      setError("Please paste a valid image URL.");
      return;
    }
    setError("");

    try {
      const testImage = new Image();
      testImage.src = url;
      testImage.onload = () => {
        router.push(`/result?imageUrl=${encodeURIComponent(url)}`);
      };
      testImage.onerror = () => {
        setError("Invalid image URL. Please provide a valid link.");
      };
    } catch (error) {
      console.error("Error with URL upload:", error);
      setError("An error occurred while processing the image URL. Please try again.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (!selectedFile) {
      setError("Please drop a valid image file.");
      return;
    }
    handleFileChange({ target: { files: [selectedFile] } });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <Header />
        <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-10 lg:px-20">
          {/* Left Section */}
          <div className="lg:w-1/2 rounded-lg p-8">
            <div className="flex flex-col items-center justify-center w-full mt-10 lg:px-20">
              {/* Upload Box */}
              <div className="w-96 bg-white shadow-xl rounded-lg p-6 text-center">
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-dashed border-2 border-gray-300 p-6 rounded-lg cursor-pointer"
                >
                  <p className="text-gray-600">Drag and Drop an Image File Here</p>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition inline-block"
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

                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Paste Image URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-center"
                  />
                  <button
                    onClick={handleUrlUpload}
                    className="w-full mt-2 bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Upload via URL
                  </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>

              {/* Example Images */}
              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4">No image? Try one of these:</p>
                <div className="flex space-x-4 justify-center">
                  {["/remove-background-from-image-example1.jpg", "/remove-background-from-image-example2.jpg", "/remove-background-from-image-example3.jpg"].map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="Example"
                      className="w-16 h-16 rounded-lg shadow-md object-cover cursor-pointer"
                      onClick={() => {
                        const imageUrl = window.location.origin + src;
                        router.push(`/result?imageUrl=${encodeURIComponent(imageUrl)}`);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 p-4 text-center">
            <div className="flex space-x-2 justify-center">
              <Image
                src="/download.png"
                alt="Example 1"
                width={1000}
                height={1000}
                className="w-96 h-96 rounded-lg object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Remove Backgrounds Online for Free | Create Transparent Images Instantly
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Effortlessly remove backgrounds from photos <span className="text-yellow-500 font-bold">Free</span>
            </p>
          </div>
        </div>
        <Section2 />
      </div>
      <Footer />
    </>
  );
}
