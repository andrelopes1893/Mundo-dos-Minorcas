import {
    newUserByAdmin
} from '../models/main.js'

import User from '../models/userModels.js'

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

if(document.querySelector('#signInForm') != null){
    document.querySelector('#signInForm').addEventListener('submit', function (event) {
        let txtEmail = document.querySelector('#txtEmail').value
        let txtPassword = document.querySelector('#txtPassword').value
    
        let userId = User.getIdByEmail(txtEmail)
    
        if (User.getIdByEmail(txtEmail) == -1) {
            alert('A conta não existe')
        }
    
        if (User.getIdByBlockUser(userId)) {
            alert('A tua conta encontra-se bloqueada')
        } else {
            if (User.confirmUserExistent(txtEmail, txtPassword) == true) {  
                loggedUserId = User.getIdByEmail(txtEmail)              
                sessionStorage.setItem('loggedUserId', JSON.stringify(loggedUserId))
                location.href = "/index.html"
            } else {
                alert('Dados Inválidos!')
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