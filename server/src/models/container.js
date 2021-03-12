const dataBase = require('../initialize/dataBase.js');
const { pool } = dataBase.connectDataBase();

const containerModel = {
  async getContainerData(userId, containerIdToFind) {
    try {
      const queryToGetCardContainer =
        containerIdToFind === 'all'
          ? `SELECT containerId AS id,name,count FROM container WHERE userId=${userId} ORDER BY containerIndex`
          : `SELECT containerId AS id,name,count FROM container WHERE userId=${userId} AND containerId=${containerIdToFind} ORDER BY containerIndex`;

      const resultOfContainer = await pool.query(queryToGetCardContainer);
      const containersData = resultOfContainer[0];
      return containersData;
    } catch (err) {
      throw err;
    }
  },

  async deleteContainerData(userId, containerIdToDelete) {
    try {
      const queryToFindContainerIndex = `SELECT containerIndex FROM container WHERE userId=${userId} AND containerId=${containerIdToDelete}`;
      const containerIndexResult = await pool.query(queryToFindContainerIndex);
      const containerIndex = containerIndexResult[0][0].containerIndex;

      const queryToRefreshIndex = `update container set containerIndex = containerIndex - 1 where userId = ${userId} AND containerIndex > ${containerIndex}`;
      await pool.query(queryToRefreshIndex);

      const queryToDeleteCardContainer = `DELETE FROM container WHERE userId=${userId} AND containerId=${containerIdToDelete}`;
      await pool.query(queryToDeleteCardContainer);
    } catch (err) {
      throw err;
    }
  },

  async createContainer(userId, containerContents) {
    try {
      const { containerIdToAdd, containerName, containerIndex } = containerContents;
      const queryToAddCardContainer = `INSERT INTO container(userId,containerId,name,count,containerIndex) 
        VALUES (${userId},${containerIdToAdd},'${containerName}',0,${containerIndex})`;
      await pool.query(queryToAddCardContainer);
      const queryToChangeMaxContainerId = `UPDATE users SET maxContainerId = ${containerIdToAdd} WHERE id = ${userId};`;
      await pool.query(queryToChangeMaxContainerId);
    } catch (err) {
      throw err;
    }
  },

  async modifyContainer(userId, containerIdToUpdate, containerName) {
    try {
      const queryToUpdateContainer = `update container set name = '${containerName}' where userId = ${userId} AND containerId = ${containerIdToUpdate}`;
      await pool.query(queryToUpdateContainer);
    } catch (err) {
      throw err;
    }
  },

  async moveContainer(userId, moveData) {
    try {
      const { idOfContainerMoved, indexOfStart, indexToGo } = moveData;
      const queryToHideContainerToUpdate = `update container set containerIndex = -1 where userId = ${userId} AND containerId = ${idOfContainerMoved}`;
      await pool.query(queryToHideContainerToUpdate);

      const queryToSubIndexAfterContainerStarted = `update container set containerIndex = containerIndex - 1 where userId = ${userId} AND containerIndex > ${indexOfStart}`;
      await pool.query(queryToSubIndexAfterContainerStarted);

      const queryToAddIndexAfterContainerToGo = `update container set containerIndex = containerIndex + 1 where userId = ${userId} AND containerIndex >= ${indexToGo}`;
      await pool.query(queryToAddIndexAfterContainerToGo);

      const queryToUpdateContainerIndex = `update container set containerIndex = ${indexToGo} where userId = ${userId} AND containerId = ${idOfContainerMoved}`;
      await pool.query(queryToUpdateContainerIndex);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = containerModel;
