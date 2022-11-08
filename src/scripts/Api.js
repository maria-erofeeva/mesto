export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /*проверка ответа*/

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  /*получить информацию о пользователе*/

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  /*загрузка карточек с сервера*/

  createCardsList() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  /*редактирование профиля*/

  editProfile({ newName, newDescription }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription,
      }),
    }).then((response) => this._checkResponse(response));
  }

  /*добавление новой карточки*/

  addNewCard({ newCardName, newCardLink }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
      }),
    }).then((response) => this._checkResponse(response));
  }

  /*удалить карточку*/

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  /*поставить и снять лайк карточке*/

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  unlikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  /*обновление аватара пользователя*/

  setNewPhoto(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((response) => this._checkResponse(response));
  }
}
