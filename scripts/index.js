const placeHolderImages = [
  {
    name: 'John Snow',
    link: './images/sansa.png',
  },
  {
    name: 'John Snow',
    link: './images/sansa.png',
  },
  {
    name: 'John Snow',
    link: './images/sansa.png',
  },

  {
    name: 'John Snow',
    link: './images/sansa.png',
  },
  {
    name: 'John Snow',
    link: './images/sansa.png',
  },
  {
    name: 'John Snow',
    link: './images/sansa.png',
  },
  {
    name: 'John Snow',
    link: './images/sansa.png',
  },
];

//selecting elements from html
const container = document.querySelector(".container");
const header = container.querySelector(".header");
const profileEditBtn = header.querySelector(".header__button_edit-profile");
const profilePopup = container.querySelector(".modal");
const profilePopupContainer = profilePopup.querySelector(".modal__container");
const profilePopupCloseBtn = profilePopupContainer.querySelector(".modal__close-button");
const profileForm = profilePopupContainer.querySelector(".modal__profile-edit-form");
const accountNameInput = profileForm.querySelector(".modal__username-input");
const accountTypeInput = profileForm.querySelector(".modal__account-type");
const accountBioInput = profileForm.querySelector(".modal__bio-input");
const profilePopupSaveBtn = profileForm.querySelector(".modal__form-button");
const headerBio = header.querySelector(".header__profile-bio");
const headerProfileType = header.querySelector(".header__profile-type");
const headerUsername = header.querySelector(".header__username");
const headerUsernameMenu = header.querySelector(".header__username-about-menu");
console.log(profileForm);

//listening for and opening and closing popup button
profileEditBtn.addEventListener("click", function(){
   profilePopup.classList.add("modal__modal-opened");
})

profilePopupCloseBtn.addEventListener("click", function(){
   profilePopup.classList.remove("modal__modal-opened");
})

//function for submitting profile form
function handleProfileSubmitForm(evt){
  evt.preventDefault(); 
  headerUsernameMenu.textContent = accountNameInput.value;
  headerUsername.textContent = accountNameInput.value;
  headerProfileType.textContent = accountTypeInput.value;
  headerBio.textContent = accountBioInput.value;
  profilePopup.classList.remove("modal__modal-opened");
}

profileForm.addEventListener("submit", handleProfileSubmitForm);
