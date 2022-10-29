import { openPopup } from "../index.js";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._openPopup = openPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popup = this._popupSelector.querySelector(".popup");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    if (
      this._popup.target.classList.contains("popup__close-icon")
    ) {
      closePopup(image.currentTarget);
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this._openedPopup = document.querySelector(".popup_opened");
      close(this._openedPopup);
    }
  }

  setEventListeners() {
    this._popupSelector.forEach((item) => {
      item.querySelector('gallery__image').addEventListener("click", open());
    });
    this._popupSelector.forEach((item) => {
      item.addEventListener("click", close());
    });
  }
}
