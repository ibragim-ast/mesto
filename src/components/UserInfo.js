class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = userNameSelector;
    this._userJob = userJobSelector;
  }

  getUserInfo() {
    userData.userName = this._userName;
    userData.userJob = this._userJob;

    return { userData };
  }

  setUserInfo(userName, userJob) {

  }


}
