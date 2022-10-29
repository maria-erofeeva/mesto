/*импорт стилей*/

import "./index.css";

/*импорт констант*/

import {
  validationElements,
  currentName,
  currentDescription,
  popupProfileOpenButton,
  cardFormOpenButton,
  cardFormWholePage,
  formProfile,
  popupWholePage,
  popupName,
  popupDescription,
  gallery,
  cardFormElement,
  initialCards,
  addCardButton,
  popupSaveName,
} from "./utils/constants.js";

/*импорт модулей*/

import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { Section } from "./scripts/Section.js";
import { UserInfo } from "./scripts/UserInfo.js";

/*валидация всех форм*/

const createCardForm = new FormValidator(validationElements, cardFormElement);
createCardForm.enableValidation();
const editProfileForm = new FormValidator(validationElements, formProfile);
editProfileForm.enableValidation();

/*попап на весь экран*/

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

function handleCardClick({ name: name, link: link }) {
  popupImage.open({ name: name, link: link });
}

/*открыть попап редактирование профиля*/

const popupEditProfile = new PopupWithForm(
  ".popup__form_edit-profile",
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

/*получить информацию о пользователе*/

const user = new UserInfo({
  name: currentName,
  description: currentDescription,
});

/*открыть попап*/

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  popupSaveName.disableButton();
  const userData = user.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.job;
});

function handleProfileFormSubmit(data) {
  user.setUserInfo(data.name, data.description);
}

/*обход массива*/

const galleryCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      galleryCards.addItem(createCard(item));
    },
  },
  gallery
);

galleryCards.renderItems();

/*открыть попап*/

const popupAddCard = new PopupWithForm(".popup__add-card", handleCardFormSubmit);
cardFormOpenButton.addEventListener("click", () => {
  popupAddCard.open();
  addCardButton.buttonBlock();
});

popupAddCard.setEventListeners();
function handleCardFormSubmit(data) {
  gallery.prepend(generateNewCard(data));
}

function generateNewCard(data) {
  const newCard = new Card(data.name, data.link, template, handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}
