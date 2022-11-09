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
export const popupProfileOpenButton = document.querySelector(
  ".profile__name-edit"
);
export const popupCloseButton = document.querySelector(
  "#popup-edit-profile-close-button"
);
export const cardFormOpenButton = document.querySelector(
  ".profile__add-photo-button"
);
export const cardFormWholePage = document.querySelector("#popup-add-card");
export const cardFormCloseButton = document.querySelector(
  "#popup-add-card-close-button"
);
export const addCardButton = document.querySelector(".popup__create");
export const cardTemplate = document.querySelector(".template");

/*попап – изменить данные*/

export const formProfile = document.querySelector("#popup-edit-profile-form");
export const popupWholePage = document.querySelector("#popup-edit-profile");
export const popupName = document.querySelector(".popup__input_type_name");
export const popupDescription = document.querySelector(
  ".popup__input_type_description"
);

export const popupSaveName = document.querySelector(".popup__save");

/*галерея*/

export const gallery = document.querySelector(".gallery");
export const openedImage = document.querySelector(".popup_type_image");

export const popupAddingCard = document.querySelector(".popup__add-card");

/*попап – добавить карточку*/

export const cardFormElement = document.querySelector("#popup-add-card-form");

/*попап – приблизить картинку*/

export const imageWholePage = document.querySelector("#popup-open-image");
export const popupImg = document.querySelector(".popup__foto");
export const figcaptionText = document.querySelector(".popup__figcaption");
export const imageCloseButton = document.querySelector(
  "#popup-open-image-close-button"
);

export const profilePhoto = document.querySelector('.profile__image')

export const popupUpdatePhoto = document.querySelector(
    ".popup_edit-photo"
  );

export const cardDeleteButton = document.querySelector('.popup__button-delete');
export const popupDeleteCard = document.querySelector('.popup_delete-card');
export const elementDeleteList = document.querySelectorAll('.gallery__delete-button');
export const currentPhoto = document.querySelector('.profile__image');
export const savingButton = document.querySelector('.popup__button')