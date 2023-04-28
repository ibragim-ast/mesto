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
  popupProfileEdit,
  popupEditAvatar,
  popupLargeImageContainer,
  popupAddCard,
  buttonOpenAddCardPopup,
  buttonOpenProfileEdit,
  buttonOpenEditAvatar,
  profileUserName,
  profileUserProfession,
  imageAvatar,
  formAddCard,
  formProfileEdit,
  formAvatarEdit
} from '../utils/constants.js';
import { data } from 'autoprefixer';

// Создание экземпляров валидаторов для форм
const validatorAvatarEdit = new FormValidator(options, formAvatarEdit);
const validatorAddCard = new FormValidator(options, formAddCard);
const validatorProfileEdit = new FormValidator(options, formProfileEdit);

// Создание экземпляра класса UserInfo для отображения информации о пользователе
const userInfo = new UserInfo({ userNameSelector: profileUserName, userJobSelector: profileUserProfession, userAvatar: imageAvatar });

// Функция для обработки отправки формы редактирования профиля
const handleEditAvatar = (link) => {
  renderLoading(false, popupEditAvatar);
  api.getEditAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => popupAvatarEdit.close())
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      renderLoading(true, popupEditAvatar);
    });
};

// Функция для обработки отправки формы редактирования профиля
const handleEditProfile = (input) => {
  renderLoading(false, popupProfileEdit)
  api.setUserInfo(input)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() =>
      popupProfileEditForm.close()
    )
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      renderLoading(true, popupProfileEdit)
    })
}

// Создание экземпляров всплывающих окон
const popupWithImage = new PopupWithImage(popupLargeImageContainer);
const popupCardAddForm = new PopupWithForm(popupAddCard, handleFormSubmitNewCard);
const popupProfileEditForm = new PopupWithForm(popupProfileEdit, handleEditProfile);
const popupAvatarEdit = new PopupWithForm(popupEditAvatar, handleEditAvatar);
popupAvatarEdit.setEventListeners();
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

let userId;

// Получение информации о пользователе и списка карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([infoUser, initialCards]) => {
    userInfo.setUserInfo(infoUser);
    userId = infoUser._id
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
    defaultCardList.renderer(cardsData.reverse());
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
    handleCardDelete: function (cardId) {
      popupCardDelete.handleSubmit(() => {
        api.deleteCard(cardId)
          .then(() => {
            this.handleDeleteCardButton();
            this.deleteCard();
          })
          .then(() => {
            popupCardDelete.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      popupCardDelete.open();
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
  renderLoading(false, popupAddCard)
  api.createNewCard(data)
    .then(res => {
      const newCard = createCard({
        name: data.name,
        link: data.link,
        cardId: res._id,
        likes: res.likes,
        ownerId: res.owner._id,
        userId: userId
      });
      defaultCardList.addItem(newCard)
      defaultCardList.renderer();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, popupAddCard)
    })

  popupCardAddForm.close();
}

// Установка слушателей событий для всплывающего окна редактирования профиля
const handleOpenEditForm = () => {
  popupProfileEditForm.setInputValues(userInfo.getUserInfo());
  validatorProfileEdit.clearFormErrors();
  popupProfileEditForm.open();
}

// Установка слушателей событий для кнопки добавления карточки
function handleAddCardButtonClick() {
  validatorAddCard.clearFormErrors();
  popupCardAddForm.open();
}

buttonOpenProfileEdit.addEventListener('click', handleOpenEditForm);
buttonOpenAddCardPopup.addEventListener('click', handleAddCardButtonClick);
buttonOpenEditAvatar.addEventListener('click', () => {
  popupAvatarEdit.open();
});

popupWithImage.setEventListeners();
popupCardAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupProfileEditForm.setEventListeners();

// Включение валидации форм
validatorAddCard.enableValidation();
validatorProfileEdit.enableValidation();
validatorAvatarEdit.enableValidation();
