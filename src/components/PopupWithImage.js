import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector, displaySelector, closeBtn, cardContainer, displayImage, imageCaptionComment){
          super(popupSelector, displaySelector, closeBtn);
          this._popup = document.querySelector(popupSelector);
          this._cardContainer = cardContainer
          this._displayImage = displayImage;
          this._imageCaptionComment = imageCaptionComment;
         
    }


open(){

 this._cardContainer.addEventListener("click", (e) => {
 this._imageContainer = e.target.closest(".card__content");
 this._myImage = this._imageContainer.querySelector(".card__image");
 this._myCaption = this._imageContainer.querySelector(".card__comments");
 this._displayImage.src = this._myImage.src;
 this._imageCaptionComment.textContent = this._myCaption .textContent;
 super.open();
})

    }


}