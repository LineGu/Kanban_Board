import { social } from '../../../../config/social.mjs';
import { authModel } from '../../models/auth.mjs';
import { loginServiceView } from '../../views/index.mjs';
import { massage } from '../../../../config/massage.mjs';
import { userController } from '../user/index.mjs';
import { social } from '../../../../config/social.mjs';

export const googleLoginControll = {
  async init() {
    try {
      await gapi.load('auth2', () => this.controllAfterLoad());
    } catch (err) {
      //loginServiceView.goLoginPage();
      console.log(err);
    }
  },

  async controllAfterLoad() {
    try {
      await this.createGoogleAuth();
      await this.logout();
    } catch (err) {
      console.log(err);
    }
  },

  async createGoogleAuth() {
    try {
      this.googleAuth = await gapi.auth2.init(social.googleOptions);
    } catch (err) {
      console.log(err);
    }
  },

  async logout() {
    try {
      await this.googleAuth.signOut();
    } catch (err) {
      console.log(err);
    }
  },

  async logInWithGoogle() {
    try {
      await this.googleAuth.signIn();
      const googleUser = await this.googleAuth.currentUser.get();
      const userProfile = await googleUser.getBasicProfile();
      const userId = userProfile.getEmail();
      const isVaildUser = await authModel.checkUserToLogin(userId, 'google');
      if (isVaildUser) {
        loginServiceView.goMainPage();
        return;
      }
      const isPositiveToSignUp = confirm(massage.google_signup);
      if (isPositiveToSignUp) {
        await this.signUpForGoogle(this.googleAuth);
      }
    } catch (err) {
      console.log(err);
    }
  },

  async signUpForGoogle(googleAuth) {
    try {
      const googleUser = googleAuth.currentUser.get();
      const userProfile = googleUser.getBasicProfile();
      const name = userProfile.getName();
      const id = userProfile.getEmail();

      const userData = { id, name, pw: '', phoneNumber: '', loginMethod: 'google' };
      await userController.createNewAccount(userData);
    } catch (err) {
      console.log(err);
    }
  },
};
