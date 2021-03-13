import { authInitiallizer } from './controllers/auth/init.mjs';
import { domControllerInitializer } from './controllers/dom/init.mjs';
import { googleLoginControll } from './controllers/auth/googleLogin.js';
import { loginServiceView } from './views/index.mjs';

const initLoginPage = async () => {
  authInitiallizer.init();
  domControllerInitializer.init();
  loginServiceView.init();
  await googleLoginControll.init();
};

window.addEventListener('DOMContentLoaded', initLoginPage);
