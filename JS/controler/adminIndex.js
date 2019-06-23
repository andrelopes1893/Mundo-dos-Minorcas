import {
    signOut
} from '../controler/loginAndSignup.js'

/**
 * Function that prevents hacking
 */
function confirmSystemHaker() {
    if (sessionStorage.getItem("loggedUserId") == null) {
        location.href = '/HTML/loginAndSigup.html'
    } else {
        let users = JSON.parse(localStorage.getItem("users"))
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        for (const user of users) {

         if(user._id==id){
             if(user._accountType==2){
                localStorage.removeItem('loggedUserId');
                location.href = '/HTML/loginAndSigup.html'
             }
         }
        }
    }
}

let suggestions = []

//Sign out
document.querySelector('#leaveAccount').addEventListener('click', signOut)

//Set the location to the specific cards when clicked
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
//Set ended

//Animation between page transitions
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem("suggestions")) {
        suggestions = JSON.parse(localStorage.getItem("suggestions"))
    }

    //Notification system. If the admin has a suggestion to read, he will be notified
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

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})