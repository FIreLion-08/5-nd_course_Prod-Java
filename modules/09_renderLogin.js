import { login, setToken } from './05_api.js'
import { fetchAndRenderComments, setUser } from '../HW-09.js'
import { registrationLogin } from './10_renderRegistration.js'

export const renderLogin = () => {
    const appElement = document.getElementById('app')
    const loginHtml = `
            <div class="container" id="add-container">
                <ul class="comments" id="comments" ></ul>
                <div id="loading"></div>
                <div class="login-form" id="login-form">
                    <h2><center>Форма входа</center></h2>
                    <input type="text" class="add-form-login" placeholder="Логин" id="login-input"/>
                    <input type="password" class="add-form-password" placeholder="Пороль" rows="4" id="password-input"/>
                    <div class="login-form-row">
                      <button class="login-form-button" id="login-button">Войти</button>
                    </div>
                    <button class="login-button" id="registration-button">Регистрация</button>
                </div>
            </div>`
    appElement.innerHTML = loginHtml

    const loginInputElement = document.getElementById('login-input')
    const passwordInputElement = document.getElementById('password-input')
    const loginButtonElement = document.getElementById('login-button')

    loginButtonElement.addEventListener('click', () => {
        loginInputElement.style.backgroundColor = 'white'
        passwordInputElement.style.backgroundColor = 'white'

        if (
            loginInputElement.value.trim() === '' ||
            passwordInputElement.value.trim() === '' ||
            loginInputElement.value.trim() === ' ' ||
            passwordInputElement.value.trim() === ' '
        ) {
            loginInputElement.style.backgroundColor = 'pink'
            passwordInputElement.style.backgroundColor = 'pink'
            return
        }
        loginButtonElement.disabled = true
        loginButtonElement.textContent = 'Идет авторизация..'
        const handleLoginClick = () => {
            login({
                login: loginInputElement.value.trim(),
                password: passwordInputElement.value.trim(),
            })
                .then((responseData) => {
                    setToken(responseData.user.token)
                    setUser(responseData.user)
                })
                .then(() => {
                    //
                    fetchAndRenderComments(comments)
                })
                .then(() => {
                    loginButtonElement.disabled = false
                    loginButtonElement.textContent = 'Войти'
                    loginInputElement.value = ''
                    passwordInputElement.value = ''
                })
                .catch((error) => {
                    loginButtonElement.disabled = false
                    loginButtonElement.textContent = 'Войти'
                    if (error.message === 'Неверный запрос') {
                        alert('Логин или пороль не верны')
                        throw new Error('Неверный логин или пароль.')
                    }
                    //Падения интернета при авторизации
                    if (error.message === 'Failed to fetch') {
                        alert('Падения интернета при авторизации')
                    }
                })
        }
        handleLoginClick()
    })

    const registrationButtonElement = document.getElementById(
        'registration-button',
    )
    registrationButtonElement.addEventListener('click', () => {
        registrationLogin()
    })
}
