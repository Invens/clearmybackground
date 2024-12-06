import React, { useState, useEffect } from 'react';
import BeforeAfterSlider from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

const CarouselBefore = () => {
  const sliderData = [
    {
      before: 'before.jpg',
      after: 'after.png',
      title: 'Remove Backgrounds from Images',
      description:
        'Instantly remove backgrounds from photos for free and make them transparent. Perfect for e-commerce, social media, and more.',
    },
    {
      before: 'before2.jpg',
      after: 'after2.png',
      title: 'Create Transparent Background PNGs',
      description:
        'Convert your images into transparent PNGs with perfect clarity, making them easy to use in any design project.',
    },
    {
      before: 'before3.jpg',
      after: 'after3.png',
      title: 'Remove White Backgrounds',
      description:
        'Eliminate white backgrounds effortlessly, ensuring clean and professional visuals for your projects.',
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

      beforeImg.onerror = (err) => {
        console.error('Failed to load before image:', item.before, err);
      };
      afterImg.onerror = (err) => {
        console.error('Failed to load after image:', item.after, err);
      };
    });
  }, [sliderData]);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* SEO-Friendly Heading */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Transform Your Images with Our Background Removal Tool
          </h1>
          <p className="text-gray-600 mt-4">
            Discover how easy it is to create transparent PNGs and professional visuals effortlessly.
          </p>
        </header>

        {/* Hero Section */}
        <div className="w-full mb-16">
          {imagesLoaded && (
            <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="rounded-lg overflow-hidden w-full sm:h-[600px] flex items-center justify-center">
                <BeforeAfterSlider
                  firstImage={{
                    imageUrl: sliderData[1].before,
                    alt: 'Before: Original image before background removal',
                  }}
                  secondImage={{
                    imageUrl: sliderData[1].after,
                    alt: 'After: Image with transparent background created using our tool',
                  }}
                  currentPercentPosition={0.5}
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 text-center mt-4">
                {sliderData[1].title}
              </h2>
              <p className="text-gray-600 text-center">{sliderData[1].description}</p>
            </article>
          )}
        </div>

        {/* Other Images Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {imagesLoaded && (
              <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <BeforeAfterSlider
                  firstImage={{
                    imageUrl: sliderData[2].before,
                    alt: 'Before: Image with white background',
                  }}
                  secondImage={{
                    imageUrl: sliderData[2].after,
                    alt: 'After: Image with white background removed',
                  }}
                  currentPercentPosition={0.5}
                  className="rounded-lg overflow-hidden object-contain"
                />
                <h3 className="text-xl font-semibold text-gray-700 mt-4">
                  {sliderData[2].title}
                </h3>
                <p className="text-gray-600 mt-2">{sliderData[2].description}</p>
              </article>
            )}
          </div>
          {/* Right Column */}
          <div className="lg:col-span-3">
            {imagesLoaded && (
              <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full">
                <BeforeAfterSlider
                  firstImage={{
                    imageUrl: sliderData[0].before,
                    alt: 'Before: Image before background removal process',
                  }}
                  secondImage={{
                    imageUrl: sliderData[0].after,
                    alt: 'After: Image after background removal with a transparent background',
                  }}
                  currentPercentPosition={0.5}
                  className="rounded-lg overflow-hidden sm:h-[440px] w-full object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-700 mt-4">
                  {sliderData[0].title}
                </h3>
                <p className="text-gray-600 mt-2">{sliderData[0].description}</p>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselBefore;
