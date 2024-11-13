export default class FormValidator {
   constructor(data){
     this._data = data;
   }


//validating profile form inputs

   //showing validation error
_showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);

  }

  //hiding validation error
_hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = "";
  
  }

  //checkingValidity
 _checkInputValidity(formElement, inputElement) {
    const submitBtn = formElement.querySelector(this._data.submitButtonSelector)
    if(!inputElement.validity.valid){
      this._showInputError(formElement, inputElement, inputElement.validationMessage, this._data);
      submitBtn.classList.add(this._data.inactiveButtonClass);
      submitBtn.disabled = true;
    }else{
       this._hideInputError(formElement, inputElement);
       submitBtn.classList.remove(this._data.inactiveButtonClass);
       submitBtn.disabled = false;
    }
  }


 _setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll(this._data.inputSelector));
    inputList.forEach((inputElement) =>{
      inputElement.addEventListener('blur', () =>{
       this._checkInputValidity(formElement, inputElement, this._data);
      })
      
    })
  }


    enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._data.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt){
        evt.preventDefault();
      });
      this._setEventListeners(formElement, this._data);
    })
   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
}