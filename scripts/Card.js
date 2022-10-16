import {
  openPopup,
  imageWholePage,
  popupImg,
  figcaptionText,
} from "./index.js";

export class Card {
  constructor(title, image) {
    this._title = title;
    this._image = image;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".template")
      .content.querySelector(".gallery__card")
      .cloneNode(true);

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
    this._cardImage.src = this._image;
    this._element.querySelector(".gallery__card-title").textContent =
      this._title;
    this._element.querySelector(".gallery__image").alt = this._title;
    return this._element;
  }

  _setEventListener() {
    this._cardImage.addEventListener("click", (element) => {
      this._openPopup(element);
    });
    this._element
      .querySelector(".gallery__delete-button")
      .addEventListener("click", this._deleteCard);
    this._element
      .querySelector(".gallery__like-button")
      .addEventListener("click", this._likeCard);
  }

  _openPopup() {
    openPopup(imageWholePage);
    popupImg.src = this._image;
    figcaptionText.textContent = this._title;
    popupImg.alt = this._title;
  }
}
