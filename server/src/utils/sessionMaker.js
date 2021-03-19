const cookieOptions = require('../options/cookie.js');
const sessionMaker = {
  createSession(session, isLogined, name, userId, loginMethod) {
    session.isLogined = isLogined;
    session.name = name;
    session.userId = userId;
    session.loginMethod = loginMethod;
    session.cookie = cookieOptions;
  },
};

module.exports = sessionMaker;
