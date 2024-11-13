export default class Card {
    constructor({name, link, comment}, cardSelector, handleImageClick){
        this._name = name;
        this._link = link;
        this._comment = comment;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    // _setEventListeners(){
         
    // }

   getCardElement() {
  this._cardElement = document
    .querySelector(this._cardSelector)
    .content.cloneNode(true);
  this._cardElement.querySelector('.card__image').src = `${this._link}`;
  this._cardElement.querySelector('.card__image').alt = `${this._name}`;
  this._cardElement.querySelector('.card__comments').textContent = `${this._comment}`;

  return this._cardElement;''
}


}