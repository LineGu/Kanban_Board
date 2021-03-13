import { loginServiceView } from '../../views/index.mjs';
import { authModel } from '../../models/auth.mjs';
import { googleLoginControll } from './googleLogin.js';
import { kakaoLoginController } from './kakaoLogin.js';

export const authController = {
  attachLoginHandler() {
    const { loginButtonElem } = this;

    loginButtonElem.addEventListener('click', async (event) => {
      event.stopPropagation();
      const { inputElemForId, inputElemForPw } = authController;
      const { value: inputId } = inputElemForId;
      const { value: inputPassword } = inputElemForPw;
      const isValidInput = inputId !== '' && inputPassword !== '';
      if (!isValidInput) return;

      try {
        const userData = { id: inputId, password: inputPassword };
        const resultOfLogin = await authModel.checkIdPassword(userData);
        const isSuccessLogin = resultOfLogin === 'SUCCESS' ? true : false;
        if (isSuccessLogin) {
          loginServiceView.goMainPage();
        }

        switch (resultOfLogin) {
          case 'ALEADY LOGIN':
            loginServiceView.showAleadyLogin();
            return;

          case 'NO ID':
            loginServiceView.showInvalidId();
            return;

          case 'NO PASSWORD':
            loginServiceView.showInvalidPw();
            return;
        }
      } catch (err) {
        console.log(err);
      }
    });
  },

  attachLoginWithGoogleHandler() {
    const { googleLoginButtonElem } = this;
    googleLoginButtonElem.addEventListener('click', async (event) => {
      event.preventDefault();
      await googleLoginControll.signIn();
    });
  },

  attachLoginWithKakaoHandler() {
    const { kakaoLoginButtonElem } = this;
    kakaoLoginButtonElem.addEventListener('click', (event) => {
      kakaoLoginController.init();
      event.stopPropagation();
      event.preventDefault();
    });
  },
};
