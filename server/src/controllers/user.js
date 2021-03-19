const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const errorHandler = require('../utils/errorHandler');
const userService = require('../services/user');

const { createMsg } = serverMassage;

const userDataController = {
  async getUserDataForInit(request, response) {
    const { isLogined, userId } = request.session;
    const isVaildLogin = isLogined === undefined ? false : true;
    if (!isVaildLogin) {
      response.status(StatusCode.CLIENT_ERROR).json();
      return;
    }
    try {
      const userData = await userService.getUserDataForInit(userId);
      const userDataJson = JSON.stringify(userData);
      response.status(StatusCode.OK).json(userDataJson);
    } catch (err) {
      errorHandler(err, response);
    }
  },

  async getUserEmail(request, response) {
    const { name, phoneNumber } = request.body;
    try {
      const userEmail = await userService.getUserEmail(name, phoneNumber);
      response.status(StatusCode.OK).json(createMsg(userEmail));
    } catch (err) {
      errorHandler(err, response);
    }
  },

  async getUserId(request, response) {
    const { id } = request.body;
    try {
      const userId = await userService.getUserId(id);
      response.status(StatusCode.OK).json(createMsg(userId));
    } catch (err) {
      errorHandler(err, response, 'INVAILD');
    }
  },
};

module.exports = userDataController;
