import {
    signOut
} from '../controler/loginAndSignup.js'

let users = []

/**
 * Function that prevents hacking
 */
function confirmSystemHaker(){
    if (sessionStorage.getItem("loggedUserId")==false) {
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

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

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