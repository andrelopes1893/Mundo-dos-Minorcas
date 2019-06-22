import {
    signOut
} from '../controler/loginAndSignup.js'

// !this sis a jquery code and it makes the owl carousel work
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    mouseDrag: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 3
        }
    }
})

/**
 * Function that prevent hacking
 */
function confirmSystemHaker(){
    if (sessionStorage.getItem("loggedUserId")==null) {
        location.href = '/HTML/loginAndSigup.html'
    }
}

let users = []

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    userData()
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})

/**
 * Function that will keep user data - place correct avatar in the navbar
 */
function userData() {
    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }
    for (const user of users) {
        if (user._id == id) {
            document.querySelector('.avatar').src = user._avatar
        }
    }
}

//Sign out
if (document.getElementById('signOut') != null) {
    document.getElementById('signOut').addEventListener('click', function () {
        signOut()
    })
}