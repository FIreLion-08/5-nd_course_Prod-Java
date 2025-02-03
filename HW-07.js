import { postComment } from './modules/05_api.js'
// import { formatDateTime } from './modules/date.js'
import { fetchAndRenderComments } from './modules/01_render.js'
// import { renderComments } from './/modules/render.js'
// import { initDeleteButtonsLisners } from './modules/03_delete.js'
import { delay } from './modules/06_delay.js'

const buttonElement = document.getElementById('add-button')
const nameInputElement = document.getElementById('name-input')
const commentInputElement = document.getElementById('comment-input')
const loaderElement = document.getElementById('loading')

// Запрос двнных в API на комментарий
let comments = []
buttonElement.disabled = true
loaderElement.innerHTML = 'Подождите пожалуйста, комментарии загружаются...'
fetchAndRenderComments(comments)

//Рендер функция - Добавление комментариев (01_render.js)
//Кнопка лайков (02_likes.js)
//Кнопка удаления (03_delete.js)

//Форма добавления комментариев
buttonElement.addEventListener('click', () => {
    nameInputElement.style.backgroundColor = 'white'
    commentInputElement.style.backgroundColor = 'white'
    if (nameInputElement.value === '') {
        nameInputElement.style.backgroundColor = 'red'
        buttonElement.classList.add('disabled-button')
        return
    }
    if (commentInputElement.value === '') {
        commentInputElement.style.backgroundColor = 'red'
        buttonElement.classList.add('disabled-button')
        return
    }
    buttonElement.disabled = true
    buttonElement.textContent = 'Комментарий добавляется...'

    const handlePostClick = () => {
        // API (05_api.js)
        postComment(nameInputElement.value, commentInputElement.value)
            .then((response) => {
                //console.log(response);
                if (response.status === 201) {
                    return response.json()
                }
                if (response.status === 400) {
                    throw new Error('Неверный запрос')
                }
                if (response.status === 500) {
                    throw new Error('Сервер упал')
                }
            })
            .then((responseData) => {
                return fetchAndRenderComments(comments)
            })
            .then(() => {
                buttonElement.disabled = false
                buttonElement.textContent = 'Написать'
                nameInputElement.value = ''
                commentInputElement.value = ''
            })
            .catch((error) => {
                buttonElement.disabled = false
                buttonElement.textContent = 'Написать'
                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3 символов')
                }
                if (error.message === 'Сервер упал') {
                    //  Пробуем снова, если сервер сломался
                    alert('Кажется, что-то пошло не так, попробуй позже')
                    delay(1000).then(() => {
                        handlePostClick()
                    })
                }
                if (error.message === 'Failed to fetch') {
                    alert('Кажется,сломался интернет, попробуй позже')
                }
                // TODO: Отправлять в систему сбора ошибок
                console.warn(error)
            })
    }
    handlePostClick()
    // renderComments(comments);
    // initDeleteButtonsLisners(comments);
})
