// Условие неактивной кнопки

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("add-button");

function noButton() {
    buttonElement.disabled = true;
    const checkButtonState = () => {
      buttonElement.disabled =
        nameInputElement.value === "" || commentInputElement.value === "";
    };
    nameInputElement.addEventListener("input", checkButtonState);
    commentInputElement.addEventListener("input", checkButtonState);
};

export default noButton;
