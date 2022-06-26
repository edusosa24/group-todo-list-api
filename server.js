const express = require('express');
const dotenv = require('dotenv');

// Importing routes
const groups = require('./routes/groups');

// Loading env variables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

const app = express();

//                                ROUTES

app.use('/api/v1/groups', groups);

//                        -------------------------

app.listen(PORT, console.log(`MODE:${process.env.NODE_ENV}  PORT:${PORT}`));
