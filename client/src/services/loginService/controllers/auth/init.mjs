import { authController } from './index.mjs';

export const authInitiallizer = {
  init() {
    this.authControllerInit();
  },

  authControllerInit() {
    authController.loginButtonElem = document.querySelector('#login');
    authController.formForLoginElem = document.querySelector('.login-button');
    authController.inputElemForId = document.querySelector('#id');
    authController.inputElemForPw = document.querySelector('#pw');
    authController.googleLoginButtonElem = document.querySelector('#google');
    authController.kakaoLoginButtonElem = document.querySelector('#kakao');

    authController.attachLoginHandler();
    authController.attachLoginWithGoogleHandler();
    authController.attachLoginWithKakaoHandler();
  },
};
