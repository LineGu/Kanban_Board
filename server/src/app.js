const express = require('express');
const initializer = require('./initialize/index');
require('dotenv').config();

const startServer = () => {
  const app = express();
  const { SERVER_PORT } = process.env;

  initializer(app);
  app.set('trust proxy', 1);

  app.listen(SERVER_PORT, () => {});
};

startServer();
