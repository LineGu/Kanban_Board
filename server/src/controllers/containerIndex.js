const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const errorHandler = require('../utils/errorHandler');
const containerService = require('../services/container.js');

const { createMsg } = serverMassage;

const containerIndexController = {
  async changeContainerIndex(request, response) {
    const userId = request.session.userId;
    const idOfContainerMoved = request.params.idOfContainerMoved;
    const { indexOfStart, indexToGo } = request.body;
    const moveData = { idOfContainerMoved, indexOfStart, indexToGo };
    try {
      await containerService.moveContainer(userId, moveData);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },
};

module.exports = containerIndexController;
