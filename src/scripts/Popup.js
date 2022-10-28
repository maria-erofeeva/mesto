import {
  openPopup,
} from "../index.js";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._openPopup = openPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    if (
      this._popupSelector.target.classList.contains("popup") ||
      this._popupSelector.target.classList.contains("popup__close")
    ) {
      closePopup(image.currentTarget);
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        close(openedPopup);
      }
  }

  setEventListeners() {
    this._popupSelector.forEach((item) => {
      item.addEventListener("click", open());
    });
    this._popupSelector.forEach((item) => {
      item.addEventListener("click", close());
    });
  }
}
