import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css'
import sansaImage from '../images/sansa.png';
import motherOfDragonsImage from '../images/mother-of-dragons.webp';
import johnSnowImage from '../images/john-snow.png';
import uncleNieceImage from '../images/uncle-niece.png';
import lordStarkImage from '../images/lord-stark.png';
import theArmyImage from '../images/the-army.png';
import defaultCamera from '../images/upload image.jpg';
import Api from "../components/Api.js";

const placeHolderImages = [
 
  {
    name: 'Sansa',
    link: sansaImage,
    comment: 'Queen Sansa of the North'
  },
  {
    name: 'Mother of Dragons',
    link: motherOfDragonsImage,
    comment: 'The true ruler'
  },
  {
    name: 'John Snow',
    link: johnSnowImage,
    comment: 'The peoples chosen one'
  },
  {
    name: 'Uncle & Niece',
    link: uncleNieceImage,
    comment: 'Family that will end it all'
  },
  {
    name: 'lord Stark',
    link: lordStarkImage,
    comment: 'Where it all began'
  },
  {
    name: 'The Army',
    link: theArmyImage,
    comment: 'The dragon army'
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
const imageDisplayPopup = container.querySelector('.image-display-modal');
const imageCaptionComment = imageDisplayPopup.querySelector('.image-display-modal__image-caption-comment');
const displayImage = imageDisplayPopup.querySelector('.image-display-modal__image');
const profilePopupCloseBtn = profilePopupContainer.querySelector(
  '.modal__close-button'
);
const imageUploadPopupCloseBtn = imageUploadPopup.querySelector(
  '.image-upload-modal__close-button'
);
const profileForm = profilePopupContainer.querySelector(
  '.modal__profile-edit-form'
);
const profileInputs = profileForm.querySelectorAll(".modal__form-input");
const imageDisplayPopupCloseBtn = imageDisplayPopup.querySelector('.image-display-modal__close-button');
const accountNameInput = profileForm.querySelector('.modal__username-input');
const accountTypeInput = profileForm.querySelector('.modal__account-type');
const accountBioInput = profileForm.querySelector('.modal__bio-input');
const profilePopupSaveBtn = profileForm.querySelector('.modal__form-button');
const headerBio = header.querySelector('.header__profile-bio');
const headerProfileType = header.querySelector('.header__profile-type');
const headerUsername = header.querySelector('.header__username');
const headerUsernameMenu = header.querySelector('.header__username-about-menu');
const cardContainer = container.querySelector('.main__cards');
const cardImage = cardContainer.querySelectorAll('.card__content');
const uploadedImage = imageUploadPopup.querySelector(
  '.image-upload-modal__image'
);
const imageUploadInput = imageUploadPopup.querySelector(
  '.image-upload-modal__file-input'
);
const imageUploadbtn = imageUploadPopup.querySelector(
  '.image-upload-modal__button'
);
const uploadedImageCaption = imageUploadPopup.querySelector(
  '.image-upload-modal__img-caption'
);
const userInfo = new UserInfo(
  '.header__username-about-menu',
   '.header__username',
   '.header__profile-type',
   '.header__profile-bio' );

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers:{
      authorization: "156f0753-536e-4aa7-b9b3-bc8ccb6104cb",
      "Content-Type": "application/json"
    }
});


api.getUserInfo()
  .then((data) => {
    console.log("User Info:", data);
    userInfo.setUserInfo({
        nameMenu: data.name,
        name: data.name,
        accountType: 'Personal Blog', // Assuming account type is static here; adjust if needed
        bio: data.about,
    })
  })
  .catch((err) => {
    console.log('Error in fetching user info:', err)
  })




const imageDisplayLikeButton = imageDisplayPopup.querySelector('.image-display-modal__unliked-button');
const imageDisplayDeleteButton =  imageDisplayPopup.querySelector('.image-display-modal__delete-button');


//liking displayed image (Make sure the like button like instance is different for each button)
imageDisplayLikeButton.addEventListener('click', function(){

  imageDisplayLikeButton.classList.toggle('image-display-modal__liked-button');

})


//popup instance for opening image display modal
const popupWithImage = new PopupWithImage('.image-display-modal', 'image-display-modal__modal-opened', imageDisplayPopupCloseBtn, cardContainer, displayImage, imageCaptionComment);
popupWithImage.open()
popupWithImage.setEventListeners()


//deleting displayed image
imageDisplayDeleteButton.addEventListener('click', function(e){
  let imageContainer = e.target.closest(".image-display-modal__container")
  let displayedImg = imageContainer.querySelector(".image-display-modal__image");
  let containerImages = Array.from(cardContainer.querySelectorAll('.card__image'));
  
  containerImages.forEach((image) => {
    if(image.src === displayedImg.src){
      let card = image.closest(".card__content");
      let cards = Array.from(cardContainer.children);
      cards.forEach((item) => {
         if(item == card){
          item.remove();
        }
      })
    }
  })
  
  popupWithImage.close();
})

//Creating a new instance of userInfo class


//function for submitting profile form
function handleProfileSubmitForm(data) {
  userInfo.setUserInfo({
    nameMenu: data['owner-username'],
    name: data['owner-username'],
    accountType: data['account-type'],
    bio: data['owner-bio']
  })

  const updatedData = {
    name: data['owner-username'],
    about: data['owner-bio']
  };

   api.updateUserInfo(updatedData)
    .then((res) => {
      console.log('Profile updated sucessfully:', res);
    })
    .catch((err) => {
      console.error('Error updating profile:', err);
    });
}






const popupWithForm = new PopupWithForm(
  '.modal',
   'modal__modal-opened',
    profilePopupCloseBtn,
     handleProfileSubmitForm,
     userInfo.getUserInfo.bind(userInfo)
    );

popupWithForm.setEventListeners();


imageUploadPopup.addEventListener('click', (e)=> {
  if(e.target === imageUploadPopup){
   imageUploadPopup.classList.remove('image-upload-modal__modal-opened');
  }
  
})


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (imageUploadPopup.classList.contains('image-upload-modal__modal-opened')) {
            imageUploadPopup.classList.remove('image-upload-modal__modal-opened');
        }
    }
});



//listening for click on add post button
addPostBtn.addEventListener('click', function () {
  imageUploadPopup.classList.add('image-upload-modal__modal-opened');
});

imageUploadPopupCloseBtn.addEventListener('click', function () {
  imageUploadPopup.classList.remove('image-upload-modal__modal-opened');
});



const validationData = {
 formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-btn",
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "form__input_type-error",
    errorClass: "form__input-error_active"
   };

//validating forms
const formValidator = new FormValidator(validationData);
formValidator.enableValidation();


//creating an instance of the section class
const section = new Section(
  {
    items: placeHolderImages,
    renderer: (data) => {
      const card = new Card(data, '#image-cards').getCardElement();
      section.addItem(card);
    }
  },
  '.main__cards'
)

section.renderItems();



function handleImageUpload(evt) { //func uploads new image from file
  evt.preventDefault();

  const imageInput = evt.target;
  if (imageInput.files[0]) { // conditional check if there was a file uploaded
    const reader = new FileReader();  //create new instance of the file reader

    reader.onload = function (e) {   // func sets the image src to the uploaded file
      e.preventDefault();
      imageUploadbtn.classList.add('image-upload-modal__visible'); 

      uploadedImage.src = e.target.result;    
      uploadedImage.classList.add('image-upload-modal__image-file'); 
      uploadedImageCaption.classList.add('image-upload-modal__visible');
      //refactor this
 function createCardWithImg  () { //func create new card with image
        imageUploadPopup.classList.remove('image-upload-modal__modal-opened');

  const uploadedCard = new Card({
    name:'hi',
     link: e.target.result,
     comment: uploadedImageCaption.value
     }, "#image-cards");

  const updatedCard = {
    name: 'hi',
    link: e.target.result
  };
       
         cardContainer.prepend(uploadedCard.getCardElement());
        api.updateCards(updatedCard)
           .then((res) => {
      console.log('cards updated sucessfully:', res);
    })
    .catch((err) => {
      console.error('Error updating cards:', err);
    });
        uploadedImage.src = defaultCamera;
        // imageInput.value = '';
        imageUploadbtn.classList.remove('image-upload-modal__visible');
        uploadedImage.classList.remove('image-upload-modal__image-file');
        e.target.value = "";
        imageUploadbtn.removeEventListener('click', createCardWithImg );
        imageInput.value = "";
        
      }

      imageUploadbtn.removeEventListener('click', createCardWithImg );
      imageUploadbtn.addEventListener('click', createCardWithImg );

    };

    //Reading the uploaded file as a data url
    reader.readAsDataURL(imageInput.files[0]);
  
  }

}



imageUploadInput.addEventListener('change', handleImageUpload);


//earlier when I split the function from the event listener, the image was not beinf reuploaded because the button was not cliked again
//So I have to clear the even listeners on the button