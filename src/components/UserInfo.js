export class UserInfo {

  constructor(data) {
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
  }

  /*получить инфо о пользователе*/

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  /*установить инфо*/

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }

  /*обновить аватар*/

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
