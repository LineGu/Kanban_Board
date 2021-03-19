import { domController } from './index.mjs';
import { visualController } from '../../../../utils/visualController.mjs';
import { customFetch } from '../../../../utils/fetch.mjs';
import { PATH } from '../../../../config/path.mjs';
import { massage } from '../../../../config/massage.mjs';

const { show, hide } = visualController;
const { post } = customFetch;

export const formChecker = {
  checkRepeatPw(inputPwElem, inputRepeatPwElem) {
    const showingValidPwElem = inputRepeatPwElem.parentNode.querySelector('.repeat-pw');
    const showingInvalidPwElem = inputRepeatPwElem.parentNode.querySelector('.invalid-repeat-pw');
    const isValidRepeat = inputPwElem.value === inputRepeatPwElem.value;
    const isEmptyValue = !inputRepeatPwElem.value;
    if (isEmptyValue) {
      hide(showingValidPwElem);
      hide(showingInvalidPwElem);
      return;
    }
    if (!isValidRepeat) {
      hide(showingValidPwElem);
      show(showingInvalidPwElem);
      return;
    }
    hide(showingInvalidPwElem);
    show(showingValidPwElem);
  },

  checkValidFormOfPhone(inputPhoneNumberElem) {
    const inputPhoneNumber = inputPhoneNumberElem.value;
    const {
      showingInvalidFormPhone,
      showingValidFormPhone,
      showingStandardFormPhone,
    } = domController;
    const isEmptyValue = !inputPhoneNumber;
    if (isEmptyValue) {
      hide(showingInvalidFormPhone);
      hide(showingValidFormPhone);
      hide(showingStandardFormPhone);
      return;
    }

    const isIncludeHyphen = inputPhoneNumber.includes('-');
    if (isIncludeHyphen) {
      hide(showingInvalidFormPhone);
      hide(showingValidFormPhone);
      show(showingStandardFormPhone);
      return;
    }

    const isInvalidForm = inputPhoneNumber.length === 11 && Number(inputPhoneNumber) !== NaN;
    if (isInvalidForm) {
      hide(showingInvalidFormPhone);
      hide(showingStandardFormPhone);
      show(showingValidFormPhone);
      return;
    }
    hide(showingValidFormPhone);
    hide(showingStandardFormPhone);
    show(showingInvalidFormPhone);
  },

  checkValidForm() {
    const { showingValidFormPhone, showingValidRepeatPw, showingValidId } = domController;
    const isValidRepeat = !showingValidRepeatPw.classList.contains('hidden');
    const isValidId = !showingValidId.classList.contains('hidden');
    const isValidPhone = !showingValidFormPhone.classList.contains('hidden');

    if (isValidRepeat && isValidId && isValidPhone) {
      return true;
    }
  },

  async checkOverlappingId(inputIdElem) {
    try {
      const inputId = inputIdElem.value;
      const { showingValidId, showingOverlappedId, showingInvalidId } = domController;
      const isValidForm = formChecker.checkValidFormId(inputIdElem);
      if (!isValidForm) {
        return;
      }
      const dataToPost = { id: inputId };
      const { result } = await post(PATH.server_url + '/signUp/OverlappingId', dataToPost);
      hide(showingValidId);
      hide(showingOverlappedId);
      hide(showingInvalidId);
      switch (result.msg) {
        case 'ERROR':
          document.querySelector('#signup-id').value = massage.repeat;
          break;

        case 'AVAILABLE':
          show(showingValidId);
          hide(showingOverlappedId);
          hide(showingInvalidId);
          break;

        case 'UNAVAILABLE':
          hide(showingValidId);
          show(showingOverlappedId);
          hide(showingInvalidId);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  },

  checkValidFormId(inputIdElem) {
    const inputId = inputIdElem.value;
    const { showingValidId, showingOverlappedId, showingInvalidId } = domController;
    if (!inputId) {
      hide(showingValidId);
      hide(showingOverlappedId);
      hide(showingInvalidId);
      return false;
    }
    const isValidEmailForm = inputId.includes('@');
    const isEnoughLength = inputId.length > 8;
    if (!isEnoughLength || !isValidEmailForm) {
      show(showingInvalidId);
      hide(showingOverlappedId);
      hide(showingValidId);
      return false;
    }
    return true;
  },
};
