
import { Orbitron } from "next/font/google";
import "./globals.css";
import "react-before-after-slider-component/dist/build.css";
import ClientProviders from "@/components/ClientProviders"; // adjust path as needed


// Use the Google Font: Orbitron
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"], // Selected weights for flexibility
  variable: "--font-orbitron", // CSS variable for easy use
});

export const metadata = {
  // General SEO Metadata
  title: "AI Background Remover - Free Online Tool | cleanmybg",
  description:
    "Remove backgrounds from images, photos, and pictures effortlessly with our free AI-powered tool. Create transparent PNGs online instantly for design, e-commerce, and more.",
  keywords:
    "AI background remover, remove background online, free background removal, transparent background maker, AI image editor, background eraser, transparent PNG creator, remove bg free, clear photo background, make image transparent online",

  // Robots and Viewport
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",

  // Open Graph Tags for Social Sharing
  openGraph: {
    title: "AI Background Remover - Free Online Tool",
    description:
      "Instantly remove backgrounds from images with our free AI tool. Create transparent backgrounds online effortlessly.",
    url: "https://yourwebsite.com/", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "AI Background Remover Preview",
      },
    ],
  },

  // Twitter Card Tags
  twitter: {
    card: "summary_large_image",
    title: "AI Background Remover - Free Online Tool",
    description:
      "Use our free AI tool to remove backgrounds and create transparent PNGs online instantly.",
    image: "https://cleanmybg.com/logo.png", // Replace with your actual image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} antialiased`}>
     
      <ClientProviders>
          {children}
        </ClientProviders>

      </body>
    </html>
  );
}