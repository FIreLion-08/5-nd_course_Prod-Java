// 5.6 Модульный JS и npm
'use strict'
import replaceText from './modules/01_replaceText.js'
import commentsArray from './modules/02_commentsArray.js'
// import likes from "./modules/03_likes.js";
import renderComments from './modules/06_renderComments.js'
import noButton from './modules/07_noButton.js'
import getFormattedDate from './modules/08_date.js'
import deleteLastComment from './modules/09_deleteButton.js'

const nameInputElement = document.getElementById('name-input')
const commentInputElement = document.getElementById('comment-input')
const buttonElement = document.getElementById('add-button')
// const listElement = document.getElementById("list");
const deleteButtonElement = document.getElementById('delete-button')

// Функция безопасности ввода данных (01_replaceText.js)

// Массив комментариев (02_commentsArray.js)

// Добавление и удаление лайков (03_likes.js)

// Редактирование комментариев (04_handleEdit.js)

// Сохранение отредактированного комментария (05_handleSave.js)

// Добавление комментариев (06_renderComments.js)

// Инициализация рендеринга комментариев
renderComments()

// Условие неактивной кнопки (07_noButton.js)

// Инициализация неактивной кнопки
noButton()

// Функция клика, валидация
buttonElement.addEventListener('click', () => {
    nameInputElement.classList.remove('error')
    commentInputElement.classList.remove('error')
    buttonElement.classList.remove('disabled-button')

    nameInputElement.value = nameInputElement.value.trim()
    commentInputElement.value = commentInputElement.value.trim()

    if (nameInputElement.value === '' || commentInputElement.value === '') {
        nameInputElement.classList.add('error')
        commentInputElement.classList.add('error')
        buttonElement.classList.add('disabled-button')
        return
    }

    // Установка формата даты ДД.ММ.ГГГГ ЧЧ:ММ (07_date.js)

    commentsArray.push({
        name: replaceText(nameInputElement.value),
        date: getFormattedDate(),
        comment: replaceText(commentInputElement.value),
        like: 0,
        userLike: false,
        paint: false,
    })
    renderComments()
    nameInputElement.value = ''
    commentInputElement.value = ''
    buttonElement.disabled = true
})

// Удаление последнего комментария (09_deleteButton.js)
// Привязываем обработчик события к кнопке
deleteButtonElement.addEventListener('click', deleteLastComment)

// Нажатие для ввода ENTER
document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        buttonElement.click()
    }
})
