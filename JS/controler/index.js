import {
    signOut
} from '../controler/loginAndSignup.js'

let users = []
confirmSystemHaker()
/**
 * Function that prevents hacking
 */
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


/**
 * Function to load the user data - and place the correct avatar in the navbar
 */
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

//Sign out
document.getElementById('signOut').addEventListener('click', function () {
    signOut()
})

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})