const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const router = require('./routes');

const app = express();
//test
app.use(express.json());
app.use(cors());
app.use('/.netlify/functions/api',router);

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports.handler = serverless(app);