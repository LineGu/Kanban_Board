const cardModel = require('../models/card');
const userModel = require('../models/user');
const containerModel = require('../models/container');
const password = require('../utils/password.js');

const { createHashedPassword } = password;

const userService = {
  async getUserBaseData(userId) {
    try {
      const { name, maxContainerId, maxCardId } = await userModel.getUserData(userId);
      const userData = { name, maxContainerId, maxCardId };
      return userData;
    } catch (err) {
      throw err;
    }
  },

  async getUserEmail(name, phoneNumber) {
    try {
      const userEmail = await userModel.getUserEmail(name, phoneNumber);
      return userEmail;
    } catch (err) {
      throw err;
    }
  },

  async getUserId(id) {
    try {
      const userId = await userModel.getUserId(id);
      return userId;
    } catch (err) {
      throw err;
    }
  },

  async createUser(userData) {
    try {
      const { name, id, pw, phoneNumber, loginMethod } = userData;
      const { password: passwordHashed, salt } = await createHashedPassword(pw);
      const defaultMaxContainerId = 2;
      const defaultMaxCardId = 0;

      const userDataToInsert = {
        name,
        id,
        passwordHashed,
        salt,
        phoneNumber,
        loginMethod,
        defaultMaxContainerId,
        defaultMaxCardId,
      };

      await userModel.createUser(userDataToInsert);
      const userId = await userModel.getUserId(id);
      const containerFirstContent = {
        containerIdToAdd: 0,
        containerName: '할 일',
        containerIndex: 0,
      };
      console.log(1);
      await containerModel.createContainer(userId, containerFirstContent);
      const containerSecondContent = {
        containerIdToAdd: 1,
        containerName: '진행 중',
        containerIndex: 1,
      };
      console.log(2);
      await containerModel.createContainer(userId, containerSecondContent);
      const containerThirdContent = {
        containerIdToAdd: 2,
        containerName: '완료',
        containerIndex: 2,
      };
      console.log(3);
      await containerModel.createContainer(userId, containerThirdContent);
      const cardContents = {
        header: '해야할 일을 입력해보세요!',
        body: '구체적인 내용을 입력하세요! 그 후에 이 카드를 드래그해서 진행 중으로 옮겨보세요~',
        footer: '사용자님의 닉네임이 들어갑니다!',
        cardIndex: 0,
      };
      console.log(4);
      await cardModel.createCard(userId, 0, 0, cardContents);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async getUserData(userEmail) {
    try {
      const userId = await userModel.getUserId(userEmail);
      if (!userId) {
        return false;
      }
      const userData = await userModel.getUserData(userId);
      return userData;
    } catch (err) {
      throw err;
    }
  },

  async changeUserPw(newPw, userId) {
    try {
      const { password, salt } = await createHashedPassword(newPw);
      await userModel.changeUserPw(password, salt, userId);
    } catch (err) {
      throw err;
    }
  },

  async getUserDataForInit(userId) {
    try {
      const userData = await userModel.getUserData(userId);
      const containers = await containerModel.getContainerData(userId, 'all');
      for (const container of containers) {
        const containerId = container.id;
        const cardsOfContainer = await cardModel.getCardData(userId, containerId, 'all');
        container.cards = cardsOfContainer;
      }
      const userDataForInit = { user: userData, card: containers };
      return userDataForInit;
    } catch (err) {
      throw err;
    }
  },
};
const userData = { name: 'dd', id: 'dd', pw: 'dd', phoneNumber: 'dd', loginMethod: 'dd' };
userService.createUser(userData);
module.exports = userService;
