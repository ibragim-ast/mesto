class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatar }) {
    this._userName = userNameSelector;
    this._userJob = userJobSelector;
    this._avatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._avatar.src = avatar;
  }
}

export default UserInfo;
