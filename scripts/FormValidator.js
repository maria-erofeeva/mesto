export const validationElements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export class FormValidator {
  _form;
  _button;
  _input;
  _buttonInactive;
  _inputError;
  _activeError;
  _validateForm;
  _inputList;

  constructor(object, validateForm) {
    this._form = object.formSelector;
    this._button = object.submitButtonSelector;
    this._input = object.inputSelector;
    this._buttonInactive = object.inactiveButtonClass;
    this._inputError = object.inputErrorClass;
    this._activeError = object.errorClass;
    this._validateForm = validateForm;
    this._inputList = Array.from(
      this._validateForm.querySelectorAll(this._input)
    );
  }

  _showInputError(input, error) {
    input.classList.add("popup__input_type_error");
    error.textContent = this._input.validationMessage;
    error.classList.add(object.errorClass);
  }

  _hideInputError(input, error) {

    input.classList.remove("popup__input_type_error");
    error.classList.remove(object.errorClass);
    error.textContent = "";
  }

  _hasInvalidInput(input) {
    const error = this._validateForm.querySelector(`.${this._input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(input, error);
    } else {
      this._showInputError(input, error);
    }
  }

  _validateButtons() {
    const isFormValid = this._input.every(({ validity }) => validity.valid);
    if (isFormValid) {
      this._button.classList.remove(object.inactiveButtonClass);
      this._button.removeAttribute("disabled", true);
    } else {
      this._button.classList.add(object.inactiveButtonClass);
      this._button.setAttribute("disabled", true);
    }
  }

  buttonBlock() {
    this._button.classList.add(object.inactiveButtonClass);
    this._button.setAttribute("disabled", true);
  }

  _setEventListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener("input", () => {
        this._hasInvalidInput(item);
        this._validateButtons();
      });
      item.addEventListener("submit", (e) => {
        e.preventDefault;
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
