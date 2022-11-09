import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmit = handleSubmit;
    this._confirmButton = this._popup.querySelector(".popup__button_delete")
  }

  /*установить слушатели*/

  setCallback(submitCb) {
    this._handleSubmit = submitCb;
  }

  setEventListeners() {
    super.setEventListeners();
    // this._form.addEventListener("submit", (evt) => {
    //   evt.preventDefault();
    // });
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit();
   })
  }

  setSubmitButtonText(setNewText, newText) {
    if (setNewText) {
      this._popupButton.textContent = newText;
    }
  }
}
