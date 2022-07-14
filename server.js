const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Loading env variables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

// Connecting to DB
connectDB();

// Importing routes
const lists = require('./routes/lists');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/lists', lists);
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`MODE:${process.env.NODE_ENV}  PORT:${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
