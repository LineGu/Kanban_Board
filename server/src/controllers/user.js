const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const errorHandler = require('../utils/errorHandler');
const userService = require('../services/user');

const { createMsg } = serverMassage;

const userDataController = {
  async getUserData(request, response) {
    const { userId } = request.session;
    const isLogined = userId === undefined ? false : true;
    if (!isLogined) {
      response.status(StatusCode.OK).json(createMsg('INVALID USER'));
      return;
    }
    try {
      const userData = await userService.getUserBaseData(userId);
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
      errorHandler(err, response, 'NO ID');
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
