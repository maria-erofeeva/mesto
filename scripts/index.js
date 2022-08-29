const popupProfileOpenButton = document.querySelector(".profile__name-edit");
/*const popup = document.querySelector(".popup__container");*/
const popupCloseButton = document.getElementById("popup-edit-profile-close-button");
const formElement = document.getElementById("popup-edit-profile-form");
const popupWholePage = document.getElementById("popup-edit-profile");
const currentName = document.querySelector(".profile__current-name");
const currentDescription = document.querySelector(".profile__status");
const formInputName = document.querySelector(".popup__input_type_name");
const formInputDescription = document.querySelector(
  ".popup__input_type_description"
);

/*открыть попап*/

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

/*закрыть попап*/

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/*открыть/закрыть попап с редактированием профиля*/

popupProfileOpenButton.addEventListener("click", function() {
  openPopup(popupWholePage);
  formInputName.value = currentName.textContent;
  formInputDescription.value = currentDescription.textContent;
});

popupCloseButton.addEventListener("click", function() {
  closePopup(popupWholePage);
});

/*отправка формы попапа*/

function formSubmitHandler(evt) {
  evt.preventDefault();

  const popupName = document.querySelector(".popup__input_type_name").value;

  const popupDescription = document.querySelector(
    ".popup__input_type_description"
  ).value;

  currentName.textContent = popupName;

  currentDescription.textContent = popupDescription;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

/*открыть модальное окно*/

const addCardButton = document.querySelector(".profile__add-photo-button");
const addCardWholePage = document.getElementById("popup-add-card");
const addCardCloseButton = document.getElementById("popup-add-card-close-button");

function openModal() {
  addCardWholePage.classList.add("popup_opened");
}

addCardButton.addEventListener("click", openModal);

function closeModal() {
  addCardWholePage.classList.remove("popup_opened");
}

addCardCloseButton.addEventListener("click", closeModal);

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

const gallery = document.querySelector(".gallery");
const galleryCard = document.querySelector(".gallery__card");

const popupAddCardElement = document.getElementById("popup-add-card-form");
const templateElement = document.querySelector(".template");

/*обработка события отправки формы*/

function handleSubmit(e) {
  e.preventDefault();

  const link = document.getElementById("popup-add-card-link").value;
  const name = document.getElementById("popup-add-card-title").value;

  document.getElementById("popup-add-card-link").value = "";
  document.getElementById("popup-add-card-title").value = "";

  addCard(link, name);
  closeModal();
}

/*удаление карточки*/

function cardDelete(element) {
  const deletedCard = element.target.closest(".gallery__card");
  deletedCard.remove();
}

/*открытие модального окна*/


const openImageWholePage = document.getElementById("popup-open-image");
const galleryImage = document.querySelector(".gallery__image");
const galleryFig = document.querySelector(".gallery__card-title");
const popupImg = document.querySelector(".popup__foto");
const figcaptionText = document.querySelector(".popup__figcaption");

/*создание карточки*/


function addCard(link, name) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".gallery__image").src = link;
  newCard.querySelector(".gallery__card-title").textContent = name;

  newCard.querySelector(".gallery__delete-button").addEventListener("click", cardDelete);
  /*newCard.querySelector(".gallery__card").addEventListener("click", function(element) {
    openImageWholePage.classList.add("popup_opened");
    popupImg.src = element.target.src;
    figcaptionText.textContent = item.name;
  });*/

  gallery.prepend(newCard);
}

/*function openImage(element) {

  openImageWholePage.classList.add("popup_opened");

  popupImg.src = element.target.src;
  /*figcaptionText.innerHTML = element.target.textContent;
  console.log('element.target.textContent');
};*/

/*вызов*/

initialCards.forEach(function (item) {
  const newCard = templateElement.content.cloneNode(true);

  newCard.querySelector(".gallery__image").src = item.link;
  newCard.querySelector(".gallery__card-title").textContent = item.name;

  newCard.querySelector(".gallery__delete-button").addEventListener("click", cardDelete);

    newCard.querySelector(".gallery__image").addEventListener("click", function(element) {
      openImageWholePage.classList.add("popup_opened");
      popupImg.src = element.target.src;
      figcaptionText.textContent = item.name;
    });

  gallery.prepend(newCard);
});

popupAddCardElement.addEventListener("submit", handleSubmit);

/*поставить/убрать лайк*/

const likeButton = document.querySelector(".gallery__like-button");

function like() {
  likeButton.classList.toggle("gallery__like-button_active");
}

likeButton.addEventListener("click", like);

/*закрыть модальное окно*/

function closeImage() {
  openImageWholePage.classList.remove("popup_opened");
}

document.getElementById('popup-open-image-close-button').addEventListener("click", closeImage);
