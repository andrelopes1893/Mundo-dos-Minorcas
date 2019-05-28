import User from '../models/userModels.js'

export let users = []

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
}

/** @string   */

// !This function add a new User from the Addmin Point Of view
/**
 * Validações de registo + adcionar à localStorage e ao array users
 * @param {string} txtUsername Nome de Utilizador
 * @param {string} txtEmail E-mail
 * @param {string} txtPassword Password
 * @param {string} txtPasswordConf Confirmar Password
 * @param {string} userType Tipo de utilizador
 */
export function newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType) {

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    let exist = false
    if (User.getIdByUsername(txtUsername) != -1) {
        exist = true
        alert('O username já existe')
    }

    if (User.getIdByEmail(txtEmail) != -1) {
        exist = true
        alert('ja existe uma conta com esse e-mail')
    }

    if (txtPassword !== txtPasswordConf) {
        exist = true
        alert('as passwords nao coincidem')
    }

    if (exist) {
        alert('Erro')
    } else {
        users.push(new User(txtUsername, txtPassword, txtEmail))
        localStorage.setItem('users', JSON.stringify(users))
    }
}