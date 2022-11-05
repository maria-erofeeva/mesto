export class UserInfo {
  constructor({ name, description, photo }) {
    this._name = name;
    this._description = description;
    this._photo = photo;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({name, description, photo}) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._userAvatar.style.backgroundImage = `url(${photo})`;
  }
}
