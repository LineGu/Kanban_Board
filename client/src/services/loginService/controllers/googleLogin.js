import { loginPageController } from './loginPageController.mjs';
import { PATH } from '../../../config/path.mjs';

export const googleLoginControll = {
  async init() {
    await gapi.load('auth2', async () => {
      this.googleAuth = await gapi.auth2.init({
        client_id: '754093745043-1h4l8j77bhelph1u0c2vlsd6tnk8vggk.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile',
      });
      if (this.googleAuth.isSignedIn.get()) {
        await googleLoginControll.logout(this.googleAuth);
        return;
      }
    });
  },

  async signIn() {
    const { googleAuth } = this;
    if (googleAuth.isSignedIn.get()) {
      await googleLoginControll.logout(googleAuth);
      return;
    }

    await googleLoginControll.logInWithGoogle(this.googleAuth);
  },

  async logout(googleAuth) {
    await googleAuth.signOut();
  },

  async logInWithGoogle(googleAuth) {
    await googleAuth.signIn();
    const resultOfGetUserLoginData = await googleLoginControll.postUserData(googleAuth);
    if (resultOfGetUserLoginData.msg === 'LOGIN SUCCESS') {
      window.location.href = PATH.main_page;
      return;
    }

    if (resultOfGetUserLoginData.msg === 'NOT USER') {
      const resultOfGetUserSignData = await googleLoginControll.signInForGoogle(googleAuth);
      if (resultOfGetUserSignData.msg === 'SUCCESS') {
        alert('첫 방문을 환영합니다.');
        googleLoginControll.logInWithGoogle(googleAuth);
      }
    }
  },

  async postUserData(googleAuth) {
    const googleUser = googleAuth.currentUser.get();
    const userProfile = googleUser.getBasicProfile();
    const userName = userProfile.getName();
    const userId = userProfile.getEmail();

    const result = await fetch('http://localhost:8080/auth/socialLogin', {
      method: 'POST',
      body: JSON.stringify({
        id: userId,
        loginMethod: 'google',
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res))
      .catch((err) => alert(err));

    return result;
  },

  async signInForGoogle(googleAuth) {
    const googleUser = googleAuth.currentUser.get();
    const userProfile = googleUser.getBasicProfile();
    const userName = userProfile.getName();
    const userId = userProfile.getEmail();

    const result = await fetch('http://localhost:8080/signUp', {
      method: 'POST',
      body: JSON.stringify({
        id: userId,
        name: userName,
        pw: '',
        phoneNumber: '',
        loginMethod: 'google',
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res))
      .catch((err) => alert(err));

    const userIdOfDb = await loginPageController.getUserIdOfDataBaseTable(userName, userId);

    if (userIdOfDb === 'FAIL') {
      console.log('fail to get userID');
      return;
    }

    const resultOfCreatContainer = await loginPageController.createDefaultContainer(userIdOfDb);

    if (resultOfCreatContainer === 'FAIL') {
      console.log('fail to create container');
      return;
    }

    const resultOfCreatCard = await loginPageController.createDefaultCard(userIdOfDb);

    if (resultOfCreatCard === 'FAIL') {
      console.log('fail to create card');
      return;
    }
    return result;
  },
};
