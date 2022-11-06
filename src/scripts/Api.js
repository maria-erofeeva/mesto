export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._header,
    }).then((response) => this._checkResponse(response));
  }

  createCardsList() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._header,
    }).then((response) => this._checkResponse(response));
  }

  editProfile({ newName, newDescription }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: newName,
        description: newDescription,
      }),
    }).then((response) => this._checkResponse(response));
  }

  addNewCard({ newCardName, newCardLink }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
      }),
    }).then((response) => this._checkResponse(response));
  }

  deleteCard(card) {
    return fetch(`${this._url}/cards/${card}`, {
      method: "DELETE",
      headers: this._header,
    }).then((response) => this._checkResponse(response));
  }

  likeCard(card) {
    return fetch(`${this._url}/cards/${card}/likes`, {
      method: "PUT",
      headers: this._header,
    }).then((response) => this._checkResponse(response));
  }

  unlikeCard(card) {
    return fetch(`${this._url}/cards/${card}/likes`, {
      method: "DELETE",
      headers: this._header,
    }).then((response) => this._checkResponse(response));
  }

  setNewPhoto(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((response) => this._checkResponse(response));
  }
}
