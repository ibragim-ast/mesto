import './index.css'

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  options,
  popups,
  elementsList,
  openAddCardPopupButton,
  openProfileEditButton,
  popupImage,
  popupImageCaption,
  popupLargeImageContainer,
  addCardPopup,
  cardName,
  cardLink,
  profileNameInput,
  profileUserName,
  jobInput,
  profileUserProfession,
  editProfilePopup
} from '../utils/constants.js';

const addCardForm = document.forms['addCard'];
const editProfileForm = document.forms['editProfile'];

// Создание экземпляра валидатора для формы добавления карточки
const addCardValidator = new FormValidator(options, addCardForm);

// Создание экземпляра валидатора для формы редактирования профиля
const editProfileValidator = new FormValidator(options, editProfileForm);

// Создание экземпляра всплывающего окна с полноразмерным изображением
const popupWithImage = new PopupWithImage(popupLargeImageContainer);


// Создание экземпляра класса UserInfo для отображения информации о пользователе
const userInfo = new UserInfo({ userNameSelector: profileUserName, userJobSelector: profileUserProfession });

// Создание экземпляра всплывающего окна для редактирования профиля
const editProfileFormPopup = new PopupWithForm(editProfilePopup, handleEditProfile);

// Создание экземпляра всплывающего окна для добавления карточки
const addCardFormPopup = new PopupWithForm(addCardPopup, handleFormSubmitNewCard);

// Создание экземпляра класса Section для отображения начальных карточек на странице
const defaultCardList = new Section({
  renderer: renderCard
}, '.cards__list');

// Функция для обработки отправки формы редактирования профиля
function handleEditProfile(input) {
  userInfo.setUserInfo(input.name, input.job);
  editProfileFormPopup.close();
}

// Функция для обработки кликов на изображении карточки и открытия всплывающего окна с полноразмерным изображением
function handleCardClick(cardLink, cardName) {
  popupWithImage.open(cardLink, cardName);
};

// Функция для создания нового элемента карточки на основе переданных данных
function createCard(dataCard) {
  const card = new Card({ dataCard }, '#card-template', handleCardClick);
  const cardTemp = card.generateCard();
  return cardTemp;
};

// Функция для добавления только что созданной карточки в список карточек по умолчанию
function renderCard(data) {
  defaultCardList.addItem(createCard(data))
};

// Функция для обработки отправки формы добавления карточки
function handleFormSubmitNewCard(data) {
  renderCard(data);
  addCardFormPopup.close();
}

// Установка слушателей событий для всплывающего окна редактирования профиля
function handleOpenEditForm() {
  editProfileFormPopup.setInputValues(userInfo.getUserInfo());
  editProfileValidator.clearFormErrors();
  editProfileFormPopup.open();
}

// Установка слушателей событий для кнопки добавления карточки
function handleAddCardButtonClick() {
  addCardValidator.clearFormErrors();
  addCardFormPopup.open();
}

openProfileEditButton.addEventListener('click', handleOpenEditForm);
openAddCardPopupButton.addEventListener('click', handleAddCardButtonClick);

popupWithImage.setEventListeners();
addCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();
editProfileFormPopup.setEventListeners();

// Включение валидации форм
addCardValidator.enableValidation();
editProfileValidator.enableValidation();

// Отрисовка начальных карточек на странице
defaultCardList.renderer(initialCards);
