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

const validationElements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

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

/*галерея*/

const gallery = document.querySelector(".gallery");

/*попап – добавить карточку*/

const cardFormElement = document.getElementById("popup-add-card-form");

/*попап – приблизить картинку*/

export const imageWholePage = document.getElementById("popup-open-image");
export const popupImg = document.querySelector(".popup__foto");
export const figcaptionText = document.querySelector(".popup__figcaption");
const imageCloseButton = document.getElementById(
  "popup-open-image-close-button"
);

/*импорт*/

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const createCardForm = new FormValidator(validationElements, cardFormElement);
createCardForm.enableValidation();
const editProfileForm = new FormValidator(validationElements, formProfile);
editProfileForm.enableValidation();
const template = document.querySelector(".template");

/*открыть попап*/

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closeModalPress);
  document.addEventListener("keydown", closeByEsc);
}

/*закрыть попап*/

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closeModalPress);
  document.removeEventListener("keydown", closeByEsc);
}

/*открыть/закрыть попап с редактированием профиля*/

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupWholePage);
  popupName.value = currentName.textContent;
  popupDescription.value = currentDescription.textContent;
  editProfileForm.buttonBlock();
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
  createCardForm.buttonBlock();
});

cardFormCloseButton.addEventListener("click", function () {
  closePopup(cardFormWholePage);
});

/*удаление карточки*/

/*закрыть увеличение фото*/

imageCloseButton.addEventListener("click", function () {
  closePopup(imageWholePage);
});

/*создать карточку*/

function createNewCard(name, link, template) {
  const newCard = new Card (name, link, template);
  const cardElement = newCard.generateCard();
  return cardElement;
}

/*обход массива*/

initialCards.forEach((item) => {
  const card = createNewCard(item.name, item.link, template);
  gallery.append(card);
});

function addNewCard(card, container) {
  container.prepend(card);
}

/*создание карточки через попап*/

function submitCardForm(e) {
  const cardFormName = document.getElementById("popup-add-card-title");
  const cardFormLink = document.getElementById("popup-add-card-link");
  const newCardElement = createNewCard(cardFormName.value, cardFormLink.value, template);
  addNewCard(newCardElement, gallery);
  closePopup(cardFormWholePage);
  cardFormElement.reset();
  e.preventDefault();
}

cardFormElement.addEventListener("submit", submitCardForm);

/*закрытие попапа при клике на esc*/

function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/*закрытие попапа при клике вне*/

function closeModalPress(event) {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__close")
  ) {
    closePopup(event.currentTarget);
  }
}
