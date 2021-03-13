import { PATH } from '../../../config/path.mjs';
import { visualController } from '../../../utils/visualController.mjs';
import { loginController } from '../../kanbanService/controllers/loginController.mjs';

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

  showAleadyLogin() {
    const userWantToLogout = confirm('이미 로그인이 된 계정이 있습니다. 로그아웃하시겠습니까?');
    if (userWantToLogout) {
      loginController.logout();
      return;
    }
    window.location.href = PATH.main_page;
    return;
  },

  showInvalidId() {
    alert('일치하는 아이디가 없습니다.');
    const { inputElemForId, inputElemForPw } = loginServiceView;
    loginServiceView.resetValue(inputElemForId, inputElemForPw);
    inputElemForId.focus();
  },

  showInvalidPw() {
    alert('패스워드가 다릅니다.');
    const { inputElemForPw } = loginServiceView;
    loginServiceView.resetValue(inputElemForPw);
    inputElemForPw.focus();
  },
};
