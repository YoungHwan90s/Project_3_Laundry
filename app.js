const express = require('express');
const { Server } = require("http");
const app = express();
const http = Server(app);
const router = require('./routes');

app.use(express.json());
app.use('/api', express.urlencoded({ extended: false }), router);
app.use(express.static("assets"));

module.exports = http;