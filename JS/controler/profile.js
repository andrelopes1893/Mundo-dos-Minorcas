import User from '../models/userModels.js'

let users = []

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    doNotShowPasswordData()
    showUserData()
}

cleanInputData()

document.querySelector('#profileForm').addEventListener('submit', function (event) {
    let txtUsername = document.querySelector('#txtUsername').value
    let txtPassword = document.querySelector('#txtPassword').value
    let txtCountry = document.querySelector('#txtCountry').value
    let txtBirthdayDate = document.querySelector('#txtBirthdayDate').value    

    let id = ""
    if (sessionStorage.getItem('loggedUserId')) {
        id = JSON.parse(sessionStorage.getItem("loggedUserId"))
    }

    for (const user of users) {        
        if (user._id != id) {                        
            user._username = txtUsername
            user._password = txtPassword
            user._country = txtCountry
            user._birthday = txtBirthdayDate
        }
        localStorage.setItem('users', JSON.stringify(users))
    }

    event.preventDefault()
})

function cleanInputData() {
    document.querySelector('#txtUsername').addEventListener('click', function () {
        document.querySelector('#txtUsername').value = ""
    })

    document.querySelector('#txtPassword').addEventListener('click', function () {
        document.querySelector('#txtPassword').value = ""
    })

    document.querySelector('#txtCountry').addEventListener('click', function () {
        document.querySelector('#txtCountry').value = ""
    })

    document.querySelector('#txtBirthdayDate').addEventListener('click', function () {
        document.querySelector('#txtBirthdayDate').value = ""
    })
}

function showUserData() {
    for (const user of users) {
        document.querySelector('#txtUsername').value = user._username
        document.querySelector('#txtPassword').value = user._password
        document.querySelector('#txtCountry').value = ""
        document.querySelector('#txtBirthdayDate').value = ""
    }
}

function doNotShowPasswordData() {
    let text = document.getElementById("txtPassword");
    if (text.type === "password") {
        text.type = "text";
    } else {
        text.type = "password";
    }
}