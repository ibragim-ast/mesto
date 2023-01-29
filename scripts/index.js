const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const popupContainer = popup.querySelector('.popup__container');
let editValueName = popup.querySelector('.popup__name');
let editValueProfession = popup.querySelector('.popup__profession');
let profileUserName = document.querySelector('.profile__user_name');
let profileUserProfession = document.querySelector('.profile__user_profession');

const handleEditButtonClick = () => {
  popup.classList.add('popup_opened');
  editValueName.value = profileUserName.textContent;
  editValueProfession.value = profileUserProfession.textContent;
}

function handleSubmitButton(evt) {
  evt.preventDefault();
  profileUserName.textContent = editValueName.value;
  profileUserProfession.textContent = editValueProfession.value;
  popup.classList.remove('popup_opened');
}

const handleCloseButtonClick = () => {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popupContainer.addEventListener('submit', handleSubmitButton);

