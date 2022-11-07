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
    user.setUserInfo({
      name: response.name,
      about: response.about,
      avatar: response.avatar,
    });
  })
  .catch((error) => {
    console.log(error);
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
    newDescription: data["description"],
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

/*рендер карточек*/

const galleryCards = new Section(
  {
    renderer: (item) => {
      galleryCards.addItem(generateNewCard(item));
    },
  },
  gallery
);

/*сгенерировать новую карту*/

function generateNewCard(card) {
  const newCard = new Card(card, userId, cardTemplate, {
    handleCardClick: (obj) => popupImage.open(obj),
    deletePopupConfirm: (id) => handleConfirmFormSubmit(id, card),
    handleLikeClick: (evt, id) => handleLike(evt, id, card),
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

/*обработчик лайка*/

const handleLike = (_, id, card) => {
  const isCardLiked = card.isLikedByUser();
  if (isCardLiked) {
    api
      .unlikeCard(id)
      .then((data) => {
        card.handleLikeButton(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    api
      .likeCard(id)
      .then((data) => {
        card.handleLikeButton(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

/*обработчик добавления новой карточки*/

function handleCardFormSubmit(data) {
  const newCardData = {
    newCardName: data.name,
    newCardLink: data.link,
  };
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
      popupAddCard.buttonToggle(false, "Создать", "Сохранение...");
    });
}

/*открыть попап с добавлением карточки*/

cardFormOpenButton.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.disableButton();
});

/*открыть попап редактирование фото*/

function editPhotoFormSubmit(avatar) {
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
      popupEditPhoto.buttonToggle(false, "Сохранить", "Сохранение...");
    });
}

profilePhoto.addEventListener("click", () => {
  popupEditPhoto.open();
  editPhotoFormValidator.disableButton();
});

/*обработчик удаления карточки*/

function handleConfirmFormSubmit (cardId, cardElement) {
  popupConfirm.open();
  console.log(cardElement)
  document
    .querySelector(".popup__button_delete")
    .addEventListener("click", () => {
      api
        .deleteCard(cardId)
        .then(() => {
          console.log(cardElement);
          cardElement = null;
          popupConfirm.close();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          popupConfirm.close();
        });
    });
}
