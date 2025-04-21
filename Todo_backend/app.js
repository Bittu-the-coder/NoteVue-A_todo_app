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

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Notes API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Notes API</h1>
        <p>A simple API for creating, reading, updating and deleting notes.</p>
        <p>Checkout the API documentation at <a href="/api-docs">/api-docs</a></p>
      </body>
    </html>
  `);
})

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Dev logging middleware
if ('development' === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/notes', noteRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;