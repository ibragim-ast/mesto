import Card from './utCard.js'
import FormValidator from './FormValidator.js';
import { initialCards, options } from './constants.js'

const openProfileEditButton = document.querySelector('.profile__edit-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserProfession = document.querySelector('.profile__user-profession');
const elementsList = document.querySelector('.cards__list');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileNameInput = editProfilePopup.querySelector('.form__input_type_profile-name');
const jobInput = editProfilePopup.querySelector('.form__input_type_job');
const addCardPopup = document.querySelector('.popup_type_add-card');
const cardName = addCardPopup.querySelector('.form__input_type_card-name');
const cardLink = addCardPopup.querySelector('.form__input_type_link');
const popupLargeImageContainer = document.querySelector('.popup_type_large-image');
const popupImage = popupLargeImageContainer.querySelector('.popup__image');
const popupImageCaption = popupLargeImageContainer.querySelector('.popup__image-caption');
const addCardForm = document.forms['addCard'];
const editProfileForm = document.forms['editProfile'];

const addCardValidator = new FormValidator(options, addCardForm);
const editProfileValidator = new FormValidator(options, editProfileForm);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

// функция открытия попапа EditProfile
const handleEditButtonClick = () => {
  profileNameInput.value = profileUserName.textContent;
  jobInput.value = profileUserProfession.textContent;
  openPopup(editProfilePopup);
};

// функция сохранения внесенных данных в EditProfile
function handleEditProfileForm(evt) {
  evt.preventDefault();
  profileUserName.textContent = profileNameInput.value;
  profileUserProfession.textContent = jobInput.value;
  closePopup(editProfilePopup);
};

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPopupClose)
};

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPopupClose)
};

//функция закрытия попапа по нажатию на Escape
function handleEscPopupClose(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// функция обработки обработки кнопки submit в popup add Card
function handleAddCardForm(evt) {
  evt.preventDefault();
  addCard(createCardGallery({ name: cardName.value, link: cardLink.value }));
  closePopup(addCardPopup);
  evt.target.reset();
};

// функция добавления новой карточки
const addCard = (card) => {
  elementsList.prepend(card);
};

// функция открытия попапа добавления карточки
const handleAddCardButtonClick = () => {
  openPopup(addCardPopup);
};

function openPopupLargeImage(cardLink, cardName) {
  popupImage.src = cardLink;
  popupImageCaption.textContent = cardName;
  popupImage.alt = cardName;
  openPopup(popupLargeImageContainer);
};

const createCardGallery = (dataCard) => {
  return new Card(dataCard, '#card-template', openPopupLargeImage).generateCard();
};

//функция обработки кнопки закрытия попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

initialCards.forEach((item) => {
  const newCard = createCardGallery(item);
  elementsList.append(newCard);
});

//обработчики событий
openAddCardPopupButton.addEventListener('click', handleAddCardButtonClick);
openProfileEditButton.addEventListener('click', handleEditButtonClick);
addCardForm.addEventListener('submit', handleAddCardForm);
editProfileForm.addEventListener('submit', handleEditProfileForm);
