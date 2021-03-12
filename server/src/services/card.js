const cardModel = require('../models/card');

const cardService = {
  async getCardData(userId, containerIdToFind, cardIdToFind) {
    try {
      const cardData = await cardModel.getCardData(userId, containerIdToFind, cardIdToFind);
      return cardData;
    } catch (err) {
      throw err;
    }
  },

  async deleteCard(userId, cardIdToDelete) {
    try {
      await cardModel.deleteCard(userId, cardIdToDelete);
    } catch (err) {
      throw err;
    }
  },

  async createCard(userId, containerId, cardIdToAdd, cardContents) {
    try {
      await cardModel.createCard(userId, containerId, cardIdToAdd, cardContents);
    } catch (err) {
      throw err;
    }
  },

  async updateCard(userId, cardData) {
    try {
      await cardModel.updateCard(userId, cardData);
    } catch (err) {
      throw err;
    }
  },

  async moveCard(userId, moveData) {
    try {
      await cardModel.moveCard(userId, moveData);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = cardService;
