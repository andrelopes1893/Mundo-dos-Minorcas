import {
    newUserByAdmin
} from '../models/main.js'



let countries = []
let quizzes = []
let users = []

if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"))
} else {
    //obs: arrays: unlockCountries, rating, currentLevels, playedQuizzes, NÃO APAGAR
    users.push(new User('Nuno', 'asdasd', 'nuno@gmail.com', '1', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 1, false, 0, [], 'Portugal', [], [], []),
                new User('Andre', 'sdfsdf', 'andre@gmail.com', '1', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 2, false, 0, [], 'Portugal', [], [], []),
                new User('Tiago', 'dfgdfg', 'tiago@gmail.com', '1', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 3, false, 0, [], 'Portugal', [], [], []),
                new User('Margarida', 'lulu13', 'puresaltitao@gmail.com', '2', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 4, false, 0, [], 'Portugal', [], [], []),
                new User('Ines', 'inessousa', 'inespanda00@gmail.com', '2', '../../Images/BoyAvatars/Avatar Principiante 1.png', 'Escreve algo sobre ti', 5, false, 0, [], 'Portugal', [], [], []),
    )
    localStorage.setItem('users', JSON.stringify(users))
}

if (localStorage.getItem("countries")) {
    countries = JSON.parse(localStorage.getItem("countries"))
} else {
    //obs: arrays: unlockCountries, rating, currentLevels, playedQuizzes, NÃO APAGAR
    countries.push(new Country('Nuno', 'asdasd', 'nuno@gmail.com', '1', 'Escreve algo sobre ti', 1)
    )
    localStorage.setItem('countries', JSON.stringify(countries))
}

import User from '../models/userModels.js'
import Country from '../models/countriesModels.js'


let loggedUserId

/**
 * Event that add a new user
 * @param {String} txtUsername return the username that was written
 * @param {String} txtEmail return the email that was written
 * @param {String} txtPassword return the password that was written
 * @param {String} txtPasswordConf return the password confirm that was written
 * @param {String} userType return the type of user that was chosen
 */
if (document.querySelector('#addUserBtn') != null) {
    document.querySelector('#addUserBtn').addEventListener("click", function () {
        let txtUsername = document.querySelector('#txtUserName').value
        let txtEmail = document.querySelector('#txtUserEmail').value
        let txtPassword = document.querySelector('#txtUserPassword').value
        let txtPasswordConf = document.querySelector('#txtUserPasswordConf').value
        let userType = "2"
        newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType)
    })
}

/**
 * Login Form
 * @param {String} txtUsername return the username that was written
 * @param {String} txtEmail return the email that was written
 */
if (document.querySelector('#signInForm') != null) {
    document.querySelector('#signInForm').addEventListener('submit', function (event) {
        let txtEmail = document.querySelector('#txtEmail').value
        let txtPassword = document.querySelector('#txtPassword').value

        let userId = User.getIdByEmail(txtEmail)

        if (User.getIdByEmail(txtEmail) == -1) {
            Swal.fire({
                type: 'error',
                title: 'A conta não existe :(',
                padding: '1rem',
                background: '#CCCC33',
                confirmButtonColor: '#29ABE2'
            })
        }

        if (User.getIdByBlockUser(userId)) {
            Swal.fire({
                type: 'error',
                title: 'A tua encontra-se bloqueada :(',
                padding: '1rem',
                background: '#CCCC33',
                confirmButtonColor: '#29ABE2'
            })
        } else {
            if (User.confirmUserExistent(txtEmail, txtPassword) == true) {
                loggedUserId = User.getIdByEmail(txtEmail)
                sessionStorage.setItem('loggedUserId', JSON.stringify(loggedUserId))
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Dados incorretos :(',
                    padding: '1rem',
                    background: '#CCCC33',
                    confirmButtonColor: '#29ABE2'
                })
            }
        }

        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"))
        }

        for (const user of users) {
            if (User.getIdByEmail(txtEmail) == user._id && user._accountType == '2' && User.getIdByBlockUser(userId) == false) {
                location.href = "/index.html"
            } else if (User.getIdByEmail(txtEmail) == user._id && User.loginVerifyById(txtPassword, txtEmail) == user._id && user._accountType == '1' && User.getIdByBlockUser(userId) == false) {
                location.href = "/adminIndex.html"
            }
        }
        event.preventDefault()
    })
}

/**
 * Sign out function
 */
export function signOut() {
    location.reload()
    location.href = '/HTML/loginAndSigup.html'
    sessionStorage.removeItem('loggedUserId')
}