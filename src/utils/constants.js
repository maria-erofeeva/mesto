/*импорт фото*/

import baikal from "../images/baikal-min.jpg";
import arkhangelsk from "../images/arkhangelsk-min.jpg";
import elbrus from "../images/elbrus-min.jpg";
import kalyazin from "../images/kalyazin-min.jpg";
import karachaevsk from "../images/karachaevsk-min.jpg";
import karelia from "../images/karelia-min.jpg";

import { FormValidator } from '../scripts/FormValidator.js'
import { PopupWithImage } from '../scripts/PopupWithImage.js'

/*объявление изначального массива*/

export const initialCards = [
    {
      name: "Байкал",
      link: baikal,
    },
    {
      name: "Архангельск",
      link: arkhangelsk,
    },
    {
      name: "Эльбрус",
      link: elbrus,
    },
    {
      name: "Калязинская колокольня",
      link: kalyazin,
    },
    {
      name: "Карачаевск",
      link: karachaevsk,
    },
    {
      name: "Карелия",
      link: karelia,
    },
  ];

export const validationElements = {
  
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  };

export const currentName = document.querySelector(".profile__current-name");
export const currentDescription = document.querySelector(".profile__status");
export const popupProfileOpenButton = document.querySelector(".profile__name-edit");
export const popupCloseButton = document.getElementById(
  "popup-edit-profile-close-button"
);
export const cardFormOpenButton = document.querySelector(".profile__add-photo-button");
export const cardFormWholePage = document.getElementById("popup-add-card");
export const cardFormCloseButton = document.getElementById(
  "popup-add-card-close-button"
);
export const addCardButton = document.querySelector(".popup__create");
export const template = document.querySelector(".template");

/*попап – изменить данные*/

export const formProfile = document.getElementById("popup-edit-profile-form");
export const popupWholePage = document.getElementById("popup-edit-profile");
export const popupName = document.querySelector(".popup__input_type_name");
export const popupDescription = document.querySelector(
  ".popup__input_type_description"
);

export const popupSaveName = document.querySelector(
    ".popup__save"
  );

/*галерея*/

export const gallery = document.querySelector(".gallery");
export const openedImage = document.querySelector(".popup_type_image");

export const popupAddingCard = document.querySelector('.popup__add-card')

/*попап – добавить карточку*/

export const cardFormElement = document.getElementById("popup-add-card-form");

/*попап – приблизить картинку*/

export const imageWholePage = document.getElementById("popup-open-image");
export const popupImg = document.querySelector(".popup__foto");
export const figcaptionText = document.querySelector(".popup__figcaption");
export const imageCloseButton = document.getElementById(
  "popup-open-image-close-button"
);

export const createCardForm = new FormValidator(validationElements, cardFormElement);
createCardForm.enableValidation();
export const editProfileForm = new FormValidator(validationElements, formProfile);
editProfileForm.enableValidation();

export const popupOpenImage = new PopupWithImage(popupImg);