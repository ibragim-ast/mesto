const openProfileEditButton = document.querySelector('.profile__edit-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserProfession = document.querySelector('.profile__user-profession');
const cardsContainer = document.querySelector('.cards');
const elementsList = document.querySelector('.cards__list');
const likeButton = document.querySelectorAll('.card__like-button');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileNameInput = editProfilePopup.querySelector('.popup__input_type_profile-name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_job');
const editProfileSubmitButton = editProfilePopup.querySelector('.popup_submit-button_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const cardName = addCardPopup.querySelector('.popup__input_type_card-name');
const cardLink = addCardPopup.querySelector('.popup__input_type_link');
const addCardSubmitButton = addCardPopup.querySelector('.popup_submit-button_add-card');
const popupLargeImageContainer = document.querySelector('.popup_type_large-image');
const popupImage = popupLargeImageContainer.querySelector('.popup__image');
const popupImageCaption = popupLargeImageContainer.querySelector('.popup__image-caption');
const addCardForm = addCardPopup.querySelector('.popup__form');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const templateElement = document.getElementById('card-template');

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

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

// функция открытия попапа добавления карточки
const handleAddCardButtonClick = () => {
  openPopup(addCardPopup);
};

// функция создания новой карточки
function createNewCard(cardName, cardLink) {
  const cardElement = templateElement.content.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardLink;

  cardImage.addEventListener("click", function (evt) {
    popupImage.src = cardLink;
    popupImageCaption.textContent = cardName;
    popupImage.alt = cardName;
    openPopup(popupLargeImageContainer);
  });
  return cardElement;
};

// функция обработки обработки кнопки submit в popup add Card
function handleAddCardForm(evt) {
  evt.preventDefault();
  addCard(cardName.value, cardLink.value);
  closePopup(addCardPopup);
  evt.target.reset();
};

//функция удаления карточек
function removeCard(event) {
  if (event.target.classList.contains('card__remove-button')) {
    const cardToRemove = event.target.closest('.card');
    cardToRemove.remove();
  }
};

// обработчик кнопки лайка
function likeCard(event) {
  if (event.target.matches('.card__like-button')) {
    const cardToLike = event.target.closest('.card__like-button');
    cardToLike.classList.toggle('card_like-button_active');
  }
};

// функция добавления новой карточки
const addCard = (name, link) => {
  elementsList.prepend(createNewCard(name, link));
};

// функция перебора
const addCards = (cards) => {
  cards.forEach((card) => {
    addCard(card.name, card.link);
  });
};

//функция обработки кнопки закрытия попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//обработчики событий
openAddCardPopupButton.addEventListener('click', handleAddCardButtonClick);
openProfileEditButton.addEventListener('click', handleEditButtonClick);
addCardForm.addEventListener('submit', handleAddCardForm);
editProfileForm.addEventListener('submit', handleEditProfileForm);

//вызов функции перебора карточек из массива initialCards
addCards(initialCards);

//добавление слушателей событий для удаления карточек и лайков
cardsContainer.addEventListener('click', evt => {
  removeCard(evt);
  likeCard(evt);
});


