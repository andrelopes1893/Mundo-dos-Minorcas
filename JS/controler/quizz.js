import { signOut } from "../controler/loginAndSignup.js";

let users = []

function confirmSystemHaker(){
    if (sessionStorage.getItem("loggedUserId")==null) {
        location.href = '/HTML/loginAndSigup.html'
    }
}

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    
    userData()
}

let continentStyle = ""

document.querySelector('#africanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'Africa'
    addValue(continentStyle)
})

document.querySelector('#americanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'America'
    addValue(continentStyle)
})

document.querySelector('#asianBtnQuiz').addEventListener('click', function() {
    continentStyle = 'Asia'
    addValue(continentStyle)
})

document.querySelector('#europeanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'Europa'
    addValue(continentStyle)
})

document.querySelector('#oceaniaBtnQuiz').addEventListener('click', function() {
    continentStyle = 'Oceania' 
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

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})