export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
        this._handleEscClose(evt);
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
        this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
          this.close();
        }
      })
    }
}
