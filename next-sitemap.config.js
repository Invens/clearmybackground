/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://clearmybackground.com', // Replace with your site's URL
    generateRobotsTxt: true, // Generate robots.txt
    sitemapSize: 7000, // Split sitemap into multiple files if necessary
    exclude: ['/admin/*'], // Add routes to exclude if needed
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  };
  
  module.exports = config;
  