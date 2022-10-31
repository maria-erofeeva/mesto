export class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.querySelector('.gallery__card').cloneNode(true);
    return cardElement;
  }

  _likeCard = function (evt) {
    evt.target.classList.toggle("gallery__like-button_active");
  };

  _deleteCard = function (evt) {
    const deletedCard = evt.target.closest(".gallery__card");
    deletedCard.remove();
  };

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".gallery__image");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._setEventListener();
    this._cardImage.src = this._link;
    this._element.querySelector(".gallery__card-title").textContent =
      this._name;
    this._element.querySelector(".gallery__image").alt = this._name;
    return this._element;
  }

  _setEventListener() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({name:this._name, link:this._link});
    });
    this._element
      .querySelector(".gallery__delete-button")
      .addEventListener("click", this._deleteCard);
    this._likeButton
      .addEventListener("click", this._likeCard);
  }

}
