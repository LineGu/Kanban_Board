const dotenv = require('dotenv');

const envFound = dotenv.config({ path: '../../../.env' });
if (envFound.error) {
  throw new Error(envFound.error);
}

const env = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  database: process.env.DB_DB,
  sessionName: process.env.SESSION_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  sessionResave: process.env.SESSION_RESAVE,
  sessionSaveUninitialized: process.env.SESSION_ISINITIALIZE,
  googleClientId: process.env.GOOGLE_CLIENT,
};

module.exports = env;
