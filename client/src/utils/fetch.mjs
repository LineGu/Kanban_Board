import { http } from '../config/http.mjs';
import { ServerStatus } from '../config/serverStatus.mjs';

export const customFetch = {
  async get(url) {
    try {
      const result = await fetch(url, http.get);

      if (result.status === ServerStatus.CLIENT_ERROR) {
        return { status: ServerStatus.CLIENT_ERROR, result: undefined };
      }
      const resultJson = await result.json();
      const resultObject = JSON.parse(resultJson);

      return { status: ServerStatus.OK, result: resultObject };
    } catch (err) {
      throw err;
    }
  },
};
