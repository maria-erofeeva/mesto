import { Popup } from "../scripts/Popup.js";
import { validationElements } from "../utils/constants.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._cardElement = document
      .querySelector(this._popupSelector)
      .content.querySelector(".gallery__card");
    this._popupFormInputs = this._cardElement.querySelectorAll(
      validationElements.inputSelector
    );
    this._popupForm = document.querySelector(validationElements.formSelector);
  }

  _getInputValues() {
    this._formValues = {};
    this._popupFormInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
      event.preventDefault();
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
