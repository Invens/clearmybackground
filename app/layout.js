import { Roboto } from "next/font/google"; // Replace Roboto with ParkinSans if available
import "./globals.css";
import 'react-before-after-slider-component/dist/build.css';

// Use the Google Font
const parkinSans = Roboto({
  subsets: ["latin"], // Adjust subsets as needed
  weight: ["100", "300", "400", "500", "700", "900"], // Specify weights as required
  variable: "--font-parkin-sans", // Variable to use in CSS
});

export const metadata = {
  title: "Background Removing Online | Free Transparent Background Tool",
  description:
    "Effortlessly remove backgrounds from images, photos, and pictures for free. Create transparent backgrounds or PNGs online with our easy-to-use tool.",
  keywords: [
    "background removing",
    "removing background from image",
    "removing background from picture",
    "transparent background",
    "removing background from photos",
    "clear photo background",
    "free removing background from image",
    "clear backgrounds",
    "make background transparent",
    "make image transparent",
    "create transparent background",
    "make png transparent",
    "make image background transparent",
    "make image transparent online",
    "make a photo transparent",
    "transparent background png",
    "make photo background transparent",
    "transparent background images",
    "removing white background from image",
    "png to transparent background",
    "make picture background transparent",
    "transparent background online",
    "make picture transparent online",
    "create image with transparent background",
    "make a picture transparent background",
    "png clear background",
    "removing background from png",
    "removing background from image online",
    "removing background online free",
    "background removing online",
  ].join(", "),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content="Clear My B" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://clearmybackground.com" />
        <meta property="og:image" content="https://clearmybackground.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://clearmybackground.com/twitter-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://clearmybackground.com" />
        <title>{metadata.title}</title>
      </head>
      <body className={`${parkinSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
