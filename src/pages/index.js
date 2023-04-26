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
  buttonOpenProfileEdit,
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
  editProfilePopup,
  popupEditAvatar,
  openEditAvatarBtn,
  imageAvatar,
  addCardForm,
  editProfileForm,
  editAvatarForm
} from '../utils/constants.js';
import { data } from 'autoprefixer';



// Создание экземпляра валидатора для формы добавления карточки
const addCardValidator = new FormValidator(options, addCardForm);

// Создание экземпляра валидатора для формы редактирования профиля
const editProfileValidator = new FormValidator(options, editProfileForm);


// Создание экземпляра всплывающего окна с полноразмерным изображением
const popupWithImage = new PopupWithImage(popupLargeImageContainer);

// Создание экземпляра класса UserInfo для отображения информации о пользователе
const userInfo = new UserInfo({ userNameSelector: profileUserName, userJobSelector: profileUserProfession, userAvatar: imageAvatar });

// Функция для обработки отправки формы редактирования профиля
const handleEditProfile = (input) => {
  api.setUserInfo(input)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() =>
      editProfileFormPopup.close()
    )
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      renderLoading(false, editProfilePopup)
    })
}


// Создание экземпляра всплывающего окна для редактирования профиля
const editProfileFormPopup = new PopupWithForm(editProfilePopup, handleEditProfile);

// Создание экземпляра всплывающего окна для добавления карточки
const addCardFormPopup = new PopupWithForm(addCardPopup, handleFormSubmitNewCard);

const handleEditAvatar = (link) => {
  api.getEditAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => editAvatarPopup.close())
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      renderLoading(false, popupEditAvatar);
    });
};


const editAvatarValidator = new FormValidator(options, editAvatarForm);

const editAvatarPopup = new PopupWithForm(popupEditAvatar, handleEditAvatar);
editAvatarPopup.setEventListeners();

openEditAvatarBtn.addEventListener('click', () => {
  editAvatarPopup.open();
  renderLoading(true, popupEditAvatar);
});

editAvatarValidator.enableValidation();

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

const popupCardDelete = new PopupWithSubmit({ popupSelector: '.popup_type_card-delete' });
popupCardDelete.setEventListeners();



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
  api.createNewCard(data)
    .then(res => {
      const newCard = createCard({ name: data.name, link: data.link, likes: 0, id: data.id });
      defaultCardList.addItem(newCard)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, addCardPopup)
    })

  addCardFormPopup.close();
}

// Установка слушателей событий для всплывающего окна редактирования профиля
const handleOpenEditForm = () => {
  editProfileFormPopup.setInputValues(userInfo.getUserInfo());
  editProfileValidator.clearFormErrors();
  editProfileFormPopup.open();
  renderLoading(true, editProfilePopup)
}

// Установка слушателей событий для кнопки добавления карточки
function handleAddCardButtonClick() {
  addCardValidator.clearFormErrors();
  addCardFormPopup.open();
  renderLoading(true, addCardPopup)
}

buttonOpenProfileEdit.addEventListener('click', handleOpenEditForm);
openAddCardPopupButton.addEventListener('click', handleAddCardButtonClick);


popupWithImage.setEventListeners();
addCardFormPopup.setEventListeners();
popupWithImage.setEventListeners();
editProfileFormPopup.setEventListeners();

// Включение валидации форм
addCardValidator.enableValidation();
editProfileValidator.enableValidation();
