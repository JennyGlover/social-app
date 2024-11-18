import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, displaySelector, closeBtn, handleFormSubmit, getUserInfo ){
          super(popupSelector, displaySelector, closeBtn);
          this._popup = document.querySelector(popupSelector);
          this._handleFormSubmit = handleFormSubmit;
          this._getUserInfo = getUserInfo;
          this._form = this._popup.querySelector('.modal__profile-edit-form');
          this._inputList = this._form.querySelectorAll('.modal__form-input');
          this._editBtn = document.querySelector('.header__button_edit-profile')
          //Phoenix was here
         
    }


_getInputValues(){
const inputValues = {};
this._inputList.forEach(input => {
    inputValues[input.name] = input.value;
});

return inputValues;

}

setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
        e.preventDefault();
         this._handleFormSubmit(this._getInputValues());
         this.close();
    })

    this._editBtn.addEventListener('click', ()=>{
        const userInfo = this._getUserInfo();
        this._inputList.forEach(input => {
            input.value = userInfo[input.name];
        })
        super.open();
        
    })

   
}
}                      