const express = require('express');
const path = require('path');
const router = express.Router();

// Serve robots.txt
router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`# Allow all web crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://notevue.com/sitemap.xml`);
});

// Serve sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/sitemap.xml'));
});

module.exports = router;
