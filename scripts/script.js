// СКРИПТ ДЛЯ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА //
//---------------------------------------------------------------
let popUp = document.querySelector('.profile__edit-btn'); // выбираем кнопку редактировать
let pop = document.querySelector('.popup'); // выбираем блок poup

function editOpener() {
    pop.style.display = 'flex';      // функция для открытия попапа. Она меняет значение display у блока popup с none на flex
} 

popUp.addEventListener('click', editOpener);  // ловим клик по кнопке редактирования и открываем popup

//------------------------------------------------------------------

let popClose = document.querySelector('.popup__icon-close'); // выбираем кнопку закртия popup

function popUpClose() {
    pop.style.display = 'none';   // функция для закрытия попапа
}

popClose.addEventListener('click', popUpClose);   // ловик клик по кнопке закрытия попапа и закрываем его

//-------------------------------------------------------------------


