
export default class UserInfo{
    constructor(nameMenuSelector, nameSelector, accountTypeSelector, bioSelector){
        this._nameMenu = document.querySelector(nameMenuSelector);
        this._name = document.querySelector(nameSelector);
        this._accountType = document.querySelector(accountTypeSelector);
        this._bio = document.querySelector(bioSelector)
    }

    getUserInfo(){
        return {
        "owner-username": this._name.textContent,
        "account-type": this._accountType.textContent,
        "owner-bio": this._bio.textContent,
        };
    }

    setUserInfo({nameMenu, name, accountType, bio }){
        this._nameMenu.textContent = nameMenu;   
        this._name.textContent = name;
        this._accountType.textContent = accountType;
        this._bio.textContent = bio;
      
    }
}