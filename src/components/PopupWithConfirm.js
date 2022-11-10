import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  /*установить слушатели*/

  setCallback(submitCb) {
    this._handleSubmit = submitCb;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit();
   })
  }

  setSubmitButtonText(newText) {
    this._popupButton.textContent = newText;
  }
}
