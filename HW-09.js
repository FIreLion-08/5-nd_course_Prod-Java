//use strict";
import { getComments } from './modules/05_api.js'
import { formatDateTime } from './modules/04_date.js'
import { renderComments } from './modules/01_render.js'
import { setToken } from './modules/05_api.js'
// import { sanitizeHtml } from './modules/07_sanitizeHtml.js'
import {
    // getUserFromLocalStorage,
    saveUserToLocalStorage,
    removeUserFromLocalStorage,
} from './modules/08_helpers.js'

// Запрос двнных в API на комментарий
let comments = []

//Рендер функция - Добавление комментариев (01_render.js)
//Кнопка лайков (02_likes.js)
//Кнопка удаления (03_delete.js)

// Берем данные user из localStorage
// export let user = getUserFromLocalStorage();
export let user = null
export const setUser = (newUser) => {
    user = newUser
    saveUserToLocalStorage(user)
}

export const logout = () => {
    user = null
    removeUserFromLocalStorage()
}

// Запрос данных в API на комментарий
export const fetchAndRenderComments = (comments) => {
    getComments({ token: setToken() })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: formatDateTime(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                }
            })
            comments = appComments
            renderComments(comments)
        })
        //Падения интернета при вводе комментариев
        .catch((error) => {
            alert(error.message)
            const appHTML = document.getElementById('app')
            appHTML.innerHTML = 'Ошибка с интернетом на странице комментариев'
            renderComments(comments)
        })
}
fetchAndRenderComments(comments)
// renderLogin()
