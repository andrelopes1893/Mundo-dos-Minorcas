import User from '../models/userModels.js'
import Country from '../models/countriesModels.js'
import Question from '../models/quizzesModels.js'

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
        Swal.fire({
            type: 'error',
            title: 'Ja existe um nome de utilizador com este nome :(',
            padding: '1rem',
            background: '#CCCC33',
            confirmButtonColor: '#29ABE2'
        })
    }

    if (User.getIdByEmail(txtEmail) != -1) {
        exist = true
        Swal.fire({
            type: 'error',
            title: 'Este e-mail já foi utilizado :(',
            padding: '1rem',
            background: '#CCCC33',
            confirmButtonColor: '#29ABE2'
        })
    }

    if (txtPassword !== txtPasswordConf) {
        exist = true
        Swal.fire({
            type: 'error',
            title: 'As palavras-passe não são iguais :(',
            padding: '1rem',
            background: '#CCCC33',
            confirmButtonColor: '#29ABE2'
        })
    }

    if (!exist) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#29ABE2'
        });
        toast.fire({
            type: 'success',
            title: '<span style="color:#FFFFFF">Registado com sucesso!<span>'
        })
        users.push(new User(txtUsername, txtPassword, txtEmail, userType))
        localStorage.setItem('users', JSON.stringify(users))
    }
}