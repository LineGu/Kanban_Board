const dataBase = require('../initialize/dataBase.js');
const { sessionStore } = dataBase.connectDataBase();
const config = require('../config/index');
const cookieOptions = require('./cookie');

const sessionOptions = {
  name: config.sessionName,
  secret: config.sessionSecret,
  resave: config.sessionResave,
  saveUninitialized: config.sessionSaveUninitialized,
  store: sessionStore,
  cookie: cookieOptions,
};

module.exports = sessionOptions;
