export default class Popup{
    constructor(popupSelector, displaySelector, closeBtn){
      this._popup = document.querySelector(popupSelector);
      this._displaySelector = displaySelector;
      this._closeBtn = closeBtn;
    }

    open(){
      this._popup.classList.add(this._displaySelector)
    }

    close(){
      this._popup.classList.remove(this._displaySelector)
    }

    _handleEscClose(e){
    if (e.key === 'Escape') {
        if (this._popup.classList.contains(this._displaySelector )) {
           this.close();
        }
    } 

    }


    setEventListeners(){
       this._closeBtn.addEventListener('click', () => {
          this.close();
       })
       
      this._popup.addEventListener('click', (e)=> {
  if(e.target === this._popup){
   this.close();
  }
  
})

document.addEventListener('keydown', (e) => {
  this._handleEscClose(e)
});

    }
}