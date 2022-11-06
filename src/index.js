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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "774bd685-0618-461a-a7e7-3d1039178086",
    "Content-Type": "application/json",
  },
});

let userId;

const promises = [api.getUserInformation(), api.createCardsList()];
Promise.all(promises)
  .then(([userProfileResponse, initialCardsResponse]) => {
    userId = userProfileResponse._id;
    user.setUserInfo(userProfileResponse);
    galleryCards.renderItems(initialCardsResponse);
  })

  .catch((error) => {
    console.log(error);
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

const popupConfirm = new PopupWithConfirm(
  ".popup_delete-card",
  handleConfirmFormSubmit
);
popupConfirm.setEventListeners();

/*открыть попап с картинкой*/

// function handleCardClick({ name, link }) {
//   popupImage.open({ name, link });
// }

/*получить информацию о пользователе*/

const user = new UserInfo({
  name: currentName,
  about: currentDescription,
  avatar: currentPhoto,
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
  popupDescription.value = userData.about;
});

function handleProfileFormSubmit(data) {
  const newUserInfo = {
    newUserName: data["name"],
    newUserAbout: data["description"],
  };
  popupEditProfile.buttonToggle(true, "Сохранить", "Сохранение...");
  api
    .editProfile(newUserInfo)
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

// galleryCards.renderItems();

api
  .createCardsList()
  .then((cards) => {
    galleryCards.renderItems(cards);
  })
  .catch((error) => console.log(error));

/*сгенерировать новую карту*/

function generateNewCard(card) {
  const newCard = new Card(
    card,
    userId,
    cardTemplate,
    {
      handleCardClick: (obj) => popupImage.open(obj),
      deletePopupConfirm: (id) => handleConfirmFormSubmit(id, card),
      handleLikeClick: (evt, id) => handleLike(evt, id, card),
    }
  );

  const cardElement = newCard.generateCard();
  return cardElement;
}

const handleLike = (_, id, card) => {
  const isCardLiked = card.isLikedByUser();
  card.handleLikeButtonState({
    isLoadig: true
  });
  const action = isCardLiked ? api.removeCardLike(id) : api.likeCard(id);

  action
    .then((res) => {
      card.setLikesValue(res);
      card.handleLikeButtonState({
        isLoadig: false
      });
    })
    .catch((error) => console.log(error));
};

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
      popupEditPhoto.close();
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

function deleteClick(cardId, element) {
  popupConfirm.open(cardId, element);
}

function handleConfirmFormSubmit(cardId, cardElement) {
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();;
      popupConfirm.close();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      popupConfirm.close();
    });
}

cardFormOpenButton.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.disableButton();
});
