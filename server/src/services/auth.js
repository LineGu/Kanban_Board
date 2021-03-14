const userModel = require('../models/user');
const password = require('../utils/password.js');
const { makePasswordHashed } = password;

const authService = {
  async logInWithLocal(idOfInput, plainPassword) {
    try {
      const userId = await userModel.getUserId(idOfInput);
      if (!userId) {
        return { resultMsg: 'NO ID' };
      }
      const userData = await userModel.getUserData(userId);
      const passwordHashed = await makePasswordHashed(plainPassword, userData.salt);
      const isValidPassword = userData.password === passwordHashed;
      if (!isValidPassword) {
        return { resultMsg: 'NO PASSWORD' };
      }
      return { resultMsg: 'SUCCESS', name: userData.name, id: userData.id };
    } catch (err) {
      throw err;
    }
  },

  async logInWithSocial(idOfInput) {
    try {
      const userId = await userModel.getUserId(idOfInput);
      const userData = await userModel.getUserData(userId);
      if (!userData) {
        return { resultMsg: 'NOT USER' };
      }
      return { resultMsg: 'LOGIN SUCCESS', name: userData.name, id: userData.id };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = authService;
