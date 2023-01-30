const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const popupContainer = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserProfession = document.querySelector('.profile__user-profession');

const handleEditButtonClick = () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserProfession.textContent;
}

function handleSubmitButton(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserProfession.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

const handleCloseButtonClick = () => {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popupContainer.addEventListener('submit', handleSubmitButton);

