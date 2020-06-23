import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api.js';
import Popup from '../scripts/components/Popup.js';
import {popUp,
    name,
    job,
    nameInput, 
    jobInput, 
    formElement, 
    cardBtn, 
    formCardElement,
    editAvatar} from '../scripts/utils/constants.js';
import {errorClean, launchFormValidation, textWhileLoading} from '../scripts/utils/functions.js';
// создаем экземпляр класса API
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/cards',
    headers: {
      authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9',
      'Content-Type': 'application/json'
    }});

// создаем экземпляр попапа для редактировать профиль
const profilePopup = new PopupWithForm('.popup', (formData) => {
    //Записываем данные на страницу
    api.setUserInfo(formData) // отправляем данные о профиле на сервер
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        })
        .then((data) => data)
        .catch((err) => console.log(err))
        .finally(textWhileLoading(true, '#profile-form'))
    api.getUserInfo(); // Загружаем данные на страницу 
});

// создаём экземпляр попапа для редактирования аватара
const avatarPopup = new PopupWithForm('.popup__avatar', (formData) => {
    api.setUserAvatar(formData)
        .finally(textWhileLoading(true, '#avatar-form'))
});
// ставим слушатель на редактирование аватара
editAvatar.addEventListener('click', () => {
    textWhileLoading(false, '#avatar-form');
    avatarPopup.open();
})

// попап удаления карточки
const deletePopup = new Popup('.popup_delete');
deletePopup.submit = function (_id) {
    deletePopup.open();
    this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.close();
        api.deleteCard(_id);
    })};

//создаём экземпляр класса Section для отрисовки элементов.
const sectionRender= new Section({
    //запускаем функцию создния карточки 
    renderer: ({link, name, likes, _id, owner}) => {
    //создаём экземпляр класса Card с данными из формы   
    const card = new Card({link, name, likes, _id, owner},
        ({link, name}) => imagePopup.open({link, name}),
        '#template',
        (_id) => api.putLike(_id),
        (_id) => api.deleteLike(_id),
        () => deletePopup.submit(_id));
    //Вставляем карточку в контейнер
    sectionRender.addItem(card.generateCard());
}}, '.elements');

// Ловим клик по кнопке редактирования профиля   
popUp.addEventListener('click', () => {
    textWhileLoading(false, '#profile-form');
    //очищаем ошибки валидации в форме
    errorClean(formElement);
    api.getUserInfo(); //
    //записываем данные в форму попапа
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    //открываем попап
    profilePopup.open();
});

// создаём экземпляр класса попапа с картинкой
const imagePopup = new PopupWithImage('.popup_image');

// создаём экземпляр попапа для добавленя картоки
const addCardPopup = new PopupWithForm('.popup_card', (formData) => {
    // получаем данные через API и отрисовываем карточку
    api.postNewCard(formData)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        })
        .then((data) => sectionRender.renderItems([data]))
        .catch((err) => console.log(err))
        .finally(textWhileLoading(true, '#card-form'));
    //закрываем попап
    imagePopup.close();
});

// ловим клик по кнопке добавления карточки
cardBtn.addEventListener('click', () => {
    textWhileLoading(false, '#card-form');
    //очищаем ошибки в форме
    errorClean(formCardElement);
    //открываем попап
    addCardPopup.open();
});

// при загрузке страницы загружаем с сервера имя пользователя и выводим на страницу
api.getUserInfo();
// Отрисовываем изначальные карточки вызовом метода экземпляра Api
api.getInitialCards()
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
    })
    .then((data) => sectionRender.renderItems(data))
    .catch((err) => console.log(err));
// вызываем функцию для запуска валидации на формах.
launchFormValidation(); 


