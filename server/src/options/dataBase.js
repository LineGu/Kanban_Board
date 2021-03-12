const config = require('../config/index');

const DBoptions = {
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.database,
};

module.exports = DBoptions;
