import React, { useState, useEffect } from 'react';
import BeforeAfterSlider from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

const CarouselBefore = () => {
  const sliderData = [
    {
      before: 'dog-before.jpg',
      after: 'dog.png',
      title: 'Remove Backgrounds',
      description: 'Instantly create transparent images for any project.',
    },
    {
      before: 'before2.jpg',
      after: 'after2.png',
      title: 'Transparent PNGs',
      description: 'Perfect clarity for seamless design integration.',
    },
    {
      before: 'little-girl-before.png',
      after: 'little-girl.png',
      title: 'Erase White Backgrounds',
      description: 'Clean, professional visuals in seconds.',
    },
  ];

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preloading images
  useEffect(() => {
    let totalImages = sliderData.length * 2;
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount += 1;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    sliderData.forEach((item) => {
      const beforeImg = new Image();
      const afterImg = new Image();

      beforeImg.src = item.before;
      afterImg.src = item.after;

      beforeImg.onload = handleImageLoad;
      afterImg.onload = handleImageLoad;

      beforeImg.onerror = (err) => console.error('Failed to load before image:', item.before, err);
      afterImg.onerror = (err) => console.error('Failed to load after image:', item.after, err);
    });
  }, [sliderData]);

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-16 relative overflow-hidden">
      {/* Futuristic Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e90ff_0,rgba(0,0,0,0.9)_75%)] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10">
        {/* Simplified Heading */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Image Transformation
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Next-gen background removal made simple.</p>
        </header>

        {/* Hero Slider */}
        {imagesLoaded && (
          <article className="mb-12 bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-blue-500 hover:shadow-glow transition-all duration-300">
            <div className="rounded-lg overflow-hidden w-full sm:h-[500px] flex items-center justify-center">
              <BeforeAfterSlider
                firstImage={{
                  imageUrl: sliderData[1].before,
                  alt: 'Before: Original image',
                }}
                secondImage={{
                  imageUrl: sliderData[1].after,
                  alt: 'After: Transparent background',
                }}
                currentPercentPosition={0.5}
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold text-blue-400 text-center mt-4 tracking-wide">
              {sliderData[1].title}
            </h2>
            <p className="text-gray-300 text-center mt-2">{sliderData[1].description}</p>
          </article>
        )}

        {/* Other Sliders */}
        <div className="lg:grid-cols-4 gap-8">
          {/* Left Slider */}
          {/* {imagesLoaded && (
            <article className="lg:col-span-1 bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-blue-500 hover:shadow-glow transition-all duration-300">
              <BeforeAfterSlider
                firstImage={{
                  imageUrl: sliderData[2].before,
                  alt: 'Before: White background',
                }}
                secondImage={{
                  imageUrl: sliderData[2].after,
                  alt: 'After: White background removed',
                }}
                currentPercentPosition={0.5}
                className="rounded-lg overflow-hidden object-contain"
              />
              <h3 className="text-xl font-semibold text-blue-400 mt-4 tracking-wide">
                {sliderData[2].title}
              </h3>
              <p className="text-gray-300 mt-2">{sliderData[2].description}</p>
            </article>
          )} */}

          {/* Right Slider */}
          {imagesLoaded && (
            <article className="lg:col-span-3 bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-blue-500 hover:shadow-glow transition-all duration-300">
              <BeforeAfterSlider
                firstImage={{
                  imageUrl: sliderData[0].before,
                  alt: 'Before: Original image',
                }}
                secondImage={{
                  imageUrl: sliderData[0].after,
                  alt: 'After: Transparent background',
                }}
                currentPercentPosition={0.5}
                className="rounded-lg overflow-hidden sm:h-[600px] w-full object-fill"
              />
              <h3 className="text-xl font-semibold text-blue-400 mt-4 tracking-wide">
                {sliderData[0].title}
              </h3>
              <p className="text-gray-300 mt-2">{sliderData[0].description}</p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarouselBefore;