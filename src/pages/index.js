import './index.css'

import { api } from '../components/Api.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
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

const popupCardDelete = new PopupWithSubmit({ popupSelector: '.popup_type_card-delete' });
popupCardDelete.setEventListeners();



// Функция для обработки отправки формы редактирования профиля
function handleEditProfile(input) {
  api.setUserInfo(input.name, input.job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      editProfileFormPopup.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([infoUser, initialCards]) => {
    userInfo.setUserInfo(infoUser.name, infoUser.about);
    const userId = infoUser._id
    console.log(userId)

    const cardsData = initialCards.map(item => {
      return {
        name: item.name,
        link: item.link,
        cardId: item._id,
        likes: item.likes,
        ownerId: item.owner._id
      };
    });
    defaultCardList.renderer(cardsData);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

const createCard = (dataCard, userId) => {
  const card = new Card({
    dataCard: dataCard,
    userId: userId,
    templateSelector: '#card-template',
    handleCardClick: (cardLink, cardName) => {
      popupWithImage.open(cardLink, cardName);
    },
    handleLikeCard: (cardId) => {
      api.putLikeCard(cardId)
        .then((res) => {
          const likesCounter = dataCard.likes;
          likesCounter.textContent = res.likes ? res.likes.length : 0;
        })
        .catch(err => {
          console.error('ошибка получения данных', err);
        });
    },
    removeLikeCard: (cardId) => {
      api.deleteLikeCard(cardId)
        .then((res) => {
          const likesCounter = dataCard._likes;
          likesCounter.textContent = res.likes ? res.likes.length : 0;
        })
        .catch(err => {
          console.error('ошибка получения данных', err);
        });
    },
    handleCardDelete: () => {
      popupCardDelete.open();
      popupCardDelete.handleSubmit(() => {
        api.deleteCard(card._cardId)
          .then(() => {
            card._handleRemoveButton();
            popupCardDelete.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  });

  return card.generateCard();
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


