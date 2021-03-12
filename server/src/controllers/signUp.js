const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const userService = require('../services/user');
const errorHandler = require('../utils/errorHandler');

const { createMsg } = serverMassage;

const signUpController = {
  async signUp(request, response) {
    try {
      const { name, id, pw, phoneNumber, loginMethod } = request.body;
      const userData = { name, id, pw, phoneNumber, loginMethod };
      await userService.createUser(userData);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response);
    }
  },

  async checkOverlapOfId(request, response) {
    try {
      const { id: inputId } = request.body;
      const user = await userService.getUserData(inputId);
      if (!user) {
        response.status(StatusCode.OK).json(createMsg('AVAILABLE'));
        return;
      }
      response.status(StatusCode.OK).json(createMsg('UNAVAILABLE'));
    } catch (err) {
      errorHandler(err, response);
    }
  },
};

module.exports = signUpController;
