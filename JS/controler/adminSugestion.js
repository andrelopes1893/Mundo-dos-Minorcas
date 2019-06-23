import { signOut } from "../controler/loginAndSignup.js";

let users = []
let suggestions = []

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

window.onload = function () {

    confirmSystemHaker()
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    let id = ""
    if (sessionStorage.getItem('loggedUserId')) {
        id = JSON.parse(sessionStorage.getItem("loggedUserId"))
    }

    if (localStorage.getItem("suggestions")) {
        suggestions = JSON.parse(localStorage.getItem("suggestions"))
    }
    renderTable()
    notifications(countSuggestions)
}

//Sign out
document.querySelector('#leaveAccount').addEventListener('click', signOut)

let countSuggestions = 0

/**
 * Function that represents the suggestion notifications that the admin will be notified
 * @param {Number} countSuggestions variable that represent the number of notifications that were done
 */
function notifications(countSuggestions) {
    renderTable(countSuggestions)
    
    for (const suggestion of suggestions) {
        if (suggestion._confirmed == false) {
            if (suggestions.length == 1) {
                Swal.fire({
                    title: `<span style="color:#ffffff">Tens ${countSuggestions} sugestão por ler!<span>`,
                    animation: true,
                    customClass: {
                        popup: 'animated tada'
                    },
                    background: '#CCCC33',
                    confirmButtonColor: '#29ABE2',
                    timer: 2000,
                })
            } else {
                Swal.fire({
                    title: `<span style="color:#ffffff">Tens ${countSuggestions} sugestões por ler!<span>`,
                    animation: true,
                    customClass: {
                        popup: 'animated tada'
                    },
                    background: '#CCCC33',
                    confirmButtonColor: '#29ABE2',
                    timer: 2000,
                })
            }
        }
    }
}

/**
 * Function that renders the suggestion table
 * @param {Number} countSuggestions variable that represent the number of notifications that were done
 */
function renderTable(countSuggestions) {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (localStorage.getItem("suggestions")) {
        suggestions = JSON.parse(localStorage.getItem("suggestions"))
    }

    document.querySelector('#suggestionsTableBody').innerHTML = ''
    let r = 0
    for (const suggestion of suggestions) {        
        r++
        //If the suggestion was not confirmed yet
        if (suggestion._confirmed == false) {
            countSuggestions++
            document.querySelector('#suggestionsTableBody').innerHTML += `<tr>
                                            <th scope="row">${r}</th>
                                            <td>${suggestion._id}</td>
                                            <td><button type="button" id="${suggestion._id}" data-toggle="modal" data-target="#suggestionModal" class="btn open mt-1" style="font-size: 1.5rem; border: 1px solid #ffffff">Abrir</button></td>
                                            <td><button type="button" id="${suggestion._id}" class="btn remove pt-2"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                            <td><button type="button" id="${suggestion._id}" class="btn acceptSuggestion"><img src="/Images/lock.png" alt="Bloquear"></button></td>
                                        </tr>`
        }
    }
    countSuggestions = 0
    rejectButtons()
    approveButtons()
    openModals()
    notifications(countSuggestions)
}

/**
 * Function that will set all the open modals buttons
 */
function openModals() {
    let openBtns = document.getElementsByClassName('open')
    for (const elem of openBtns) {
        elem.addEventListener('click', function () {
            renderSuggestionModal(this.id)
        })
    }
}

/**
 * Function to show in the modal of the specific suggestion data
 * @param {Number} id return the id of the suggestion that we wanna check
 */
function renderSuggestionModal(id) {
    for (const suggestion of suggestions) {
        if (suggestion._id == id) {
            document.querySelector('#txtContinent').innerHTML = 'Continente: ' + suggestion._continent
            document.querySelector('#txtCountry').innerHTML = 'País: ' + suggestion._country
            document.querySelector('#txtCapital').innerHTML = 'Capital: ' + suggestion._capital
            document.querySelector('#txtLanguage').innerHTML = 'Língua: ' + suggestion._language
        }
    }
}

/**
 * Function that will set all the reject buttons
 */
function rejectButtons() {
    let removeBtns = document.getElementsByClassName("remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            rejectSuggestion(this.id)
            renderTable()
        })
    }
}

/**
 * Function to reject suggestions
 * @param {Number} id return the id of the suggestion that we wanna reject
 */
function rejectSuggestion(id) {
    for (let i = 0; i < suggestions.length; i++) {        
        if (suggestions[i]._id == id) {
            suggestions.splice(i, 1)
            const toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#29ABE2'
            });
            toast.fire({
                type: 'success',
                title: '<span style="color:#FFFFFF">Sugestão rejeitada!<span>'
            })
        }
    }
    localStorage.setItem('suggestions', JSON.stringify(suggestions))
    renderTable()
}

/**
 * Function that will set all the approve buttons
 */
function approveButtons() {
    let approveBtns = document.getElementsByClassName("acceptSuggestion")
    for (const elem of approveBtns) {
        elem.addEventListener("click", function () {
            approveSuggestion(this.id)
        })
    }
}

/**
 * Function to approve suggestions
 * @param {Number} id return the id of the suggestion that we wanna approve
 */
function approveSuggestion(id) {
    for (const suggestion of suggestions) {
        if (suggestion._id == id) {
            suggestion._confirmed = true
            const toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#29ABE2'
            });
            toast.fire({
                type: 'success',
                title: '<span style="color:#FFFFFF">Sugestão aceite!<span>'
            })
        }
    }
    localStorage.setItem('suggestions', JSON.stringify(suggestions))
    renderTable()
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})