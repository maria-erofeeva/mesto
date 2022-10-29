export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    const popup = document.querySelector('.popup');
  }

  open() {
    const popup = document.querySelector('.popup');
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
        this._handleEscClose(evt);
    });
  }

  close() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
        this.close();
    }
  }

  setEventListeners() {
    const popup = document.querySelector('.popup');
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
          this.close();
        }
      })
    }
}
