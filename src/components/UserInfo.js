class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = userNameSelector;
    this._userJob = userJobSelector;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}

export default UserInfo;
