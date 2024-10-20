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
  },
  {
    name: 'lord Stark',
    link: './images/lord-stark.png',
  },
  {
    name: 'The Army',
    link: './images/the-army.png',
  },
];

//selecting elements from html
const container = document.querySelector('.container');
const header = container.querySelector('.header');
const profileEditBtn = header.querySelector('.header__button_edit-profile');
const addPostBtn = header.querySelector('.header__button_add-post');
const profilePopup = container.querySelector('.modal');
const profilePopupContainer = profilePopup.querySelector('.modal__container');
const imageUploadPopup = container.querySelector('.image-upload-modal');

const profilePopupCloseBtn = profilePopupContainer.querySelector(
  '.modal__close-button'
);
const imageUploadPopupCloseBtn = imageUploadPopup.querySelector(
  '.image-upload-modal__close-button'
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
const cardContainer = container.querySelector('.main__cards');
const uploadedImage = imageUploadPopup.querySelector(
  '.image-upload-modal__image'
);
const imageUploadInput = imageUploadPopup.querySelector(
  '.image-upload-modal__file-input'
);
const imageUploadbtn = imageUploadPopup.querySelector(
  '.image-upload-modal__button'
);

//listening for and opening and closing popup button
profileEditBtn.addEventListener('click', function () {
  profilePopup.classList.add('modal__modal-opened');
});

profilePopupCloseBtn.addEventListener('click', function () {
  profilePopup.classList.remove('modal__modal-opened');
});

//listening for click on add post button
addPostBtn.addEventListener('click', function () {
  imageUploadPopup.classList.add('image-upload-modal__modal-opened');
});

imageUploadPopupCloseBtn.addEventListener('click', function () {
  imageUploadPopup.classList.remove('image-upload-modal__modal-opened');
});

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

for (let data of placeHolderImages) {
  cardContainer.append(getCardElement(data));
}

//function for uploading new image from file
function handleImageUpload(evt) {
  //trying to reset image - work on this//

  const imageInput = evt.target;
  //checking if there was a file uploaded
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader(); //ceating a new instance of the file reader

    //setting the image src to the uploaded file
    reader.onload = function (e) {
      imageUploadbtn.classList.add('image-upload-modal__button_type_visible'); //making upload btn visible
      uploadedImage.src = e.target.result; //changing the cam icon to the uploaded img
      uploadedImage.classList.add('image-upload-modal__image-file'); //styling new img
      imageUploadbtn.addEventListener('click', function () {
        imageUploadPopup.classList.remove('image-upload-modal__modal-opened');
        const cardElement = document
          .querySelector('#image-cards')
          .content.cloneNode(true);
        cardElement.querySelector('.card__image').src = e.target.result;
        // cardElement.querySelector('.card__image').alt = `${data.name}`;
        // return cardElement;
        cardContainer.prepend(cardElement);
        uploadedImage.src = '../images/upload image.jpg';
        imageInput.value = '';
        imageUploadbtn.classList.remove(
          'image-upload-modal__button_type_visible'
        );
        uploadedImage.classList.remove('image-upload-modal__image-file');
      });
    };

    //Reading the uploaded file as a data url
    reader.readAsDataURL(imageInput.files[0]);
    uploadedImage.src = '../images/upload image.jpg';
    e.target.result = '';
    // reader.onloadend = function (){
    //   // uploadedImage.src = '../images/upload image.jpg';
    //   uploadedImage.classList.remove('image-upload-modal__image-file');
    // imageUploadbtn.classList.remove('image-upload-modal__button_type_visible');
    // }
  }
}

imageUploadInput.addEventListener('change', handleImageUpload);
