const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const errorHandler = require('../utils/errorHandler');
const cardService = require('../services/card.js');

const { createMsg } = serverMassage;

const cardIndexController = {
  async changeCardIndex(request, response) {
    const userId = request.session.userId;
    const idOfCardMoved = request.params.idOfCard;
    const { indexsOfStart, indexsToGo } = request.body;
    const moveData = { idOfCardMoved, indexsOfStart, indexsToGo };
    try {
      cardService.moveCard(userId, moveData);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },
};

module.exports = cardIndexController;
