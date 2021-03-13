import { googleLoginControll } from '../googleLogin.js';
import { kakaoLoginController } from '../kakaoLogin.js';
import { PATH } from '../../../../config/path.mjs';
import { visualController } from '../../../../utils/visualController.mjs';
import { formChecker } from './formChecker.mjs';
import { debounce } from '../../../../utils/debounce.mjs';
import { userController } from '../user/user.mjs';

const { show, go } = visualController;

export const domController = {
  attachOpenSignUpModal() {
    const {
      openSignUpModalButtonElem,
      signUpModalElem,
      inputPwElem,
      inputRepeatPwElem,
      inputPhoneNumberElem,
      inputIdElem,
    } = this;
    const checkRepeatPw = () => formChecker.checkRepeatPw(inputPwElem, inputRepeatPwElem);
    const checkFormOfPhone = () => formChecker.checkValidFormOfPhone(inputPhoneNumberElem);
    const checkOverlappedId = () => formChecker.checkOverlappingId(inputIdElem);
    debounce(inputRepeatPwElem, checkRepeatPw, 'input');
    debounce(inputPhoneNumberElem, checkFormOfPhone, 'input');
    debounce(inputIdElem, checkOverlappedId, 'input');
    openSignUpModalButtonElem.addEventListener('click', (event) => {
      show(signUpModalElem);
    });
  },

  attachOpenModalToFindId() {
    const { findingIdModalElem, openFindingIdModalButtonElem } = this;
    openFindingIdModalButtonElem.addEventListener('click', (event) => {
      show(findingIdModalElem);
    });
  },

  attachOpenModalToFindPw() {
    const { findingPwModalElem, openFindingPwModalButtonElem } = this;
    openFindingPwModalButtonElem.addEventListener('click', (event) => {
      show(findingPwModalElem);
    });
  },

  attachCloseModal() {
    const { closeModalButtonElems } = this;
    closeModalButtonElems.forEach((closeModalButtonElem) => {
      closeModalButtonElem.addEventListener('click', (event) => {
        go(PATH.login_page);
      });
    });
  },

  attachPreventFormActionHandler() {
    const { formForSignUpElem, formForFindingId, formForFindingPw, formToLogin } = this;
    formForSignUpElem.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });
    formForFindingId.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });
    formForFindingPw.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });
    formToLogin.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });
  },

  attachFindIdHandler() {
    const { findIdConfirmButtonElem } = this;
    findIdConfirmButtonElem.addEventListener('click', (event) => {
      userController.findUserId();
    });
  },

  attachFindPwHandler() {
    const { buttonToFindPw } = this;
    buttonToFindPw.addEventListener('click', () => this.findUserAndChangePw(buttonToFindPw));
  },

  async findUserAndChangePw(buttonToFindPw) {
    try {
      const userId = await userController.findUserForChangindPw();
      if (!userId) {
        alert('일치하는 정보가 없습니다.');
        return;
      }
      const isOpendModal = buttonToFindPw.classList.contains('change-btn');
      if (isOpendModal) {
        await userController.changeUserPw(userId);
        go(PATH.login_page);
        alert('성공적으로 변경했습니다.'); // 뷰에 들어 갈거
        return;
      }
      domController.openChangeUserPwModal();
    } catch (err) {
      console.log(err);
    }
  },

  openChangeUserPwModal() {
    const { newPwModalElem, newPwRepeatInputElem, newPwInputElem } = this;
    this.changeModalContentsToChangePw();
    show(newPwModalElem);
    const checkRepeatPw = () => formChecker.checkRepeatPw(newPwInputElem, newPwRepeatInputElem);
    debounce(newPwRepeatInputElem, checkRepeatPw, 'input');
  },

  changeModalContentsToChangePw() {
    const { findingPwModalElem, buttonToFindPw } = this;
    findingPwModalElem.classList.add('bigger');
    buttonToFindPw.innerText = '바꾸기';
    buttonToFindPw.classList.add('change-btn');
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

  attachSignUpForLocalHanler() {
    const { submitForSignUpElem } = this;

    submitForSignUpElem.addEventListener('click', async (event) => {
      userController.createNewAccount();
    });
  },
};
