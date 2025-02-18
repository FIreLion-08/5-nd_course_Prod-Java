import { registration } from './05_api.js'
import { renderLogin } from './09_renderLogin.js'
// import { fetchAndRenderComments } from '../HW-08.js'

export const registrationLogin = () => {
    const appElement = document.getElementById('app')
    const registrationHtml = `
    <div class="container" id="add-container">
    <ul class="comments" id="comments" >
     <!--Список берется из JS-->
    </ul>
    <div id="loading"></div>
    <div class="login-form" id="login-form">
      <h2>Форма регистрации</h2>
      <input type="text" class="add-form-login" placeholder="Введите логин" id="login-input"/>
      <input type="text" class="add-form-password" placeholder="Введите имя" rows="4" id="name-input"/>
      <input type="text" class="add-form-password" placeholder="Введите пороль" rows="4" id="password-input"/>
      <div class="login-form-row">
      <button class="login-form-button" id="registration-button">Зарегистрироваться</button>
      </div>
      <button class="login-button" id="login-button">Войти</button>
    </div>
  </div>`
    appElement.innerHTML = registrationHtml

    const registrationButtonElement = document.getElementById(
        'registration-button',
    )
    const loginInputElement = document.getElementById('login-input')
    const namedInputElement = document.getElementById('name-input')
    const passwordInputElement = document.getElementById('password-input')

    console.log(registrationButtonElement)
    registrationButtonElement.addEventListener('click', () => {
        loginInputElement.style.backgroundColor = 'white'
        namedInputElement.style.backgroundColor = 'white'
        passwordInputElement.style.backgroundColor = 'white'

        if (
            loginInputElement.value.trim() === '' ||
            namedInputElement.value.trim() === '' ||
            passwordInputElement.value.trim() === ''
        ) {
            namedInputElement.style.backgroundColor = 'pink'
            passwordInputElement.style.backgroundColor = 'pink'
            return
        }
        registrationButtonElement.disabled = true
        registrationButtonElement.textContent = 'Идет регистрация..'
        registration({
            login: loginInputElement.value.trim(),
            name: namedInputElement.value.trim(),
            password: passwordInputElement.value.trim(),
        })
            // .then(() => {
            //     return fetchAndRenderComments(comments)
            // })
            .then(() => {
                return renderLogin()
            })
            .catch((error) => {
                registrationButtonElement.disabled = false
                registrationButtonElement.textContent = 'Войти'
                if (error.message === 'Неверный запрос') {
                    alert('Такой пользователь уже существует 1')
                }
                //Падения интернета при регистрации
                if (error.message === 'Failed to fetch') {
                    alert('Падения интернета при регистрации')
                }
            })
    })
    const loginButtonElement = document.getElementById('login-button')
    loginButtonElement.addEventListener('click', () => {
        renderLogin()
    })
}
