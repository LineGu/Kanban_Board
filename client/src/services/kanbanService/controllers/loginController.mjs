import { cardContainers } from '../models/card_data.mjs';
import { currentUser } from '../models/user_data.mjs';
import { PATH } from '../../../config/path.mjs';
import { ServerStatus } from '../../../config/serverStatus.mjs';
import { customFetch } from '../../../utils/fetch.mjs';

const { get } = customFetch;

export const loginController = {
  async getDataForInit() {
    try {
      const { status, result: userData } = await get(PATH.server_url + '/user');
      if (status === ServerStatus.CLIENT_ERROR) {
        window.location.href = PATH.login_page;
        alert('로그인이 필요한 서비스입니다.');
        return;
      }
      const { card: userCardContainers, user: newCurrentUser } = userData;
      this.initData(newCurrentUser, userCardContainers);
    } catch (err) {
      window.location.href = PATH.main_page;
    }
  },

  async logout() {
    try {
      const { status } = await get(PATH.server_url + '/auth/logout');
      if (status === ServerStatus.OK) {
        window.location.href = PATH.login_page;
        //무슨 로그인인지 판단해서 로컬스토리지로 로그인 페이지로 보낸 후 구글 로그아웃 예외처리도 좋을듯.
      }
    } catch (err) {
      console.log(err);
      alert('서버에러로 인해 로그아웃 실패, 다시 시도해주세요.');
    }
  },

  initData(newCurrentUser, userCardContainers) {
    currentUser.name = newCurrentUser.name;
    currentUser.maxContainerId = newCurrentUser.maxContainerId;
    currentUser.maxCardId = newCurrentUser.maxCardId;
    userCardContainers.forEach((userCardContainer) => {
      cardContainers.push(userCardContainer);
    });
  },
};
