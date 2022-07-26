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
  currentPhoto,
} from "../utils/constants.js";

/*импорт модулей*/

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { Api } from "../components/Api.js";

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

const avatarFormValidator = new FormValidator(
  validationElements,
  popupUpdatePhoto
);
avatarFormValidator.enableValidation();

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
  handleAvatarFormSubmit
);
popupEditPhoto.setEventListeners();

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

const popupConfirm = new PopupWithConfirm(".popup_delete-card");
popupConfirm.setEventListeners();

/*получить информацию о пользователе*/

const user = new UserInfo({
  name: currentName,
  about: currentDescription,
  avatar: currentPhoto,
});

/*открыть попап редактирование профиля*/

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  const userData = user.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.about;
});

/*обработка запроса редактирования профиля*/

function handleProfileFormSubmit(data) {
  const newUserInfo = {
    newName: data["name"],
    newDescription: data["about"],
  };
  popupEditProfile.setSubmitButtonText("Сохранение...");
  api
    .editProfile(newUserInfo)
    .then((data) => {
      user.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditProfile.setSubmitButtonText("Сохранить");
    });
}

/*рендер карточек*/

const galleryCards = new Section(
  {
    renderer: (item) => {
      galleryCards.addInitialCards(generateNewCard(item));
    },
  },
  gallery
);

/*сгенерировать новую карту*/

function generateNewCard(card) {
  const newCard = new Card(card, userId, cardTemplate, {
    handleCardClick: (cardData) => popupImage.open(cardData),
    handleDelete: (id) => openConfirmationPopup(id, newCard),
    handleLikeClick: (evt, id, card) => handleLike(evt, id, card),
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

/*обработчик лайка*/

function handleLike(evt, id, card) {
  const buttonIsLikedByUser = card.isLikedByUser();
  if (buttonIsLikedByUser) {
    api
      .unlikeCard(id)
      .then((data) => {
        card.countLikes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    api
      .likeCard(id)
      .then((data) => {
        card.countLikes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

/*обработчик добавления новой карточки*/

function handleCardFormSubmit(data) {
  const newCardData = {
    newCardName: data.name,
    newCardLink: data.link,
  };
  popupAddCard.setSubmitButtonText("Сохранение...");
  api
    .addNewCard(newCardData)
    .then((data) => {
      const element = generateNewCard(data);
      galleryCards.addItem(element);
      popupAddCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupAddCard.setSubmitButtonText("Сохранить");
    });
}

/*открыть попап с добавлением карточки*/

cardFormOpenButton.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.disableButton();
});

/*открыть попап редактирование фото*/

function handleAvatarFormSubmit(avatar) {
  popupEditPhoto.setSubmitButtonText("Сохранение...");
  api
    .setNewPhoto(avatar.link)
    .then((response) => {
      user.setAvatar(response.avatar);
      popupEditPhoto.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditPhoto.setSubmitButtonText("Сохранить");
    });
}

profilePhoto.addEventListener("click", () => {
  popupEditPhoto.open();
  avatarFormValidator.disableButton();
});

/*обработчик удаления карточки*/

function openConfirmationPopup(id, card) {
  popupConfirm.open();
  popupConfirm.setCallback(() => {
    popupConfirm.setSubmitButtonText("Удаление...");
    api
      .deleteCard(id)
      .then(() => {
        card.deleteCard();
        popupConfirm.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupConfirm.setSubmitButtonText("Удалить");
      });
  });
}
