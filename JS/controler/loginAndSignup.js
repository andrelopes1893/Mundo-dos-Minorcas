import {
    newUserByAdmin
} from '../models/main.js'

import User from '../models/userModels.js'

let users = []

// window.onload = function() {
//     if (localStorage.getItem("users")) {
//         users = JSON.parse(localStorage.getItem("users"))
//     }
// }

let loggedUserId

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

export function signOut() {
    location.reload()
    location.href = '/HTML/loginAndSigup.html'
    sessionStorage.removeItem('loggedUserId')
}