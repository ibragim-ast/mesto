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
  buttonOpenAddCardPopup,
  buttonOpenProfileEdit,
  popupImage,
  popupImageCaption,
  popupLargeImageContainer,
  cardAddPopup,
  cardName,
  cardLink,
  profileNameInput,
  profileUserName,
  jobInput,
  profileUserProfession,
  profileEditPopup,
  popupEditAvatar,
  buttonOpenEditAvatar,
  imageAvatar,
  cardAddForm,
  profileEditForm,
  avatarEditForm
} from '../utils/constants.js';
import { data } from 'autoprefixer';

// Создание экземпляров валидаторов для форм
const avatarEditValidator = new FormValidator(options, avatarEditForm);
const addCardValidator = new FormValidator(options, cardAddForm);
const editProfileValidator = new FormValidator(options, profileEditForm);

// Создание экземпляра класса UserInfo для отображения информации о пользователе
const userInfo = new UserInfo({ userNameSelector: profileUserName, userJobSelector: profileUserProfession, userAvatar: imageAvatar });

// Функция для обработки отправки формы редактирования профиля
const handleEditAvatar = (link) => {
  renderLoading(false, popupEditAvatar);
  api.getEditAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => avatarEditPopup.close())
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      renderLoading(true, popupEditAvatar);
    });
};

// Функция для обработки отправки формы редактирования профиля
const handleEditProfile = (input) => {
  renderLoading(false, profileEditPopup)
  api.setUserInfo(input)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() =>
      profileEditFormPopup.close()
    )
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      renderLoading(true, profileEditPopup)
    })
}

// Создание экземпляров всплывающих окон
const popupWithImage = new PopupWithImage(popupLargeImageContainer);
const cardAddFormPopup = new PopupWithForm(cardAddPopup, handleFormSubmitNewCard);
const profileEditFormPopup = new PopupWithForm(profileEditPopup, handleEditProfile);
const avatarEditPopup = new PopupWithForm(popupEditAvatar, handleEditAvatar);
avatarEditPopup.setEventListeners();
const popupCardDelete = new PopupWithSubmit({ popupSelector: '.popup_type_card-delete' });
popupCardDelete.setEventListeners();

//Функция отображения процесса загрузки и получения информации с сервера
function renderLoading(loading, popup) {
  if (loading) {
    popup.querySelector(".form__submit").textContent = "Сохранить";
  } else {
    popup.querySelector(".form__submit").textContent = "Сохранение...";
  }
}

// Создание экземпляра класса Section для отображения начальных карточек на странице
const defaultCardList = new Section({
  renderer: renderCard
}, '.cards__list');

// Получение информации о пользователе и списка карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([infoUser, initialCards]) => {
    userInfo.setUserInfo(infoUser);
    const userId = infoUser._id
    console.log(userId)

    const cardsData = initialCards.map(item => {
      return {
        name: item.name,
        link: item.link,
        cardId: item._id,
        likes: item.likes,
        ownerId: item.owner._id,
        userId: userId
      };
    });
    defaultCardList.renderer(cardsData);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

//Функция создания новой карточки
const createCard = (dataCard, userId) => {
  const card = new Card({
    dataCard: dataCard,
    userId: userId,
    templateSelector: '#card-template',
    handleCardClick: (cardLink, cardName) => {
      popupWithImage.open(cardLink, cardName);
    },
    handleLikeCard: function (cardId) {
      api.putLikeCard(cardId)
        .then((res) => {
          this.showLikes(res.likes)
        })
        .catch(err => {
          console.error('ошибка получения данных', err);
        });
    },
    removeLikeCard: function (cardId) {
      api.deleteLikeCard(cardId)
        .then((res) => {
          this.showLikes(res.likes)
        })
        .catch(err => {
          console.error('ошибка получения данных', err);
        });
    },
    handleCardDelete: (cardId) => {
      popupCardDelete.open();
      popupCardDelete.handleSubmit(() => {
        api.deleteCard(cardId)
          .then(() => {
            card._handleDeleteCardButton();
            card.deleteCard();
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
  renderLoading(false, cardAddPopup)
  api.createNewCard(data)
    .then(res => {
      const newCard = createCard({ name: data.name, link: data.link, likes: 0, id: data.id });
      defaultCardList.addItem(newCard)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, cardAddPopup)
    })

  cardAddFormPopup.close();
}

// Установка слушателей событий для всплывающего окна редактирования профиля
const handleOpenEditForm = () => {
  profileEditFormPopup.setInputValues(userInfo.getUserInfo());
  editProfileValidator.clearFormErrors();
  profileEditFormPopup.open();
}

// Установка слушателей событий для кнопки добавления карточки
function handleAddCardButtonClick() {
  addCardValidator.clearFormErrors();
  cardAddFormPopup.open();
}

buttonOpenProfileEdit.addEventListener('click', handleOpenEditForm);
buttonOpenAddCardPopup.addEventListener('click', handleAddCardButtonClick);
buttonOpenEditAvatar.addEventListener('click', () => {
  avatarEditPopup.open();
});

popupWithImage.setEventListeners();
cardAddFormPopup.setEventListeners();
popupWithImage.setEventListeners();
profileEditFormPopup.setEventListeners();

// Включение валидации форм
addCardValidator.enableValidation();
editProfileValidator.enableValidation();
avatarEditValidator.enableValidation();
