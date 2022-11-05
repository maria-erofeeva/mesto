class Api {
  _url;
  _header;

  constructor(options) {
    this._header = options.header;
    this._url = options.url;
  }

  _handlePromise(response) {
    if (response.ok) {
      return response.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      header: this._header,
    }).then((response) => this._handlePromise(response));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      header: this._header,
    }).then((response) => this._handlePromise(response));
  }

  editUserProfile({ newUserName, newUserAbout }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      header: this._header,
      body: JSON.stringify({
        name: newUserName,
        about: newUserAbout,
      }),
    }).then((response) => this._handlePromise(response));
  }

  addNewCard({newCardName, newCardLink}) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        header: this._header,
        body: JSON.stringify({
          name: newCardName,
          link: newCardLink
        })
      })
      .then(response => this._handlePromise(response))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        header: this._header
      })
      .then(response => this._handlePromise(response))
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        header: this._header
      })
      .then(response => this._handlePromise(response))
  }

  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        header: this._header
      })
      .then(response => this._handlePromise(response))
  }

  // сменить аватар у пользователя в профиле
  updateUserAvatar(newAvatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        header: this._header,
        body: JSON.stringify({
          avatar: newAvatarLink
        })
      })
      .then(response => this._handlePromise(response))
  }

  // другие методы работы с API
}
