import {deleteCardForm, openPopup, imageWholePage, popupImg, figcaptionText} from "./index.js";

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

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListener();
        this._deleteCard();
        this._setEventListener();
        this._element.querySelector(".gallery__image").src = this._image;
        this._element.querySelector(".gallery__card-title").textContent =
          this._title;
        return this._element;
      }
  
    _setEventListener() {
      this._element
      .querySelector(".gallery__image")
      .addEventListener("click", (element) => {
        this._openPopup(element);
      });
    }

    _openPopup() {
        openPopup(imageWholePage);
        popupImg.src = this._image;
        figcaptionText.textContent = this._title;
        popupImg.alt = this._title;
    }

    _deleteCard() {
        this._element = this._getTemplate();
        this._element
        .querySelector(".gallery__delete-button")
        .addEventListener("click", deleteCardForm);
    }
  }