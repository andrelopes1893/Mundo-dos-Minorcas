import User from '../models/userModels.js'

let users = []

if (localStorage.users) {
    users = JSON.parse(localStorage.users)
}

document.querySelector('#adminForm').addEventListener('submit', function () {
    const txtUsername = document.querySelector('#txtnUsername').value
    const txtEmail = document.querySelector('#txtEmail').value
    const txtPassword = document.querySelector('#txtPassword').value
    const txtPasswordConf = document.querySelector('#txtPasswordConf').value
})

function renderTable() {
    let usersBodyTable = document.querySelector('#usersTableBody')
    usersBodyTable.innerHTML = ''

    let r = 0
    for (const user of users) {
        r++
        usersBodyTable.innerHTML = `<tr>
                                        <th scope="row">${r}</th>
                                        <td>Mark</td>
                                        <td></td>
                                        <td><img src="/Images/lock.png" alt="Bloquear"></td>
                                        <td><img src="/Images/x.png" alt="Eliminar"></td>
                                        <td></td>
                                    </tr>`
    }
}

function removeUser() {

}

function blockUser() {

}

function removeAdmin() {

}

function blockAdmin() {

}