import {
    newUserByAdmin
} from '../models/main.js'

let addUserBtn = document.querySelector('#addUserBtn')
addUserBtn.addEventListener("click", function () {
    let txtUsername = document.querySelector('#txtUserName').value
    let txtEmail = document.querySelector('#txtUserEmail').value
    let txtPassword = document.querySelector('#txtUserPassword').value
    let txtPasswordConf = document.querySelector('#txtUserPasswordConf').value
    let userType = "2"
    newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType)
})