import Header from "@/components/header/page";

export const metadata = {
  title: "FAQs | cleanmybg.com",
  description:
    "Find answers to frequently asked questions about cleanmybg.com. Learn about background removal, supported formats, transparent PNGs, and more.",
  keywords: [
    "FAQs",
    "frequently asked questions",
    "background removal FAQs",
    "cleanmybg FAQs",
    "image tools help",
    "background remover questions",
    "background removal tool FAQs",
    "make transparent images",
  ].join(", "),
};

const faqData = [
  {
    question: "What is background removal?",
    answer:
      "Background removal is the process of isolating the main subject of an image by eliminating its background. This technique is used to create transparent or clean backgrounds for various purposes like design, e-commerce, and social media.",
  },
  {
    question: "How can I remove a background from an image?",
    answer:
      "You can remove a background by using tools like cleanmybg.com. Upload your image, and the tool will automatically detect and remove the background.",
  },
  {
    question: "Is background removal free on your site?",
    answer:
      "Yes, our tool allows you to remove backgrounds from images for free. Additional premium features may be available for advanced editing.",
  },
  {
    question: "Can I create a transparent background online?",
    answer:
      "Yes, our tool creates transparent backgrounds online. Simply upload your image, and it will generate a PNG with a transparent background.",
  },
  {
    question: "What file formats does your tool support?",
    answer:
      "Our tool supports popular image formats such as PNG, JPG, and JPEG. You can upload any of these formats to remove the background.",
  },
  {
    question: "Can I remove a white background from an image?",
    answer:
      "Yes, our tool is specifically designed to remove white backgrounds or any other solid color background from images.",
  },
  {
    question: "How does AI help in background removal?",
    answer:
      "Our AI-powered tool uses advanced algorithms to detect the subject in your image and remove the background with precision, ensuring professional results.",
  },
  {
    question: "What is a transparent background?",
    answer:
      "A transparent background means the background of an image is completely removed, leaving only the subject. This is ideal for logos, e-commerce products, and design projects.",
  },
  {
    question: "How do I make a PNG with a transparent background?",
    answer:
      "Upload your image to our tool, and it will automatically convert the background to transparent. Download the result in PNG format for easy use.",
  },
  {
    question: "Can I edit multiple images at once?",
    answer:
      "Currently, batch processing is not supported on our free tool. However, you can upload and edit images one at a time.",
  },
  {
    question: "Is there a size limit for uploading images?",
    answer:
      "Yes, our tool supports images up to 10MB. If your file is larger, consider compressing it before uploading.",
  },
  {
    question: "Can I use the tool on mobile devices?",
    answer:
      "Yes, our tool is fully responsive and works seamlessly on both mobile devices and desktops.",
  },
  {
    question: "Are there any watermarks on the edited images?",
    answer:
      "No, images processed with our free tool do not include watermarks.",
  },
  {
    question: "How do I make a picture transparent online?",
    answer:
      "Upload your picture to our online tool, and it will automatically remove the background, making the image transparent.",
  },
  {
    question: "Can I restore the background after removal?",
    answer:
      "Unfortunately, our tool does not offer background restoration. Ensure you save a copy of your original image.",
  },
  {
    question: "Why is PNG the best format for transparent backgrounds?",
    answer:
      "PNG supports alpha transparency, which allows parts of the image to remain see-through, making it the ideal format for transparent backgrounds.",
  },
  {
    question: "Can I use your tool for commercial purposes?",
    answer:
      "Yes, you can use the images edited with our tool for commercial projects like e-commerce listings, advertisements, and social media posts.",
  },
  {
    question: "How long does it take to remove a background?",
    answer:
      "Our tool processes most images in a matter of seconds, depending on the file size and complexity of the background.",
  },
  {
    question: "Do I need to create an account to use the tool?",
    answer:
      "No, our tool does not require account creation. You can start editing images right away.",
  },
  {
    question: "Is your tool safe to use?",
    answer:
      "Yes, your privacy is our priority. Uploaded images are processed securely and not stored on our servers after editing.",
  },
];

export default function FAQ() {
  const generateStructuredData = () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
    return JSON.stringify(faqSchema);
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cleanmybg.com/faq" />
        <meta property="og:image" content="https://cleanmybg.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://cleanmybg.com/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://cleanmybg.com/faq" />
        <title>{metadata.title}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
        />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
          <Header />
          <header className="w-full bg-white shadow-md py-4 px-6 flex justify-center mt-4">
            <h1 className="text-3xl font-bold text-gray-800">FAQs</h1>
          </header>
          <main className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-8">
            {faqData.map((faq, index) => (
              <section key={index} className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h2>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </section>
            ))}
          </main>
        </div>
      </body>
    </html>
  );
}
