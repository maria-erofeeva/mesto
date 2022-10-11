import {deleteCardForm, openPopup, closePopup} from "./index.js";

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
  
    _setEventListeners(){
      this._element = this._getTemplate();
      this._element
      .querySelector(".gallery__image")
      .addEventListener("click", (element) => {
        openPopup(imageWholePage);
        popupImg.src = element.target.src;
        figcaptionText.textContent = this._title;
        popupImg.alt = this._title;
      });
  
        this._element
        .querySelector(".gallery__delete-button")
        .addEventListener("click", deleteCardForm);
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector(".gallery__image").src = this._image;
      this._element.querySelector(".gallery__card-title").textContent =
        this._title;
      return this._element;
    }
  }