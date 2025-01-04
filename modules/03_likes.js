// Добавление и удаление лайков
import commentsArray from './02_commentsArray.js'
import renderComments from './06_renderComments.js'

const likes = () => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((el, index) => {
        el.addEventListener('click', (event) => {
            event.stopPropagation()
            commentsArray[index].userLike = !commentsArray[index].userLike
            commentsArray[index].userLike
                ? commentsArray[index].like++
                : commentsArray[index].like--

            // Переписываем комментарии
            renderComments()
        })
    })
}
export default likes
