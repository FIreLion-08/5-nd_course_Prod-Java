// Удаление последнего комментария

import { commentsArray } from './02_commentsArray.js'
import renderComments from './06_renderComments.js'

function deleteLastComment() {
    if (commentsArray.length > 0) {
        commentsArray.pop()
        renderComments()
    }
}

// На будущее API_2 (Todo)
// function deleteLastComment() {
//     deletebuttonElement.addEventListener('click', (event) => {
//         event.stopPropagation()
//         const lastCommentIndex = listElement.innerHTML.lastIndexOf(
//             '<li class="comment">',
//         )
//         if (lastCommentIndex !== -1) {
//             listElement.innerHTML = listElement.innerHTML.substring(
//                 0,
//                 lastCommentIndex,
//             )
//         }
//         // Удаление комментария и из сервера API
//         let idDelete = commentsArray[commentsArray.length - 1].id
//         fetch(
//             'https://wedev-api.sky.pro/api/v1/Dmitry-Avdoshkin/comments' +
//                 idDelete,
//             {
//                 method: 'DELETE',
//             },
//         ).then((response) => {
//             response.json().then(() => {
//                 // после получения данных, рендер их в приложении
//                 // tasks = responseData.commentsArray
//                 renderComments()
//             })
//         })
//     })
// }

export default deleteLastComment
// Удаление последнего комментария
