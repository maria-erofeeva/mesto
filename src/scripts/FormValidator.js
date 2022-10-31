export class FormValidator {
  _form;
  _buttonSelector;
  _inputSelector;
  _buttonInactive;
  _inputError;
  _activeError;
  _validateForm;
  _inputList;

  constructor(object, validateForm) {
    this._buttonSelector = object.submitButtonSelector;
    this._inputSelector = object.inputSelector;
    this._buttonInactive = object.inactiveButtonClass;
    this._inputError = object.inputErrorClass;
    this._activeError = object.errorClass;
    this._validateForm = validateForm;
    this._inputList = Array.from(
      this._validateForm.querySelectorAll(this._inputSelector)
    );
    this._button = this._validateForm.querySelector(this._buttonSelector);
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
    const error = this._validateForm.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(input, error);
    } else {
      this._showInputError(input, error);
    }
  }

  _validateButtons() {
    const isFormValid = this._inputList.every(({ validity }) => validity.valid);
    if (isFormValid) {
      this._button.classList.remove(this._buttonInactive);
      this._button.removeAttribute("disabled", true);
    } else {
      this.buttonBlock();
    }
}

  buttonBlock() {
    this._button.classList.add(this._buttonInactive);
    this._button.setAttribute("disabled", true);
  }

  _setEventListeners() {
    this._inputList.forEach((item) => {
      item.addEventListener("input", () => {
        this._hasInvalidInput(item);
        this._validateButtons();
      });
    });

  }

  enableValidation() {
    this._setEventListeners();
  }
}
