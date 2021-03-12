const serverMassage = require('../utils/massage/serverMassage.js');
const StatusCode = require('../utils/massage/StatusCode.js');
const errorHandler = require('../utils/errorHandler');
const containerService = require('../services/container');

const { createMsg } = serverMassage;

const containerController = {
  async getContainerData(request, response) {
    const userId = request.session.userId;
    const containerIdToFind = request.params.id;
    try {
      const containersData = await containerService.getContainerData(userId, containerIdToFind);
      const containersDataForJson = JSON.stringify(containersData);
      response.status(StatusCode.OK).json(containersDataForJson);
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },

  async deleteContainerData(request, response) {
    const userId = request.session.userId;
    const containerIdToDelete = request.params.id;
    try {
      containerService.deleteContainerData(userId, containerIdToDelete);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },

  async createContainerData(request, response) {
    const { name: containerName, containerIndex, userId: id } = request.body;
    const isValidUserId = id !== 0;
    const userId = !isValidUserId ? request.session.userId : id;
    const containerIdToAdd = request.params.id;
    const containerContents = { containerIdToAdd, containerName, containerIndex };
    try {
      containerService.createContainer(userId, containerContents);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      errorHandler(err, response, 'ERROR');
    }
  },

  async modifyContainerData(request, response) {
    const userId = request.session.userId;
    const containerIdToUpdate = request.params.id;
    const { name: containerName } = request.body;
    try {
      containerService.modifyContainer(userId, containerIdToUpdate, containerName);
      response.status(StatusCode.OK).json(createMsg('SUCCESS'));
    } catch (err) {
      rerrorHandler(err, response, 'ERROR');
    }
  },
};

module.exports = containerController;
