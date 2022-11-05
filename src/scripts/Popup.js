export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupButton = this._popup.querySelector(".popup__button");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose (event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

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

  changeButtonTextOnSaving(isSaving, originalButtonText, buttonTextWhileSaving) {
    if (isSaving) {
      this._popupButton.textContent = buttonTextWhileSaving;
    } else {
      this._popupButton.textContent = originalButtonText;
    }
  }
}
