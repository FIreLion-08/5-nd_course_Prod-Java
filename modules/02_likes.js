//Кнопка лайков
import { renderComments } from './01_render.js'
import { delay } from './06_delay.js'

export const initLikesListeners = (comments) => {
    for (const commentElement of document.querySelectorAll('.like-button')) {
        // Добавляет обработчик клика на конкретный элемент в списке
        commentElement.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = commentElement.dataset.index
            comments[index].likes += comments[index].isLike ? -1 : +1
            comments[index].isLike = !comments[index].isLike

            delay(100).then(() => {
                comments[index].userLike
                    ? comments[index].like++
                    : comments[index].like--

                // Переписываем комментарии
                renderComments(comments)
            })

            // renderComments(comments)
        })
    }
}
