import './index.css'

import { api } from '../components/Api.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
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
import { data } from 'autoprefixer';

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
  api.setUserInfo(input.name, input.job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      editProfileFormPopup.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

api.getInitialCards()
  .then(res => {
    const data = res.map(item => {
      return {
        name: item.name,
        link: item.link,
        id: item._id,
        likes: item.likes.length
      };
    });
    console.log(data)
    defaultCardList.renderer(data);
  })
  .catch(err => {
    console.error('ошибка получения данных', err);
  });

function hundleLikeCard(cardId) {
  api.putLikeCard(cardId)
    .then((res) => {
      const likesCounter = document.querySelector('.card__like-counter');
      likesCounter.textContent = res.likes.length;
    })
    .catch(err => {
      console.error('ошибка получения данных', err);
    });
}

// Функция для обработки кликов на изображении карточки и открытия всплывающего окна с полноразмерным изображением
function handleCardClick(cardLink, cardName) {
  popupWithImage.open(cardLink, cardName);
};

// Функция для создания нового элемента карточки на основе переданных данных
function createCard(dataCard) {
  const card = new Card({ dataCard }, '#card-template', handleCardClick, hundleLikeCard);
  //console.log(dataCard)
  const cardTemp = card.generateCard();
  card._likes.textContent = dataCard.likes;
  return cardTemp;
};

// Функция для добавления только что созданной карточки в список карточек по умолчанию
function renderCard(data) {
  defaultCardList.addItem(createCard(data))
};

// Функция для обработки отправки формы добавления карточки
function handleFormSubmitNewCard(data) {
  api.createNewCard(data)
    .then(res => {
      const newCard = createCard({ name: data.name, link: data.link, likes: 0, id: data.id });
      defaultCardList.addItem(newCard)
      console.log(data);
    })
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

