export default class Api{
    constructor({baseUrl, headers}){
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserInfo(){
        return fetch(`${this.baseUrl}/users/me`,{
            headers: this.headers,
        })
          .then((res) => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error:${res.status}`);
          })
          .catch((err) => {
            console.error('Error during fetch user info:', err);
            throw err;
          })
    }

    updateUserInfo({name, about}){
        return fetch(`${this.baseUrl}/users/me`,{
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({name, about})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
            return Promise.reject(`Error:${res.status}`);
        })
        .catch(err => {
            console.error("Error updating user info:", err);
            throw err;
        })
    }

    updateCards({name, link}){
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({name, link})
      })
      .then(res => {
         if(res.ok){
            return res.json()
            }
            return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
      }) 
      .catch(err => {
            console.error("Error updating cards:", err);
            throw err;
        })
    }


    getInitialCards(){
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
      }) 
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject('Error:${res.status}');
        })
        .catch((err)=>{
            console.error("Error during fetch:", err);
            throw err;
        })
        
    }

    getUserAndCards(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
           .then(([userInfo, cards]) => {
            return {userInfo, cards};
           })
           .catch((err) => {
            console.error("Error fetching user info or cards:", err);
            throw err;
           });
    }

   
}


