const dataBase = require('../initialize/dataBase.js');
const { pool } = dataBase.connectDataBase();

const userModel = {
  async getUserData(userId) {
    try {
      const queryToFindAccoutByID = `SELECT * FROM users WHERE id='${userId}'`;
      const resultOfAccount = await pool.query(queryToFindAccoutByID);
      const userData = resultOfAccount[0][0] ?? false;
      return userData;
    } catch (err) {
      throw err;
    }
  },

  async getUserEmail(name, phoneNumber) {
    try {
      const queryToFindEmailByNameAndPhone = `SELECT email FROM users 
        WHERE name="${name}" AND phoneNumber="${phoneNumber}" AND LoginMethod="local"`;
      const resultOfUserEmail = await pool.query(queryToFindEmailByNameAndPhone);
      const userEmail = resultOfUserEmail[0][0].email;
      return userEmail;
    } catch (err) {
      throw err;
    }
  },

  async getUserId(email) {
    try {
      const queryToFindIdByUserId = `SELECT id FROM users WHERE email="${email}"`;
      const resultOfUserId = await pool.query(queryToFindIdByUserId);
      const isValidEmail = resultOfUserId[0][0] !== undefined;
      if (!isValidEmail) {
        return false;
      }
      const userId = resultOfUserId[0][0].id;
      return userId;
    } catch (err) {
      throw err;
    }
  },

  async createUser(userData) {
    try {
      const {
        name,
        id,
        passwordHashed,
        salt,
        phoneNumber,
        loginMethod,
        defaultMaxContainerId,
        defaultMaxCardId,
      } = userData;
      const queryToSignUp = `INSERT INTO users 
    (name, email, password, salt, phoneNumber, LoginMethod, maxContainerId, maxCardId) 
    VALUES ('${name}', '${id}', '${passwordHashed}','${salt}' ,'${phoneNumber}', '${loginMethod}', ${defaultMaxContainerId}, ${defaultMaxCardId})`;
      await pool.query(queryToSignUp);
    } catch (err) {
      throw err;
    }
  },

  async changeUserPw(password, salt, userId) {
    try {
      const queryToChangePw = `update users set password = '${password}', salt = '${salt}' where id=${userId}`;
      await pool.query(queryToChangePw);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = userModel;
