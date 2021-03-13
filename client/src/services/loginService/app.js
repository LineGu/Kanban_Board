import { authController } from './controllers/authController.mjs';
import { domControllerInitializer } from './controllers/dom/init.mjs';
import { googleLoginControll } from './controllers/googleLogin.js';

const initLoginPage = async () => {
  authController.init();
  domControllerInitializer.init();
  await googleLoginControll.init();
};

window.addEventListener('DOMContentLoaded', initLoginPage);
