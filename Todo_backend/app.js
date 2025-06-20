const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorMiddleware');

// Route files
const authRoutes = require('./routes/auth.routes');
const listRoutes = require('./routes/lists.routes');
const tagRoutes = require('./routes/tags.routes');
const taskRoutes = require('./routes/tasks.routes');
const noteRoutes = require('./routes/notes.routes');
const seoRoutes = require('./routes/seo.routes'); // Add SEO routes

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Notes API</title>
        <meta name="description" content="NoteVue API - A powerful todo and note-taking application API">
        <meta name="robots" content="index, follow">
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>NoteVue API</h1>
        <p>A simple API for creating, reading, updating and deleting notes and tasks.</p>
        <p>Checkout the API documentation at <a href="/api-docs">/api-docs</a></p>
      </body>
    </html>
  `);
})

const corsOptions = {
  origin: [
    'https://note-vue-three.vercel.app/',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://images.pexels.com']
    }
  }
}));
app.use(express.json());

// Dev logging middleware
if ('development' === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/', seoRoutes); // Add SEO routes at root level for robots.txt and sitemap.xml
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/notes', noteRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;