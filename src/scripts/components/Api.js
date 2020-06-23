export default class Api {
    constructor(options) {
        this._options = options;
    }

    postNewCard (formData) {
        return fetch ('https://mesto.nomoreparties.co/v1/cohort-12/cards', {
            method: 'POST',
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9',
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                link: formData.link
            })    
            }
        )
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/cards', {
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9'
            }
        })       
    }

    _writeUserData (data) {
        document.querySelector('.profile__name').textContent = data.name;
        document.querySelector('.profile__about').textContent = data.about;
    }

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-12/users/me', {
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9'
            }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
            .then((data) => {
                this._writeUserData(data);
                this._writeUserAvatar(data);
            });     

    }

    setUserInfo(newUserData) {
        return fetch ('https://mesto.nomoreparties.co/v1/cohort-12/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9',
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                name: newUserData.name,
                about: newUserData.job
            })    
            }
        )
    }

    _writeUserAvatar (data) {
        document.querySelector('.profile__img').src = data.avatar;
    }

    setUserAvatar (newUserData) {
        return fetch ('https://mesto.nomoreparties.co/v1/cohort-12/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9',
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                avatar: newUserData.avatar
            })    
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
        .then((data) => this._writeUserAvatar(data)) 

    }

    putLike(cardId) {
        
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9'
            }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
            .then((data) => data);
    }

    deleteLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9'
            }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            })
            .then((data) => data);
    }

    deleteCard(cardId) {
        fetch(`https://mesto.nomoreparties.co/v1/cohort-12/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
        .then((data) => data);
    }

}