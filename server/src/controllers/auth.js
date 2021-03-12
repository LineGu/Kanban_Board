const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const sessionMaker = require('../utils/sessionMaker.js');
const authService = require('../services/auth');

const { createMsg } = serverMassage;

const authController = {
  async logInWithLocal(request, response) {
    const { id: idOfInput, password: plainPassword } = request.body;
    const isLogined = request.session.isLogined;
    if (isLogined) {
      response.status(StatusCode.OK).json(createMsg('ALEADY LOGIN'));
      return;
    }
    try {
      const { resultMsg, name, id } = await authService.logInWithLocal(idOfInput, plainPassword);
      const status = resultMsg === 'SUCCESS' ? StatusCode.OK : StatusCode.CLIENT_ERROR;
      if (status === StatusCode.OK) {
        sessionMaker.createSession(request.session, true, name, id, 'local');
      }
      response.status(status).json(createMsg(resultMsg));
    } catch (err) {
      response.status(StatusCode.SERVER_ERROR).json({ error: err });
    }
  },

  async logInWithSocial(request, response) {
    const { id: userId, loginMethod } = request.body;
    try {
      const { resultMsg, name, id } = await authService.logInWithSocial(userId);
      if (resultMsg === 'LOGIN SUCCESS') {
        sessionMaker.createSession(request.session, true, name, id, loginMethod);
      }
      response.status(StatusCode.OK).json(createMsg(resultMsg));
    } catch (err) {
      response.status(StatusCode.SERVER_ERROR).json({ error: err });
    }
  },

  tryLogout(request, response) {
    request.session.destroy();
    response.clearCookie('loginCookie');
    response.status(StatusCode.OK).json(createMsg('LOGOUT SUCCESS'));
  },
};

module.exports = authController;
