import {
    signOut
} from '../controler/loginAndSignup.js'

let users = []

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    userData()
}

// !this sis a jquery code and it makes the owl carousel work
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

document.getElementById('signOut').addEventListener('click', function () {
    signOut()
})