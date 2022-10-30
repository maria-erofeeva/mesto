import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = document.querySelector(popupSelector);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputsList = Array.from(document.querySelectorAll(".popup__input"));
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      this._submitForm(this._getInputValues());
      this.close();
      event.preventDefault();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
