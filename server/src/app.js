const express = require('express');
const initializer = require('./initialize/index');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.kanban.kro.kr/fullchain.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.kanban.kro.kr/privkey.pem'),
};

const startServer = () => {
  const app = express();
  const { SERVER_PORT } = process.env;

  initializer(app);
  app.set('trust proxy', 1);

  https.createServer(sslOptions, app, (req, res) => {}).listen(SERVER_PORT, () => {});
};

startServer();
