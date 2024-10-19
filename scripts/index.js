const placeHolderImages = [
 

 
 {
    name: 'Sansa',
    link: './images/sansa.png',
  },
  {
    name: 'Mother of Dragons',
    link: './images/mother-of-dragons.webp',
  },
  {
    name: 'John Snow',
    link: './images/john-snow.png',
  },
  {
    name: 'Uncle & Niece',
    link: './images/uncle-niece.png',
  }, {
    name: 'lord Stark',
    link: './images/lord-stark.png',
  },{
    name: 'The Army',
    link: './images/the-army.png',
  },
  
];

//selecting elements from html
const container = document.querySelector('.container');
const header = container.querySelector('.header');
const profileEditBtn = header.querySelector('.header__button_edit-profile');
const addPostBtn = header.querySelector('.header__button_add-post')
const profilePopup = container.querySelector('.modal');
const profilePopupContainer = profilePopup.querySelector('.modal__container');
const imageUploadPopup = container.querySelector('.image-upload-modal');

const profilePopupCloseBtn = profilePopupContainer.querySelector(
  '.modal__close-button'
);
const profileForm = profilePopupContainer.querySelector(
  '.modal__profile-edit-form'
);
const accountNameInput = profileForm.querySelector('.modal__username-input');
const accountTypeInput = profileForm.querySelector('.modal__account-type');
const accountBioInput = profileForm.querySelector('.modal__bio-input');
const profilePopupSaveBtn = profileForm.querySelector('.modal__form-button');
const headerBio = header.querySelector('.header__profile-bio');
const headerProfileType = header.querySelector('.header__profile-type');
const headerUsername = header.querySelector('.header__username');
const headerUsernameMenu = header.querySelector('.header__username-about-menu');
const cardContainer = container.querySelector(".main__cards");

//listening for and opening and closing popup button
profileEditBtn.addEventListener('click', function () {
  profilePopup.classList.add('modal__modal-opened');
});

profilePopupCloseBtn.addEventListener('click', function () {
  profilePopup.classList.remove('modal__modal-opened');
});

//listening for click on add post button
addPostBtn.addEventListener('click', function (){
  imageUploadPopup.classList.add('image-upload-modal__modal-opened');
}
);



//function for submitting profile form
function handleProfileSubmitForm(evt) {
  evt.preventDefault();
  headerUsernameMenu.textContent = accountNameInput.value;
  headerUsername.textContent = accountNameInput.value;
  headerProfileType.textContent = accountTypeInput.value;
  headerBio.textContent = accountBioInput.value;
  profilePopup.classList.remove('modal__modal-opened');
}

function getCardElement(data) {
  const cardElement = document
    .querySelector('#image-cards')
    .content.cloneNode(true);
 cardElement.querySelector('.card__image').src = `${data.link}`;
 cardElement.querySelector('.card__image').alt = `${data.name}`;
return cardElement;
}

profileForm.addEventListener('submit', handleProfileSubmitForm);

for (let data of placeHolderImages){
   cardContainer.append(getCardElement(data))
}
