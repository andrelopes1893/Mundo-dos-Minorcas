import {
    signOut
} from '../controler/loginAndSignup.js'


function confirmSystemHaker(){
    if (sessionStorage.getItem("loggedUserId")==false) {
        location.href = '/HTML/loginAndSigup.html'
    }
}

let suggestions = []

document.querySelector('#leaveAccount').addEventListener('click', signOut)

document.querySelector('.usersStats').addEventListener('click', function () {
    location.href = '/HTML/adminUsers.html'
})

document.querySelector('.catalogStats').addEventListener('click', function () {
    location.href = '/HTML/adminCatalog.html'
})

document.querySelector('.quizzesStats').addEventListener('click', function () {
    location.href = '/HTML/adminQuizz.html'
})

document.querySelector('.suggestionsStats').addEventListener('click', function () {
    location.href = '/HTML/adminSugestion.html'
})

window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem("suggestions")) {
        suggestions = JSON.parse(localStorage.getItem("suggestions"))
    }

    for (const suggestion of suggestions) {
        if (suggestion._confirmed == false) {
            Swal.fire({
                title: '<span style="color:#ffffff">Tens sugestões por ler!<span>',
                animation: true,
                showCancelButton: true,
                customClass: {
                    popup: 'animated tada'
                },
                background: '#CCCC33',
                confirmButtonColor: '#29ABE2',
                confirmButtonText: 'Ver!',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Vejo mais tarde!',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        location.href = '/HTML/adminSugestion.html'
                    )
                }
            })
        }
    }
}