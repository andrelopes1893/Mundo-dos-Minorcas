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

function renderTable() {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (localStorage.getItem("suggestions")) {
        suggestions = JSON.parse(localStorage.getItem("suggestions"))
    }

    document.querySelector('#suggestionsTableBody').innerHTML = ''

    let r = 0
    for (const user of users) {
        document.querySelector('#suggestionsTableBody').innerHTML = ''
        r++
        for (const suggestion of suggestions) {
            document.querySelector('#suggestionsTableBody').innerHTML += `<tr>
                                            <th scope="row">${r}</th>
                                            <td>${suggestion._continent.user} - ${user._username}</td>
                                            <td><button type="button" id="${suggestion._id}" data-toggle="modal" data-target="#suggestionModal" class="btn open mt-1" style="font-size: 1.5rem; border: 1px solid #ffffff">Abrir</button></td>
                                            <td><button type="button" id="${suggestion._continent}" data-toggle="modal" data-target="#removeSuggestion" class="btn remove pt-2"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                            <td><button type="button" id="" data-toggle="modal" data-target="#acceptSuggestion" class="btn acceptSuggestion"><img src="/Images/lock.png" alt="Bloquear"></button></td>
                                        </tr>`
        }
    }

    // removeButtons()
    openModals()
}

function openModals() {
    let openBtns = document.getElementsByClassName('open')
    for (const elem of openBtns) {
        elem.addEventListener('click', function () {
            renderSuggestionModal(this.id)
            console.log(this.id);
            
        })
    }
}

function renderSuggestionModal() {
    for (const suggestion of suggestions) {
        document.body.innerHTML += `<div class="modal fade" id="suggestionModal">
                                        <div class="modal-dialog modal-lg modal-dialog-centered">
                                            <div class="modal-content">
                                                <!-- Cabeçalho da Modal -->
                                                <div class="modal-header">
                                                    <img src="/Images/Logo2.png" class="modalLogo" alt="Logo">
                                                    <button type="button" class="btn btn-danger" data-dismiss="modal"
                                                        style="color:#ffff">Voltar</button>
                                                </div>
                                                <!-- Corpo da Modal -->
                                                <div class="modal-body text-center suggestion">
                                                    <p class="lead">Continente: ${suggestion._continent.continent}</p>
                                                    <p class="lead">País: ${suggestion._continent.country}</p>
                                                    <p class="lead">Capital: ${suggestion._continent.capital}</p>
                                                    <p class="lead">Línguas Oficiais: ${suggestion._continent.language}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    }
}

// function removeButtons() {
//     let removeBtns = document.getElementsByClassName("remove")
//     for (const elem of removeBtns) {
//         elem.addEventListener("click", function () {
//             removeSuggestion(this.id)
//         })
//     }
// }

// function removeSuggestion(suggestions) {
//     document.querySelector('.yesButton').addEventListener('click', function() {
//         for (const user of users) {
//             if (user._suggestions == suggestions) {            
//                 user._suggestions = []
//             }
//         }
//         localStorage.setItem('users', JSON.stringify(users))
//         renderTable()
//         $('#removeSuggestion').modal('hide')
//     })
// }