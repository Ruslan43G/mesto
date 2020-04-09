//ОТКРЫТИT И ЗАКРЫТИЕ ПОПАПА //
//---------------------------------------------------------------
const popUp = document.querySelector('.profile__edit-btn'); // выбираем кнопку редактировать
const pop = document.querySelector('.popup'); // выбираем блок poup

function editOpener() {
    pop.classList.add('popup_opened');     // функция для открытия попапа. Добавляет модификатор _opened со значением display: flex
} 

popUp.addEventListener('click', editOpener);  // ловим клик по кнопке редактирования и открываем popup

//------------------------------------------------------------------

const popClose = document.querySelector('.popup__icon-close'); // выбираем кнопку закртия popup

function popUpClose() {
    pop.classList.remove('popup_opened');   // функция для закрытия попапа, она удаляет модификатор _opened у элемента с классом popup
}

popClose.addEventListener('click', popUpClose);   // ловим клик по кнопке закрытия попапа и закрываем его функцией

//-------------------------------------------------------------------
// РЕДАКТИРОВАНИЕ ПРОФИЛЯ //
// Находим форму в DOM
const formElement = document.querySelector('form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    const nameInput = document.querySelector('.popup__name');
    const jobInput = document.querySelector('.popup__about');
    // Получите значение полей из свойства value
    nameInput.value;
    jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const name = document.querySelector('.profile__name');
    const job = document.querySelector('.profile__about');

    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



