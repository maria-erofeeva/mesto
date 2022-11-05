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
  initialCards,
  cardTemplate,
  popupUpdatePhoto,
  profilePhoto,
  cardDeleteButton,
  popupDeleteCard,
  elementDeleteList,
  currentPhoto,
  savingButton,
} from "./utils/constants.js";

/*импорт модулей*/

import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { Section } from "./scripts/Section.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { Popup } from "./scripts/Popup.js";
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

/*зум*/

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

function handleCardClick({ name, link }) {
  popupImage.open({ name, link });
}

/*открыть попап редактирование профиля*/

const popupEditProfile = new PopupWithForm(
  ".popup_edit-profile",
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

/*получить информацию о пользователе*/

const user = new UserInfo({
  name: currentName,
  description: currentDescription,
  photo: currentPhoto,
});

api
  .getUserProfile()
  .then((response) => {
    userId = response._id;
    user.setUserInfo(response);
  })
  .catch((err) => console.log(err));

/*открыть попап*/

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  profileFormValidator.disableButton();
  const userData = user.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.description;
});

function handleProfileFormSubmit(data) {
  user.setUserInfo(data.name, data.description);
  popupEditProfile.changeButtonTextOnSaving(true, 'Сохранить', 'Сохранение...');
  api.editUserProfile(newUserInfo)
    .then((data) => {
      user.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.changeButtonTextOnSaving(false, 'Сохранить', 'Сохранение...');
    });
}

popupEditProfile.setEventListeners();

/*обход массива*/

const galleryCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      galleryCards.addItem(generateNewCard(item));
    },
  },
  gallery
);

galleryCards.renderItems();

api
  .getInitialCards()
  .then((initialCards) => {
    // для каждого элемента листа сформировать и отрисовать карточку
    galleryCards.renderItems(initialCards);
  })
  .catch((err) => console.log(err));

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
  popupAddCard.changeButtonTextOnSaving(false, 'Сохранить', 'Сохранение...');
  const newElement = generateNewCard({
    name: data.name,

    link: data.link,
  });

  api.addNewCard(newElement)
    .then((data) => {
      const element = renderCard(data);
      galleryCards.addItem(element);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupNewCard.changeButtonTextOnSaving(false, 'Создать', 'Сохранение...');
    });

  galleryCards.addItem(newElement);
}

/*открыть попап*/

const popupAddCard = new PopupWithForm(".popup_add-card", handleCardFormSubmit);

cardFormOpenButton.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.disableButton();
});

popupAddCard.setEventListeners();

/*открыть попап редактирование фото*/

function editPhotoFormSubmit(data) {
  popupEditPhoto.changeButtonTextOnSaving(true, 'Сохранить', 'Сохранение...');
  const newAvatarLink = data['popup-edit-photo-link'];
  api.updateUserAvatar(newAvatarLink)
    .then((data) => {
      user.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditPhoto.changeButtonTextOnSaving(false, 'Сохранить', 'Сохранение...');
    });
}

profilePhoto.addEventListener("click", () => {
  popupEditPhoto.open();
  editPhotoFormValidator.disableButton();
});

const popupEditPhoto = new PopupWithForm(
  ".popup_edit-photo",
  editPhotoFormSubmit
);

popupEditPhoto.setEventListeners();

/*открыть удаление фото*/

// function handleDeleteClick() {
//   popupDeletePhoto.open();
// }

// const popupDeletePhoto = new Popup(".popup_delete-card");

// popupDeletePhoto.setEventListeners();

/*API*/
