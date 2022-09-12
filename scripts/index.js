/*объявление изначального массива*/

const initialCards = [
  {
    name: "Байкал",
    link: "images/baikal-min.jpg",
  },
  {
    name: "Архангельск",
    link: "images/arkhangelsk-min.jpg",
  },
  {
    name: "Эльбрус",
    link: "images/elbrus-min.jpg",
  },
  {
    name: "Калязинская колокольня",
    link: "images/kalyazin-min.jpg",
  },
  {
    name: "Карачаевск",
    link: "images/karachaevsk-min.jpg",
  },
  {
    name: "Карелия",
    link: "images/karelia-min.jpg",
  },
];

/*главная страница*/

const currentName = document.querySelector(".profile__current-name");
const currentDescription = document.querySelector(".profile__status");
const popupProfileOpenButton = document.querySelector(".profile__name-edit");
const popupCloseButton = document.getElementById(
  "popup-edit-profile-close-button"
);
const cardFormOpenButton = document.querySelector(".profile__add-photo-button");
const cardFormWholePage = document.getElementById("popup-add-card");
const cardFormCloseButton = document.getElementById(
  "popup-add-card-close-button"
);

/*попап – изменить данные*/

const formProfile = document.getElementById("popup-edit-profile-form");
const popupWholePage = document.getElementById("popup-edit-profile");
const popupName = document.querySelector(".popup__input_type_name");
const popupDescription = document.querySelector(
  ".popup__input_type_description"
);
const formInput = document.querySelector(".popup__input");
const nameInputError = formProfile.querySelector(`.${popupName.id}-error`);
const descriptionInputError = formProfile.querySelector(
  `.${popupDescription.id}-error`
);

/*галерея*/

const gallery = document.querySelector(".gallery");
const galleryCard = document.querySelector(".gallery__card");
const galleryImage = document.querySelector(".gallery__image");
const galleryFig = document.querySelector(".gallery__card-title");
const likeButton = document.getElementById("gallery-like-button");
const templateElement = document.querySelector(".template");

/*попап – добавить карточку*/

const cardFormElement = document.getElementById("popup-add-card-form");
const cardFormName = document.getElementById("popup-add-card-title");
const cardFormLink = document.getElementById("popup-add-card-link");

/*попап – приблизить картинку*/

const imageWholePage = document.getElementById("popup-open-image");
const popupImg = document.querySelector(".popup__foto");
const figcaptionText = document.querySelector(".popup__figcaption");
const imageCloseButton = document.getElementById(
  "popup-open-image-close-button"
);

/*открыть попап*/

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closeModalPress);
}

/*закрыть попап*/

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

/*открыть/закрыть попап с редактированием профиля*/

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupWholePage);
  popupName.value = currentName.textContent;
  popupDescription.value = currentDescription.textContent;
  // closeModalPress(popupWholePage);
  // closeModalEsc(popupWholePage);
});

popupCloseButton.addEventListener("click", function () {
  closePopup(popupWholePage);
});

/*отправка формы попапа*/

function submitProfileForm(evt) {
  evt.preventDefault();
  currentName.textContent = popupName.value;
  currentDescription.textContent = popupDescription.value;
  closePopup(popupWholePage);
}

formProfile.addEventListener("submit", submitProfileForm);

/*открыть/закрыть попап с добавлением карточки*/

cardFormOpenButton.addEventListener("click", function () {
  openPopup(cardFormWholePage);
  // closeModalPress(cardFormWholePage);
  // closeModalEsc(cardFormWholePage);
});

cardFormCloseButton.addEventListener("click", function () {
  closePopup(cardFormWholePage);
});

/*удаление карточки*/

function deleteCardForm(element) {
  const deletedCard = element.target.closest(".gallery__card");
  deletedCard.remove();
}

/*закрыть увеличение фото*/

imageCloseButton.addEventListener("click", function () {
  closePopup(imageWholePage);
});

/*создание карточки*/

// const newCard = templateElement.content.cloneNode(true);

function createCard(image, title) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".gallery__image").src = image;
  newCard.querySelector(".gallery__card-title").textContent = title;
  newCard.querySelector(".gallery__image").alt = title;

  newCard
    .querySelector(".gallery__delete-button")
    .addEventListener("click", deleteCardForm);
  newCard
    .querySelector(".gallery__image")
    .addEventListener("click", function (element) {
      openPopup(imageWholePage);
      popupImg.src = element.target.src;
      figcaptionText.textContent = title;
      popupImg.alt = title;
      // closeModalPress(imageWholePage);
      // closeModalEsc(imageWholePage);
    });
  newCard
    .querySelector(".gallery__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__like-button_active");
    });
  return newCard;
}

/*добавление карточки на страницу*/

function addNewCard(card, container) {
  container.prepend(card);
}

/*добавление карточки через попап*/

function submitCardForm(e) {
  e.preventDefault();
  const newCardElement = createCard(cardFormLink.value, cardFormName.value);
  addNewCard(newCardElement, gallery);
  closePopup(cardFormWholePage);
  cardFormElement.reset();
}

/*вызов*/

initialCards.forEach((card) => {
  const newCard = createCard(card.link, card.name);
  gallery.prepend(newCard);
});

cardFormElement.addEventListener("submit", submitCardForm);

/*включение валидации форм*/

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

/*изменение стиля поля при ошибке*/

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

/*проверка валидности инпута*/

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

/*установить слушатели на все инпуты*/

const saveButton = document.querySelector(".popup__save");
const createButton = document.querySelector(".popup__create");

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

/*установить слушатели на все формы*/

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation();

/*проверка кода на валидность*/

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/*включение и выключение кнопки*/

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__button_inactive");
    buttonElement.removeAttribute("disabled", true);
  }
}

/*закрытие попапа при клике на esc*/

// function closeModalEsc (modal) {
//   if (modal.classList.contains("popup_opened")) {
//   document.addEventListener('keydown', function(event) {
//       if (evt.key === 'Escape'){
//         closePopup(modal);
//       }
//     });
//   }
// }

function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/*закрытие попапа при клике вне попапа*/

// function closeModalPress (modal) {
//   if(modal.classList.contains("popup_opened")) {
//     document.addEventListener('click', function(event) {
//       if(!event.target.closest('.popup__container') && !event.target.closest('.popup__close-icon') && !event.target.closest('.profile__name-edit') && !event.target.closest('.gallery__image') && !event.target.closest('.profile__add-photo-button')){
//         closePopup(modal);
//       }
//     });
//   }
// }

function closeModalPress (event) {
  if(!event.target.closest('.popup__container') && !event.target.closest('.popup__close-icon') && !event.target.closest('.profile__name-edit') && !event.target.closest('.gallery__image') && !event.target.closest('.profile__add-photo-button')){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
      }
    };

// function closeModalPress(event) {
//   if (event.target.closest('.popup') || event.target.closest('.popup__close-icon')){
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// function changeButtonPosition (formElement) {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const saveButton = formElement.querySelector('.popup__save');
//   const lastInput = inputList.slice(-1);
//   lastInput.forEach(function(item) {
//     if (!item.validity.valid) {
//       saveButton.style.margin = "31.34px 0 0 0";
//       } else {
//         saveButton.style.margin = "48px 0 0 0";
//       }
//   });
// }

// function changeButtonPosition (formElement, saveButton) {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const lastInput = inputList.slice(-1);
//   lastInput.forEach(function(item) {
//     if (!item.validity.valid) {
//       saveButton.style.margin = "31.34px 0 0 0";
//       } else {
//         saveButton.style.margin = "48px 0 0 0";
//       }
//   });
// }


