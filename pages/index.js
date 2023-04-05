import Card from '../src/components/Card.js';
import Section from '../src/components/Section.js';
import UserInfo from '../src/components/UserInfo.js';
import FormValidator from '../src/components/FormValidator.js';
import PopupWithImage from '../src/components/PopupWithImage.js';
import PopupWithForm from '../src/components/PopupWithForm.js';
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

const addCardValidator = new FormValidator(options, addCardForm);
const editProfileValidator = new FormValidator(options, editProfileForm);

const popupWithImage = new PopupWithImage(popupLargeImageContainer);
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: profileUserName, userJobSelector: profileUserProfession });

const handleEditProfile = (input) => {
  userInfo.setUserInfo(input.name, input.job);
  editProfileFormPopup.close();
}

const editProfileFormPopup = new PopupWithForm(editProfilePopup, handleEditProfile);

openProfileEditButton.addEventListener('click', () => {
  editProfileFormPopup.setInputValues(userInfo.getUserInfo());
  editProfileFormPopup.open();
});

editProfileFormPopup.setEventListeners();

function handleCardClick(cardLink, cardName) {
  popupWithImage.open(cardLink, cardName);
  popupWithImage.setEventListeners();
};

const addCardFormPopup = new PopupWithForm(addCardPopup, handleFormSubmitNewCard);

function createCard(dataCard) {
  const card = new Card({ dataCard }, '#card-template', handleCardClick);
  const cardTemp = card.generateCard();
  return cardTemp;
};

function renderCard(data) {
  defaultCardList.addItem(createCard(data))
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: renderCard
}, '.cards__list');

function handleFormSubmitNewCard(data) {
  renderCard(data);
  addCardFormPopup.close();
}

openAddCardPopupButton.addEventListener('click', () => {
  addCardFormPopup.open();
});

addCardFormPopup.setEventListeners();
addCardValidator.enableValidation();
editProfileValidator.enableValidation();
defaultCardList.renderer();
