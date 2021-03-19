import { PATH } from '../../../config/path.mjs';
import { visualController } from '../../../utils/visualController.mjs';
import { loginController } from '../../kanban/controllers/loginController.mjs';
import { massage } from '../../../config/massage.mjs';

const { go } = visualController;

export const loginServiceView = {
  init() {
    loginServiceView.inputElemForId = document.querySelector('#id');
    loginServiceView.inputElemForPw = document.querySelector('#pw');
  },

  resetValue(...elems) {
    console.log(elems);
    elems.forEach((elem) => {
      elem.value = '';
    });
  },

  goMainPage() {
    go(PATH.main_page);
  },

  goLoginPage() {
    go(PATH.login_page);
  },

  showAleadyLogin() {
    const userWantToLogout = confirm(massage.aleady_login);
    if (userWantToLogout) {
      loginController.logout();
      return;
    }
    window.location.href = PATH.main_page;
    return;
  },

  showInvalidId() {
    alert(massage.invaild_id);
    const { inputElemForId, inputElemForPw } = loginServiceView;
    loginServiceView.resetValue(inputElemForId, inputElemForPw);
    inputElemForId.focus();
  },

  showInvalidPw() {
    alert(massage.invaild_pw);
    const { inputElemForPw } = loginServiceView;
    loginServiceView.resetValue(inputElemForPw);
    inputElemForPw.focus();
  },
};
