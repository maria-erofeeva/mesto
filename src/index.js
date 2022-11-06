/*импорт стилей*/

import "./index.css";

/*импорт констант*/

import {
  validationElements,
  currentName,
  currentDescription,
  popupProfileOpenButton,
  cardFormOpenButton,
  formProfile,
  popupName,
  popupDescription,
  gallery,
  cardFormElement,
  cardTemplate,
  popupUpdatePhoto,
  profilePhoto,
  cardDeleteButton,
  popupDeleteCard,
  elementDeleteList,
  currentPhoto,
  savingButton,
  elementDeleteArray,
} from "./utils/constants.js";

/*импорт модулей*/

import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { Section } from "./scripts/Section.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { PopupWithConfirm } from "./scripts/PopupWithConfirm.js";
import { Api } from "./scripts/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

/*валидация всех форм*/

const cardFormValidator = new FormValidator(
  validationElements,
  cardFormElement
);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationElements, formProfile);
profileFormValidator.enableValidation();

const editPhotoFormValidator = new FormValidator(
  validationElements,
  popupUpdatePhoto
);
editPhotoFormValidator.enableValidation();

/*создание форм*/

const popupEditProfile = new PopupWithForm(
  ".popup_edit-profile",
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_add-card", handleCardFormSubmit);
popupAddCard.setEventListeners();

const popupEditPhoto = new PopupWithForm(
  ".popup_edit-photo",
  editPhotoFormSubmit
);
popupEditPhoto.setEventListeners();

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

const popupConfirm = new PopupWithConfirm('.popup_delete-card', handleConfirmFormSubmit);
popupConfirm.setEventListeners();

/*открыть попап с картинкой*/

function handleCardClick({ name, link }) {
  popupImage.open({ name, link });
}

/*получить информацию о пользователе*/

const user = new UserInfo({
  name: currentName,
  description: currentDescription,
  photo: currentPhoto,
});

api
  .getUserInformation()
  .then((response) => {
    userId = response._id;
    user.setUserInfo(response);
  })
  .catch((error) => console.log(error));

/*открыть попап редактирование профиля*/

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  profileFormValidator.disableButton();
  const userData = user.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.description;
});

function handleProfileFormSubmit(data) {
  user.setUserInfo(data.name, data.description);
  popupEditProfile.buttonToggle(true, "Сохранить", "Сохранение...");
  api
    .editProfile(data)
    .then((data) => {
      user.setUserInfo(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditProfile.buttonToggle(false, "Сохранить", "Сохранение...");
    });
}

/*обход массива*/

const galleryCards = new Section(
  {
    renderer: (item) => {
      galleryCards.addItem(generateNewCard(item));
    },
  },
  gallery
);

galleryCards.renderItems();

api
  .createCardsList()
  .then((cards) => {
    galleryCards.renderItems(cards);
  })
  .catch((error) => console.log(error));

/*сгенерировать новую карту*/

function generateNewCard(data) {
  const newCard = new Card(
    { name: data.name, link: data.link },
    cardTemplate,
    handleCardClick
  );

  const cardElement = newCard.generateCard();

  return cardElement;
}

function handleCardFormSubmit(data) {
  popupAddCard.buttonToggle(false, "Сохранить", "Сохранение...");
  const newElement = generateNewCard({
    name: data.name,
    link: data.link,
  });

  api
    .addNewCard(newElement)
    .then((data) => {
      const element = generateNewCard(data);
      galleryCards.addItem(element);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupNewCard.buttonToggle(false, "Создать", "Сохранение...");
    });
}

/*открыть попап с добавлением карточки*/

cardFormOpenButton.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.disableButton();
});

/*открыть попап редактирование фото*/

function editPhotoFormSubmit(data) {
  popupEditPhoto.buttonToggle(true, "Сохранить", "Сохранение...");
  const newPhoto = data["popup-edit-photo-link"];
  api
    .setNewPhoto(newPhoto)
    .then((data) => {
      user.setUserInfo(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditPhoto.buttonToggle(false, "Сохранить", "Сохранение...");
    });
}

profilePhoto.addEventListener("click", () => {
  popupEditPhoto.open();
  editPhotoFormValidator.disableButton();
});

/*открыть удаление фото*/

elementDeleteList.forEach(function(item) {
  item.addEventListener("click", () => {
    popupConfirm.open();
  })
});

function handleConfirmFormSubmit (cardId, element) {
  api.deleteCard(cardId)
    .then(() => {
      element.remove();
      element = null;
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}
