import User from '../models/userModels.js'

export let users = []

if (localStorage.users) {
    users = JSON.parse(localStorage.users)
}

document.querySelector('.newUser').addEventListener('submit', function (event) {
    let txtUsername = document.querySelector('#txtUserName').value
    let txtEmail = document.querySelector('#txtUserEmail').value
    let txtPassword = document.querySelector('#txtUserPassword').value
    let txtPasswordConf = document.querySelector('#txtUserPasswordConf').value

    /* Registo */
    let exist = false
    if (User.getUsernameById(txtUsername) != -1) {
        exist = true
        alert('O username já existe')
    }

    if (User.getEmailById(txtEmail) != -1) {
        exist = true
        alert('ja existe uma conta com esse e-mail')
    }

    if (txtPassword !== txtPasswordConf) {
        exist = true
        txtPassword.pattern
        alert('as passwords nao coincidem')
    }

    if (exist) {
        alert('Erro')
    } else {
        users.push(new User(txtUsername, txtEmail, txtPassword, txtPasswordConf))
        localStorage.setItem('users', JSON.stringify(users))
    }

    event.preventDefault()
})

document.querySelector('.SignInform').addEventListener('submit', function() {
    let txtEmail = document.querySelector('#txtEmail').value
    let txtPassword = document.querySelector('#txtPassword').value

    
})