import { authController } from './controllers/authController.mjs';
import { loginPageController } from './controllers/loginPageController.mjs';
import { googleLoginControll } from './controllers/googleLogin.js';

const initLoginPage = async () => {
  authController.init();
  loginPageController.init();
  await googleLoginControll.init();
};

window.addEventListener('DOMContentLoaded', initLoginPage);
