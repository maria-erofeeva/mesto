/*включение валидации форм*/

const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/*изменение стиля поля при ошибке*/

function showInputError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = "";
}

/*проверка валидности инпута*/

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

/*установить слушатели на все инпуты*/

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach(function (input) {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, button, config);
    });
  });
}

/*установить слушатели на все формы*/

function setValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
}

/*проверка кода на валидность*/

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/*включение и выключение кнопки*/

function toggleButtonState(inputs, button, config) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute("disabled", true);
  }
}

setValidation(enableValidation);
