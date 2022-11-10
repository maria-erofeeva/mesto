import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._handleSubmit = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
  }

  /*проверить инпут*/

  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  /*установить слушатели*/

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      this._handleSubmit(this._getInputValues());
      evt.preventDefault();
    });
  }

  /*закрыть попап*/

  close() {
    super.close();
    this._popupForm.reset();
  }

  setSubmitButtonText(newText) {
    this._popupButton.textContent = newText;
  }
}
