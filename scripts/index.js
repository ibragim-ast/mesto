import Card from './Card.js'
import FormValidator from './FormValidator.js';
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
} from './constants.js';
import Section from './Section.js';

const addCardValidator = new FormValidator(options, addCardForm);
const editProfileValidator = new FormValidator(options, editProfileForm);

const section = new Section({
  items: initialCards,
  renderer: (items) => {
    const card = createCardGallery(items);
    section.addItem(card);
  }
}, '.cards__list');

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




//обработчики событий
section.renderer();
openAddCardPopupButton.addEventListener('click', handleAddCardButtonClick);
openProfileEditButton.addEventListener('click', handleEditButtonClick);
addCardForm.addEventListener('submit', handleAddCardForm);
editProfileForm.addEventListener('submit', handleEditProfileForm);
addCardValidator.enableValidation();
editProfileValidator.enableValidation();

