import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory path (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current date in YYYY-MM-DD format for lastmod
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Configure your site URLs
const siteUrl = 'https://notevue.com';

// Define your routes with their metadata
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/login', priority: '0.8', changefreq: 'monthly' },
  { path: '/signup', priority: '0.8', changefreq: 'monthly' },
  { path: '/dashboard', priority: '0.9', changefreq: 'daily' },
  { path: '/today', priority: '0.9', changefreq: 'daily' },
  { path: '/upcoming', priority: '0.8', changefreq: 'daily' },
  { path: '/completed', priority: '0.7', changefreq: 'daily' },
  { path: '/sticky-wall', priority: '0.8', changefreq: 'daily' },
  { path: '/settings', priority: '0.6', changefreq: 'monthly' },
  { path: '/profile', priority: '0.7', changefreq: 'monthly' },
];

// Generate sitemap XML content
const generateSitemap = () => {
  const currentDate = getCurrentDate();

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach((route) => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteUrl}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';
  return sitemap;
};

// Write the sitemap to file
const writeSitemap = () => {
  try {
    const sitemap = generateSitemap();
    const filePath = path.join(__dirname, '../public/sitemap.xml');

    fs.writeFileSync(filePath, sitemap);
    console.log('Sitemap generated successfully!');
  } catch (err) {
    console.error('Error generating sitemap:', err);
  }
};

// Execute
writeSitemap();
