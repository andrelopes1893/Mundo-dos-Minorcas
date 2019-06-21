import { signOut } from "../controler/loginAndSignup.js";

let users = []
let suggestions = []

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    if (sessionStorage.getItem('loggedUserId')) {
        id = JSON.parse(sessionStorage.getItem("loggedUserId"))
    }

    if (localStorage.getItem("suggestions")) {
        suggestions = JSON.parse(localStorage.getItem("suggestions"))
    }
    renderTable()
}

document.querySelector('#leaveAccount').addEventListener('click', signOut)

let countSuggestions = 0

function renderTable() {
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
        if (suggestion._confirmedAdmin == false) {
            countSuggestions++
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
}

function openModals() {
    let openBtns = document.getElementsByClassName('open')
    for (const elem of openBtns) {
        elem.addEventListener('click', function () {
            renderSuggestionModal(this.id)
        })
    }
}

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

function rejectButtons() {
    let removeBtns = document.getElementsByClassName("remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            rejectSuggestion(this.id)
            renderTable()
        })
    }
}

function rejectSuggestion(id) {
    for (let i = 0; i < suggestions.length; i++) {        
        if (suggestions[i]._id == id) {
            suggestions[i]._confirmedAdmin = true
            suggestions[i].__confirmedUser = false
            // suggestions.splice(i, 1)
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

function approveButtons() {
    let approveBtns = document.getElementsByClassName("acceptSuggestion")
    for (const elem of approveBtns) {
        elem.addEventListener("click", function () {
            approveSuggestion(this.id)
        })
    }
}

function approveSuggestion(id) {
    for (const suggestion of suggestions) {
        if (suggestion._id == id) {
            suggestion._confirmedAdmin = true
            suggestion._confirmedUser = true
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