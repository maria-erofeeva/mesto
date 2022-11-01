import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._handleSubmit = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._input = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputsList = Array.from(this._input);
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      this._handleSubmit(this._getInputValues());
      this.close();
      evt.preventDefault();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
