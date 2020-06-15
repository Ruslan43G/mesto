import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {popUp, 
    nameInput, 
    jobInput, 
    formElement, 
    cardBtn, 
    formCardElement, 
    initialCards} from '../scripts/utils/constants.js';
import {errorClean, launchFormValidation} from '../scripts/utils/functions.js';    

// создаем экземпляр попапа для редактировать профиль
const profilePopup = new PopupWithForm('.popup', (formData) => {
    //создаем экземпляр UserInfo 
    const userInfo = new UserInfo( {name: '.profile__name', job: '.profile__about'});
    //Записываем данные на страницу
    userInfo.setUserInfo(formData); 
});

// Ловим клик по кнопке редактирования профиля   
popUp.addEventListener('click', () => {
    //очищаем ошибки валидации в форме
    errorClean(formElement);
    //создаем экземпляр UserInfo
    const userInfo = new UserInfo( {name: '.profile__name', job: '.profile__about'});
    //получем объект с данными пользователя со страницы
    const userData = userInfo.getUserInfo();
    //записываем данные в форму попапа
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    //открываем попап
    profilePopup.open();
});

// создаём экземпляр класса попапа с картинкой
const imagePopup = new PopupWithImage('.popup_image');

// создаём экземпляр попапа для добавленя картоки
const addCardPopup = new PopupWithForm('.popup_card', (formData) => {
    //создаём экземпляр класса Section
    const userCard= new Section({
        //передаём ему объект с данными из полей ввода формы
        items: [formData],
        //запускаем функцию создния карточки 
        renderer: ({link, name}) => {
        //создаём экземпляр класса Card с данными из формы   
        const card = new Card({link, name}, (evt) => imagePopup.open(evt), '#template');
        //Вставляем карточку в контейнер
        userCard.addItem(card.generateCard());
    }}, '.elements');
    //вызываем метод для отрисовкки карточек 
    userCard.renderItems();
    //закрываем попап
    imagePopup.close();
});

// ловим клик по кнопке добавления карточки
cardBtn.addEventListener('click', () => {
    //очищаем ошибки в форме
    errorClean(formCardElement);
    //открываем попап
    addCardPopup.open();
});

// Функция загрузки первоначальных 6 карточек на страницу из исходного массива.
const cardList = new Section({
    items: initialCards, 
    renderer: ({link, name}) => {
    const card = new Card({link, name}, (evt) => imagePopup.open(evt), '#template');
    cardList.addItem(card.generateCard());
}}, '.elements');

// Отрисовываем изначальные карточки
cardList.renderItems();
// вызываем функцию для запуска валидации на формах.
launchFormValidation(); 

