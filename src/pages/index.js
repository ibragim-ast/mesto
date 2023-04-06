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
  addCardForm,
  editProfileForm,
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

// Создание экземпляра валидатора для формы добавления карточки
const addCardValidator = new FormValidator(options, addCardForm);

// Создание экземпляра валидатора для формы редактирования профиля
const editProfileValidator = new FormValidator(options, editProfileForm);

// Создание экземпляра всплывающего окна с полноразмерным изображением
const popupWithImage = new PopupWithImage(popupLargeImageContainer);

// Установка слушателей событий для всплывающего окна с полноразмерным изображением
popupWithImage.setEventListeners();

// Создание экземпляра класса UserInfo для отображения информации о пользователе
const userInfo = new UserInfo({ userNameSelector: profileUserName, userJobSelector: profileUserProfession });

// Функция для обработки отправки формы редактирования профиля
function handleEditProfile(input) {
  userInfo.setUserInfo(input.name, input.job);
  editProfileFormPopup.close();
}

// Создание экземпляра всплывающего окна для редактирования профиля
const editProfileFormPopup = new PopupWithForm(editProfilePopup, handleEditProfile);

// Установка слушателей событий для всплывающего окна редактирования профиля
openProfileEditButton.addEventListener('click', () => {
  editProfileFormPopup.setInputValues(userInfo.getUserInfo());
  editProfileFormPopup.open();
});
editProfileFormPopup.setEventListeners();

// Функция для обработки кликов на изображении карточки и открытия всплывающего окна с полноразмерным изображением
function handleCardClick(cardLink, cardName) {
  popupWithImage.open(cardLink, cardName);
  popupWithImage.setEventListeners();
};

// Создание экземпляра всплывающего окна для добавления карточки
const addCardFormPopup = new PopupWithForm(addCardPopup, handleFormSubmitNewCard);

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

// Создание экземпляра класса Section для отображения начальных карточек на странице
const defaultCardList = new Section({
  items: initialCards,
  renderer: renderCard
}, '.cards__list');

// Функция для обработки отправки формы добавления карточки
function handleFormSubmitNewCard(data) {
  renderCard(data);
  addCardFormPopup.close();
}

// Установка слушателей событий для кнопки добавления карточки
openAddCardPopupButton.addEventListener('click', () => {
  addCardFormPopup.open();
});

// Установка слушателей событий для всплывающего окна добавления карточки
addCardFormPopup.setEventListeners();

// Включение валидации формы добавления карточки
addCardValidator.enableValidation();

// Включение валидации формы редактирования профиля
editProfileValidator.enableValidation();

// Отрисовка начальных карточек на странице
defaultCardList.renderer();
