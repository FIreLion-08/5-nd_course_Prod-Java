import { likeComment } from './05_api.js'
import { fetchAndRenderComments, user } from '../HW-09.js'

export const initLikesListeners = (comments) => {
    for (const commentElement of document.querySelectorAll('.like-button')) {
        // Добавляет обработчик клика на конкретный элемент в списке
        commentElement.addEventListener('click', (event) => {
            event.stopPropagation()
            //Лайки не работают
            if (!user) {
                alert('Необхродима регистрация или авторизация')
                return
            }
            const id = commentElement.dataset.id
            likeComment({ id }).then(() => {
                fetchAndRenderComments(comments)
            })
        })
    }
}
