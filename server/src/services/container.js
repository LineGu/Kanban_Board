const { moveContainer } = require('../models/container');
const containerModel = require('../models/container');

const containerService = {
  async getContainerData(userId, containerIdToFind) {
    try {
      const containersData = await containerModel.getContainerData(userId, containerIdToFind);
      return containersData;
    } catch (err) {
      throw err;
    }
  },

  async deleteContainerData(userId, containerIdToDelete) {
    try {
      await containerModel.deleteContainerData(userId, containerIdToDelete);
    } catch (err) {
      throw err;
    }
  },

  async createContainer(userId, containerContents) {
    try {
      await containerModel.createContainer(userId, containerContents);
    } catch (err) {
      throw err;
    }
  },

  async modifyContainer(userId, containerIdToUpdate, containerName) {
    try {
      await containerModel.modifyContainer(userId, containerIdToUpdate, containerName);
    } catch (err) {
      throw err;
    }
  },

  async moveContainer(userId, moveData) {
    try {
      await containerModel.moveContainer(userId, moveData);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = containerService;
