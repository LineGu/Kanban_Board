import { domController } from './index.mjs';

export const domControllerInitializer = {
  init() {
    domController.openSignUpModalButtonElem = document.querySelector('.sign-up-button');
    domController.signUpModalElem = document.querySelector('.signup-modal');
    domController.closeModalButtonElems = document.querySelectorAll('.cancelbtn');
    domController.inputNameElem = document.querySelector('#name');
    domController.inputIdElem = document.querySelector('#signup-id');
    domController.inputPwElem = document.querySelector('#signup-pw');
    domController.inputRepeatPwElem = document.querySelector('#repeat-pw');
    domController.inputPhoneNumberElem = document.querySelector('#phone-number');
    domController.formForSignUpElem = document.querySelector('.signup-form');
    domController.formForFindingId = document.querySelector('.find-id-form');
    domController.formForFindingPw = document.querySelector('.find-pw-form');
    domController.formToLogin = document.querySelector('.login-button');
    domController.submitForSignUpElem = document.querySelector('.signupbtn');
    domController.findingIdModalElem = document.querySelector('.find-id-modal');
    domController.openFindingIdModalButtonElem = document.querySelector('.find-id-button');
    domController.findingPwModalElem = document.querySelector('.find-pw-modal');
    domController.openFindingPwModalButtonElem = document.querySelector('.find-pw-button');
    domController.findIdConfirmButtonElem = document.querySelector('.find-id-btn');
    domController.inputNameToFindIdElem = document.querySelector('#find-id-name');
    domController.inputPhoneToFindIdElem = document.querySelector('#find-id-phone-number');
    domController.elemOfShowingIdFound = document.querySelector('.show-finding-id');
    domController.inputNameToFindPwElem = document.querySelector('#find-pw-name');
    domController.inputPhoneToFindPwElem = document.querySelector('#find-pw-phone-number');
    domController.inputEmailToFindPwElem = document.querySelector('#find-pw-id');
    domController.buttonToFindPw = document.querySelector('.find-pw-btn');
    domController.newPwModalElem = document.querySelector('.new-pw-box');
    domController.newPwInputElem = document.querySelector('#new-pw');
    domController.newPwRepeatInputElem = document.querySelector('#new-pw-repeat');
    domController.showingInvalidFormPhone = document.querySelector('.invalid-phone');
    domController.showingValidFormPhone = document.querySelector('.valid-phone');
    domController.showingStandardFormPhone = document.querySelector('.phone-explan');
    domController.showingValidRepeatPw = document.querySelector('.repeat-signup-pw');
    domController.showingValidId = document.querySelector('.available-id');
    domController.showingOverlappedId = document.querySelector('.unavailable-id');
    domController.showingInvalidId = document.querySelector('.invalid-id');

    domController.attachOpenSignUpModal();
    domController.attachCloseModal();
    domController.attachPreventFormActionHandler();
    domController.attachSignUpForLocalHanler();
    domController.attachOpenModalToFindId();
    domController.attachOpenModalToFindPw();
    domController.attachFindIdHandler();
    domController.attachFindPwHandler();
  },
};
