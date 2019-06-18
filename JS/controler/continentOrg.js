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

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    userData()
}

window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})

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