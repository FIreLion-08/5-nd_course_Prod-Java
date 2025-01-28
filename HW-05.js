// Urok_05.08_API 1._GET,_POST,_DELETE
'use strict'
import { updateCommentsArray } from './modules/02_commentsArray.js'
import renderComments from './modules/06_renderComments.js'
import noButton from './modules/07_noButton.js'
// import getFormattedDate from './modules/08_date.js'
import deleteLastComment from './modules/09_deleteButton.js'
import { fetchComments } from './modules/10_api.js'

const nameInputElement = document.getElementById('name-input')
const commentInputElement = document.getElementById('comment-input')
const buttonElement = document.getElementById('add-button')
const deleteButtonElement = document.getElementById('delete-button')

// Функция безопасности ввода данных (01_replaceText.js)

// // Массив комментариев (02_commentsArray.js)
// export let commentsArray = []

//HW_05.05
// Получение комментариев при загрузке (10_api.js)
fetchComments()
    .then((formatComments) => {
        updateCommentsArray(formatComments) // Обновляем массив комментариев
        renderComments() // Рендерим комментарии после обработки
    })
    .catch((error) => {
        console.error('Ошибка при получении комментариев:', error)
    })

// Добавление и удаление лайков (03_likes.js)

// Редактирование комментариев (04_handleEdit.js)

// Сохранение отредактированного комментария (05_handleSave.js)

// Добавление комментариев (06_renderComments.js)

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

    //HW_05.05
    // Добавление нового комментария и загрузка в сервер API
    fetch('https://wedev-api.sky.pro/api/v1/Dmitry-Avdoshkin/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            // Получение комментариев при загрузке (10_api.js)
            return fetchComments()
        })
        .then((formatComments) => {
            updateCommentsArray(formatComments) // Обновляем массив комментариев
            renderComments() // Рендерим комментарии после обработки
        })
        .catch((error) => {
            console.error('Ошибка при получении комментариев:', error)
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
