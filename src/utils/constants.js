export const options = {
  formSelector: '.form',
  submitSelector: '.form__submit',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__section',
  inputErrorSelector: '.form__input-error',
  inputErrorClass: 'form__input-error_active',
  disabledButtonClass: 'form__submit_inactive',
}

export const buttonOpenProfileEdit = document.querySelector('.profile__edit-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonOpenEditAvatar = document.querySelector('.profile__avatar');
export const popups = document.querySelectorAll('.popup');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupLargeImageContainer = document.querySelector('.popup_type_large-image');
export const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
export const popupImage = popupLargeImageContainer.querySelector('.popup__image');
export const popupImageCaption = popupLargeImageContainer.querySelector('.popup__image-caption');
export const profileUserName = document.querySelector('.profile__user-name');
export const profileUserProfession = document.querySelector('.profile__user-profession');
export const elementsList = document.querySelector('.cards__list');
export const profileNameInput = popupProfileEdit.querySelector('.form__input_type_profile-name');
export const jobInput = popupProfileEdit.querySelector('.form__input_type_job');
export const cardName = popupAddCard.querySelector('.form__input_type_card-name');
export const cardLink = popupAddCard.querySelector('.form__input_type_link');
export const imageAvatar = document.querySelector('.profile__image');
export const likeButton = document.querySelector('.card__like-button');
export const formAddCard = document.forms['addCard'];
export const formProfileEdit = document.forms['editProfile'];
export const formAvatarEdit = document.forms['editAvatar'];
