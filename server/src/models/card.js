const dataBase = require('../initialize/dataBase.js');
const { pool } = dataBase.connectDataBase();

const cardModel = {
  async getCardData(userId, containerIdToFind, cardIdToFind) {
    try {
      const queryToGetCard =
        cardIdToFind === 'all'
          ? `SELECT card.cardId AS id,card.header,card.body,card.footer 
          FROM card  JOIN container WHERE container.containerId = ${containerIdToFind} AND 
          container.id = card.containerId AND container.userId = ${userId} ORDER BY card.cardIndex;`
          : `SELECT card.cardId AS id,card.header,card.body,card.footer 
          FROM card  JOIN container WHERE container.containerId = ${containerIdToFind} AND 
          container.id = card.containerId AND container.userId = ${userId} AND card.cardId = ${cardIdToFind} ORDER BY card.cardIndex;`;
      const resultOfCard = await pool.query(queryToGetCard);
      const cardsData = resultOfCard[0];
      return cardsData;
    } catch (err) {
      throw err;
    }
  },

  async deleteCard(userId, cardIdToDelete) {
    try {
      const queryToFindCardIndexAndContainerIdOfDB = `SELECT cardIndex,containerId FROM card WHERE userId=${userId} AND cardId=${cardIdToDelete}`;
      const CardIndexAndContainerIdOfDB = await pool.query(queryToFindCardIndexAndContainerIdOfDB);
      const { cardIndex, containerId } = CardIndexAndContainerIdOfDB[0][0];

      const queryToRefreshIndex = `update card set cardIndex = cardIndex - 1 where userId = ${userId} AND containerId = ${containerId} AND cardIndex > ${cardIndex}`;
      await pool.query(queryToRefreshIndex);

      const queryToDeleteCard = `DELETE FROM card WHERE userId=${userId} AND cardId=${cardIdToDelete}`;
      await pool.query(queryToDeleteCard);

      const queryToChangeCount = `UPDATE container SET count = count - 1 WHERE userId = ${userId} AND id=${containerId};`;
      await pool.query(queryToChangeCount);
    } catch (err) {
      throw err;
    }
  },

  async createCard(userId, containerId, cardIdToAdd, cardContents) {
    try {
      const { header, body, footer, cardIndex } = cardContents;
      const queryToSelectContainerIdOfDB = `select id from container where userId=${userId} AND containerId=${containerId}`;
      const resultOfIdOfDB = await pool.query(queryToSelectContainerIdOfDB);
      const containerIdOfDB = resultOfIdOfDB[0][0].id;

      const queryToRefreshIndex = `update card set cardIndex = cardIndex + 1 where userId = ${userId} AND containerId = ${containerIdOfDB} AND cardIndex >= ${cardIndex}`;
      await pool.query(queryToRefreshIndex);

      const queryToAddCardContainer = `INSERT INTO card(userId,containerId,cardId,header,body,footer,cardIndex)
         VALUES (${userId},${containerIdOfDB},${cardIdToAdd},'${header}','${body}','${footer}',${cardIndex})`;
      await pool.query(queryToAddCardContainer);

      const queryToChangeCount = `UPDATE container SET count = count + 1 WHERE userId = ${userId} AND id=${containerIdOfDB};`;
      await pool.query(queryToChangeCount);

      const queryToChangeMaxContainerId = `UPDATE users SET maxCardId = ${cardIdToAdd} WHERE id = ${userId};`;
      await pool.query(queryToChangeMaxContainerId);
    } catch (err) {
      throw err;
    }
  },

  async updateCard(userId, cardData) {
    try {
      const { header, body, cardIdToUpdate } = cardData;
      const queryToUpdateCard = `update card set header = '${header}', body = '${body}' where userId = ${userId} AND cardId = ${cardIdToUpdate}`;
      await pool.query(queryToUpdateCard);
    } catch (err) {
      throw err;
    }
  },

  async moveCard(userId, moveData) {
    try {
      const { idOfCardMoved, indexsOfStart, indexsToGo } = moveData;
      const queryToHideCardToMove = `update card set cardIndex = -1 where userId = ${userId} AND cardId = ${idOfCardMoved}`;
      await pool.query(queryToHideCardToMove);

      const getStartedContainerIdOfDB = `select containerId from card where userId = ${userId} AND cardId = ${idOfCardMoved}`;
      const StartedContainerIdOfDBResult = await pool.query(getStartedContainerIdOfDB);
      const StartedContainerIdOfDB = await StartedContainerIdOfDBResult[0][0].containerId;

      const updateStartedContainerCount = `UPDATE container SET count = count - 1 WHERE userId = ${userId} AND id = ${StartedContainerIdOfDB}`;
      await pool.query(updateStartedContainerCount);

      const queryToSubIndexAfterContainerStarted = `update card set cardIndex = cardIndex - 1 where userId = ${userId} AND containerId = ${StartedContainerIdOfDB} AND cardIndex > ${indexsOfStart[1]}`;
      await pool.query(queryToSubIndexAfterContainerStarted);

      ///집은 카드가 삭제된 것 처럼 됨.

      const getArrivedContainerIdOfDB = `select id from container where userId = ${userId} AND containerIndex = ${indexsToGo[0]}`;
      const ArrivedContainerIdOfDBResult = await pool.query(getArrivedContainerIdOfDB);
      const ArrivedContainerIdOfDB = await ArrivedContainerIdOfDBResult[0][0].id;

      const updateArrivedContainerCount = `UPDATE container SET count = count + 1 WHERE userId = ${userId} AND id = ${ArrivedContainerIdOfDB}`;
      await pool.query(updateArrivedContainerCount);

      const queryToAddIndexAfterContainerToGo = `update card set cardIndex = cardIndex + 1 where userId = ${userId} AND containerId = ${ArrivedContainerIdOfDB} AND cardIndex >= ${indexsToGo[1]}`;
      await pool.query(queryToAddIndexAfterContainerToGo);

      // 갈 곳에 정착한 것처럼 행동

      const queryToUpdateContainerIndex = `update card set cardIndex = '${indexsToGo[1]}', containerId = ${ArrivedContainerIdOfDB} where userId = ${userId} AND cardId = ${idOfCardMoved}`;
      await pool.query(queryToUpdateContainerIndex);

      // 집은 카드 인덱스 제대로 설정
    } catch (err) {
      throw err;
    }
  },
};

module.exports = cardModel;
