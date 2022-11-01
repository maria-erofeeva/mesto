export class FormValidator {
  _form;
  _buttonSelector;
  _inputSelector;
  _buttonInactive;
  _inputError;
  _activeError;
  _form;
  _inputList;

  constructor(validationConfig, form) {
    this._buttonSelector = validationConfig.submitButtonSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._buttonInactive = validationConfig.inactiveButtonClass;
    this._inputError = validationConfig.inputErrorClass;
    this._activeError = validationConfig.errorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._buttonSelector);
  }

  _showInputError(input, error) {
    input.classList.add(this._inputError);
    error.textContent = input.validationMessage;
    error.classList.add(this._activeError);
  }

  _hideInputError(input, error) {
    input.classList.remove(this._inputError);
    error.classList.remove(this._activeError);
    error.textContent = "";
  }

  _hasInvalidInput(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(input, error);
    } else {
      this._showInputError(input, error);
    }
  }

  _validateButton() {
    const isFormValid = this._inputList.every(({ validity }) => validity.valid);
    if (isFormValid) {
      this._button.classList.remove(this._buttonInactive);
      this._button.removeAttribute("disabled");
    } else {
      this.disableButton();
    }
  }

  disableButton() {
    this._button.classList.add(this._buttonInactive);
    this._button.setAttribute("disabled", true);
  }

  _setEventListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener("input", () => {
        this._hasInvalidInput(item);
        this._validateButton();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
