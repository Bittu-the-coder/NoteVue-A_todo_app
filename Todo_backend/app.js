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