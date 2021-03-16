import { social } from '../../../../config/social.mjs';
import { authModel } from '../../models/auth.mjs';
import { loginServiceView } from '../../views/index.mjs';
import { userController } from '../user/index.mjs';
import { massage } from '../../../../config/massage.mjs';

export const kakaoLoginController = {
  async init() {
    try {
      await Kakao.init(social.kakaoClientId);
      const isLogined = !!Kakao.Auth.getAccessToken();
      if (isLogined) await Kakao.Auth.logout();
    } catch (err) {
      //loginServiceView.goLoginPage();
      console.log(err);
    }
  },

  async logInWithKakao() {
    try {
      const loginOptions = { scope: 'profile', success: () => this.controllAfterLogin() };
      await Kakao.Auth.login(loginOptions);
    } catch (err) {
      console.log(err);
    }
  },

  async controllAfterLogin() {
    try {
      const requestOptions = {
        url: '/v2/user/me',
        success: (res) => this.controllAfterGetUser(res),
      };
      await Kakao.API.request(requestOptions);
    } catch (err) {
      console.log(err);
    }
  },

  async controllAfterGetUser(res) {
    try {
      const userData = await this.getUserData(res);
      await this.loginForUser(userData);
    } catch (err) {
      console.log(err);
    }
  },

  async loginForUser(userData) {
    const { id: userId } = userData;
    const isVaildUser = await authModel.checkUserToLogin(userId, 'kakao');
    if (isVaildUser) {
      loginServiceView.goMainPage();
      return;
    }
    const isPositiveToSignUp = confirm(massage.google_signup);
    if (isPositiveToSignUp) {
      await this.signUpForKakao(userData);
    }
  },

  async getUserData(res) {
    const { id } = res;
    const { nickname } = res.properties;
    return { id, loginMethod: 'kakao', pw: '', phoneNumber: '', name: nickname };
  },

  async signUpForKakao(userData) {
    await userController.createNewAccount(userData);
  },
};
