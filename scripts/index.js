let popupLink = document.querySelector(".profile__name-edit");
let popup = document.querySelector(".popup__container");
let popupCloseButton = document.querySelector(".popup__close-icon");
let formElement = document.querySelector(".popup__form");
let popupWholePage = document.querySelector(".popup");
let currentName = document.querySelector(".profile__current-name");
let currentDescription = document.querySelector(".profile__status");
let formInputName = document.querySelector(".popup__input_type_name");
let formInputDescription = document.querySelector(
  ".popup__input_type_description"
);

/*открыть попап*/

function openPopup() {
  popupWholePage.classList.add("popup_opened");

  formInputName.value = currentName.textContent;

  formInputDescription.value = currentDescription.textContent;
}

popupLink.addEventListener("click", openPopup);

function closePopup() {
  popupWholePage.classList.remove("popup_opened");
}

popupCloseButton.addEventListener("click", closePopup);

/*отправка формы попапа*/

function formSubmitHandler(evt) {
  evt.preventDefault();

  let popupName = document.querySelector(".popup__input_type_name").value;

  let popupDescription = document.querySelector(
    ".popup__input_type_description"
  ).value;

  currentName.textContent = popupName;

  currentDescription.textContent = popupDescription;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

/*открыть модальное окно*/

const addCardButton = document.querySelector(".profile__add-photo-button");
const modalWholePage = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal__close-icon");

function openModal() {
  modalWholePage.classList.add("modal_opened");
}

addCardButton.addEventListener("click", openModal);

function closeModal() {
  modalWholePage.classList.remove("modal_opened");
}

modalCloseButton.addEventListener("click", closeModal);

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

const modalElement = document.querySelector(".modal__form");
const templateElement = document.querySelector(".template");

/*обработка события отправки формы*/

function handleSubmit(e) {
  e.preventDefault();

  const link = document.querySelector(".modal__input_type_image").value;
  const name = document.querySelector(".modal__input_type_title").value;

  document.querySelector(".modal__input_type_image").value = "";
  document.querySelector(".modal__input_type_title").value = "";

  addCard(link, name);
  closeModal();
}

/*удаление карточки*/

function cardDelete(element) {
  const deletedCard = element.target.closest(".gallery__card");
  deletedCard.remove();
}

/*открытие модального окна*/


const modalPage = document.querySelector(".image-modal");
const galleryImage = document.querySelector(".gallery__image");
const galleryFig = document.querySelector(".gallery__card-title");
const modalImg = document.querySelector(".image-modal__foto");
const figcaptionText = document.querySelector(".image-modal__figcaption");

/*создание карточки*/


function addCard(link, name) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".gallery__image").src = link;
  newCard.querySelector(".gallery__card-title").textContent = name;

  newCard.querySelector(".gallery__delete-button").addEventListener("click", cardDelete);
  newCard.querySelector(".gallery__card").addEventListener("click", function(element) {
    modalPage.classList.add("image-modal_opened");
    modalImg.src = element.target.src;
    figcaptionText.textContent = item.name;
  });

  gallery.prepend(newCard);
}

/*function openImage(element) {

  modalPage.classList.add("image-modal_opened");

  modalImg.src = element.target.src;
  /*figcaptionText.innerHTML = element.target.textContent;
  console.log('element.target.textContent');
};*/

/*вызов*/

initialCards.forEach(function (item) {
  const newCard = templateElement.content.cloneNode(true);

  newCard.querySelector(".gallery__image").src = item.link;
  newCard.querySelector(".gallery__card-title").textContent = item.name;

  newCard.querySelector(".gallery__delete-button").addEventListener("click", cardDelete);

    newCard.querySelector(".gallery__card").addEventListener("click", function(element) {
      modalPage.classList.add("image-modal_opened");
      modalImg.src = element.target.src;
      figcaptionText.textContent = item.name;
    });

  gallery.prepend(newCard);
});

modalElement.addEventListener("submit", handleSubmit);

/*поставить/убрать лайк*/

const likeButton = document.querySelector(".gallery__like-button");

function like() {
  likeButton.classList.toggle("gallery__like-button_active");
}

likeButton.addEventListener("click", like);

/*закрыть модальное окно*/

function closeImage() {
  modalPage.classList.remove("image-modal_opened");
}

document.querySelector('.image-modal__close-icon').addEventListener("click", closeImage);
