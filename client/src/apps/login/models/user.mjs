import { customFetch } from '../../../utils/fetch.mjs';
import { PATH } from '../../../config/path.mjs';
import { ServerStatus } from '../../../config/serverStatus.mjs';

const { post, patch } = customFetch;

export const userModel = {
  async createUser(userData) {
    try {
      const { status } = await post(PATH.server_url + '/signUp', userData);
      if (status === ServerStatus.OK) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  },

  async getUserEmail(userData) {
    try {
      const { status, result } = await post(PATH.server_url + '/user/email', userData);
      if (status !== ServerStatus.OK) {
        return false;
      }
      return result.msg;
    } catch (err) {
      throw err;
    }
  },

  async getUserId(userData) {
    try {
      const { status, result } = await post(PATH.server_url + '/user/id', userData);
      if (status !== ServerStatus.OK) {
        return false;
      }
      return result.msg;
    } catch (err) {
      throw err;
    }
  },

  async changeUserPw(userData) {
    try {
      const { status } = await patch(PATH.server_url + '/user/password', userData);
      if (status !== ServerStatus.OK) {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  },
};
