const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const errorHandler = require('../utils/errorHandler');
const cardService = require('../services/card.js');

const { createMsg } = serverMassage;

const cardController = {
  async getCardData(request, response) {
    const userId = request.session.userId;
    const { containerId: containerIdToFind, cardId: cardIdToFind } = request.params;
    try {
      const cardData = await cardService.getCardData(userId, containerIdToFind, cardIdToFind);
      const cardsDataForJson = JSON.stringify(cardData);
      response.status(StatusCode.OK).json(cardsDataForJson);
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },

  async deleteCardData(request, response) {
    const userId = request.session.userId;
    const cardIdToDelete = request.params.cardId;
    try {
      await cardService.deleteCard(userId, cardIdToDelete);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },

  async createCardData(request, response) {
    const { cardId: cardIdToAdd, containerId } = request.params;
    const { header, body, footer, cardIndex, userId: id } = request.body;
    const isValidUserId = id !== 0;
    const userId = !isValidUserId ? request.session.userId : id;
    try {
      const cardContents = { header, body, footer, cardIndex };
      await cardService.createCard(userId, containerId, cardIdToAdd, cardContents);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },

  async modifyCardData(request, response) {
    const userId = request.session.userId;
    const cardIdToUpdate = request.params.cardId;
    const { header, body } = request.body;
    const cardData = { header, body, cardIdToUpdate };
    try {
      cardService.updateCard(userId, cardData);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },
};

module.exports = cardController;
