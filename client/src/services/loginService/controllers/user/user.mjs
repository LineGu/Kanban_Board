import { userModel } from '../../models/user.mjs';
import { domController } from '../dom/index.mjs';
import { formChecker } from '../dom/formChecker.mjs';
import { visualController } from '../../../../utils/visualController.mjs';

const { go, hide, show } = visualController;

export const userController = {
  async createNewAccount() {
    try {
      const { inputNameElem, inputIdElem, inputPwElem, inputPhoneNumberElem } = domController;
      const isValidForm = formChecker.checkValidForm();
      if (!isValidForm) {
        alert('양식을 올바르게 입력하세요.');
        return;
      }
      const userData = {
        name: inputNameElem.value,
        id: inputIdElem.value,
        pw: inputPwElem.value,
        phoneNumber: inputPhoneNumberElem.value,
        loginMethod: 'local',
      };
      const isSuccessSignUp = await userModel.createUser(userData);
      if (isSuccessSignUp) {
        alert('회원에 성공했습니다. 로그인해주세요');
        go(PATH.login_page);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  },

  async findUserId() {
    try {
      const { inputNameToFindIdElem, inputPhoneToFindIdElem, elemOfShowingIdFound } = domController;
      const { value: inputName } = inputNameToFindIdElem;
      const { value: inputPhone } = inputPhoneToFindIdElem;

      const userData = { name: inputName, phoneNumber: inputPhone };
      const userEmail = await userModel.getUserEmail(userData);
      if (!userEmail) {
        elemOfShowingIdFound.innerText = '일치하는 값이 없습니다.';
        elemOfShowingIdFound.classList.add('alert');
        show(elemOfShowingIdFound);
        inputNameToFindIdElem.value = '';
        inputPhoneToFindIdElem.value = ''; //view에 들어갈 것들
        return;
      }
      const elemToShowEmailFound = elemOfShowingIdFound.querySelector('.findind-id');
      elemToShowEmailFound.innerText = `${userEmail}`;
      show(elemOfShowingIdFound);
      inputNameToFindIdElem.value = '';
      inputPhoneToFindIdElem.value = '';
    } catch (err) {
      console.log(err);
    }
  },

  async findUserForChangindPw() {
    try {
      const { inputNameToFindPwElem, inputEmailToFindPwElem } = domController;
      const inputName = inputNameToFindPwElem.value;
      const inputEmail = inputEmailToFindPwElem.value;
      const userData = { name: inputName, id: inputEmail };
      const userId = await userModel.getUserId(userData);
      if (!userId) {
        return false;
      }
      return userId;
    } catch (err) {
      console.log(err);
    }
  },

  async changeUserPw(userId) {
    try {
      const { newPwInputElem } = domController;
      const newPw = newPwInputElem.value;

      const userData = { newPw, userId };
      const isSuccesPatch = await userModel.changeUserPw(userData);

      if (isSuccesPatch) return true;

      return false;
    } catch (err) {
      throw err;
    }
  },
};