export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupButton = this._popup.querySelector(".popup__button");
  }

  /*открыть/закрыть попап*/

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  /*обработчик эскейп*/

  _handleEscClose (event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  /*установить слушатели*/

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-icon")
      ) {
        this.close();
      }
    });
  }

  buttonToggle() {
    this._popupButton.addEventListener("click", () => {
      this._popupButton.textContent = "Сохранение...";
    });
  }
}
