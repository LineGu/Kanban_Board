const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const errorHandler = require('../utils/errorHandler');
const userService = require('../services/user');

const { createMsg } = serverMassage;

const passwordController = {
  async changePassword(request, response) {
    const { newPw, userId } = request.body;
    try {
      await userService.changeUserPw(newPw, userId);
      response.status(StatusCode.OK).json(createMsg(`SUCCESS`));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },
};

module.exports = passwordController;
