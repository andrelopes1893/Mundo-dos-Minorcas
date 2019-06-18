import { signOut } from "../controler/loginAndSignup.js";

let users = []

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    userData()
}

let continentStyle = ""

document.querySelector('#africanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'africa'
    addValue(continentStyle)
})

document.querySelector('#americanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'america'
    addValue(continentStyle)
})

document.querySelector('#asianBtnQuiz').addEventListener('click', function() {
    continentStyle = 'asia'
    addValue(continentStyle)
})

document.querySelector('#europeanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'europa'
    addValue(continentStyle)
})

document.querySelector('#oceaniaBtnQuiz').addEventListener('click', function() {
    continentStyle = 'oceania' 
    addValue(continentStyle)  
})

function addValue(continentStyle) {
    sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    location.href = '../../HTML/continentQuizz.html'
}

function userData() {
    for (const user of users) {
        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
            id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        }

        if (user._id == id) {
            document.querySelector('.avatar').src = user._avatar
        }
    }
}

if (document.getElementById('signOut') != null) {
    document.getElementById('signOut').addEventListener('click', function () {
        signOut()
    })
}