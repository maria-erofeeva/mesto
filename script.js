let popupLink = document.querySelector('.profile__name-edit');
let popup = document.querySelector('.popup__container');
let popupCloseButton = document.querySelector('.popup__close-icon');
let popupSaveButton = document.querySelector('.popup__save');
let formElement = document.querySelector('.popup__form');
let popupWholePage = document.querySelector('.popup');
let currentName = document.querySelector('.profile__current-name');
let currentDescription = document.querySelector('.profile__status');

popupLink.addEventListener ('click', function() {
    popupWholePage.classList.add('popup_opened');
    console.log ('Редактирование имени');
});

formElement.addEventListener ('submit', function() {
    console.log ('Изменения сохранены');
});

popupCloseButton.addEventListener ('click', function() {
    popupWholePage.classList.remove('popup_opened');
    console.log ('Форма редактирования закрыта');
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    let popupName = document.getElementById('name').value;
    let popupDescription = document.getElementById('description').value;
    currentName.textContent = popupName;
    currentDescription.textContent = popupDescription;
}

formElement.addEventListener('submit', formSubmitHandler); 