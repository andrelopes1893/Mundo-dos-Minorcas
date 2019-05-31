let users = []

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    if (sessionStorage.getItem('loggedUserId')) {
        id = JSON.parse(sessionStorage.getItem("loggedUserId"))
    }

    renderTable()
}

function renderTable() {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    document.querySelector('#suggestionsTableBody').innerHTML = ''

    document.querySelector('#suggestionsTableBody').innerHTML = ''

    let r = 0

    for (const user of users) {
        r++
        document.querySelector('#suggestionsTableBody').innerHTML += `<tr>
                                        <th scope="row">${r}</th>
                                        <td>${user._username}</td>
                                        <td><button type="button" data-toggle="modal" data-target="#suggestionModal" class="btn openSuggestion" style="font-size: 1.5rem; border: 1px solid #ffffff">Abrir</button></td>
                                        <td><button type="button" id="${user._id}" data-toggle="modal" data-target="#removeSuggestion" class="btn removeSuggestion pt-2"><img src="/Images/lock.png" alt="Bloquear"></button></td>
                                        <td><button type="button" id="${user._suggestions}" data-toggle="modal" data-target="#acceptSuggestion" class="btn acceptSuggestion"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                    </tr>`
    }
    renderSuggestionModal()
}

function renderSuggestionModal() {
    for (const user of users) {
        document.querySelector('#suggestionModal').innerHTML += `<div class="modal-dialog modal-lg modal-dialog-centered">
                                                                <div class="modal-content">
                                                                    <!-- Cabeçalho da Modal -->
                                                                    <div class="modal-header">
                                                                        <img src="/Images/Logo2.png" class="modalLogo" alt="Logo">
                                                                        <button type="button" class="btn btn-danger" data-dismiss="modal"
                                                                            style="color:#ffff">Voltar</button>
                                                                    </div>
                                                                    <!-- Corpo da Modal -->
                                                                    <div class="modal-body text-center suggestion">
                                                                        <p class="lead">Continente: ${user._suggestions[0]}</p>
                                                                        <p class="lead">País: ${user._suggestions[1]}</p>
                                                                        <p class="lead">Capital: ${user._suggestions[2]}</p>
                                                                        <p class="lead">Línguas Oficiais: ${user._suggestions[3]}</p>
                                                                    </div>
                                                                </div>
                                                            </div>`
    }
}