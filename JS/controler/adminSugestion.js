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
                                        <td><button type="button" data-toggle="modal" data-target="#suggestionModal" class="btn" style="font-size: 1.5rem; border: 1px solid #ffffff">Abrir</button></td>
                                        <td><button type="button" id="${user._id}" data-toggle="modal" data-target="#removeSuggestion" class="btn remove pt-2"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                        <td><button type="button" id="" data-toggle="modal" data-target="#acceptSuggestion" class="btn acceptSuggestion"><img src="/Images/lock.png" alt="Bloquear"></button></td>
                                    </tr>`
    }
    removeButtons()
    renderSuggestionModal()
}
function renderSuggestionModal() {
    for (const user of users) {
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
                                                    <p class="lead">Continente: ${user._suggestions[0]}</p>
                                                    <p class="lead">País: ${user._suggestions[1]}</p>
                                                    <p class="lead">Capital: ${user._suggestions[2]}</p>
                                                    <p class="lead">Línguas Oficiais: ${user._suggestions[3]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    }
}

function removeButtons() {    
    let removeBtns = document.getElementsByClassName("remove")    
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {             
            removeSuggestion(this._id)
        })
    }
}

function removeSuggestion(suggestions) {
    document.querySelector('.yesBtn').addEventListener('click', function () {     
        console.log('123');
            
        for (let i = 0; i < users.length; i++) {            
            if (users[i]._suggestions == suggestions) {
                users._suggestions = []
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        renderTable()
        $('#removeSuggestion').modal('hide')
    })
}