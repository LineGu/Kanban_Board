const userModel = require('../models/user');
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
    } catch (err) {
      throw err;
    }
  },

  async getUserData(userEmail) {
    try {
      const userId = await userModel.getUserId(userEmail);
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
};

module.exports = userService;
