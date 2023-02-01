const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__name-input');
const jobInput = popup.querySelector('.popup__job-input');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserProfession = document.querySelector('.profile__user-profession');

const handleEditButtonClick = () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserProfession.textContent;
}

const handleCloseButtonClick = () => {
  popup.classList.remove('popup_opened');
}

function handleSubmitButton(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserProfession.textContent = jobInput.value;
  handleCloseButtonClick();
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popupForm.addEventListener('submit', handleSubmitButton);

