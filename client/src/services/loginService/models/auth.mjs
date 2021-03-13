import { customFetch } from '../../../utils/fetch.mjs';
import { PATH } from '../../../config/path.mjs';
import { ServerStatus } from '../../../config/serverStatus.mjs';

const { get, post, patch } = customFetch;

export const authModel = {
  async checkIdPassword(userData) {
    try {
      const { status, result } = await post(PATH.server_url + '/auth/login', userData);
      if (status === ServerStatus.OK) {
        return result.msg;
      }
      return false;
    } catch (err) {
      throw err;
    }
  },
};
