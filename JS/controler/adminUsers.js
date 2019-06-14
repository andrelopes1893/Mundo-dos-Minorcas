import User from "../models/userModels.js";

import {
    newUserByAdmin
} from '../models/main.js'

let users = [];

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    dataCards()
    renderTable()
}

document.querySelector('#adminForm').addEventListener('submit', function (event) {
    const txtUsername = document.querySelector('#txtUsername').value
    const txtEmail = document.querySelector('#txtEmail').value
    const txtPassword = document.querySelector('#txtPassword').value
    const txtPasswordConf = document.querySelector('#txtPasswordConf').value
    const userType = document.querySelector('#stlUsers').value

    //!Function called here
    newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType);

    $('#newUserModal').modal('hide');
    renderTable()

    event.preventDefault()
})

document.querySelector('.filterUsers').addEventListener('submit', function (e) {
    renderTable()
    e.preventDefault()
})

function xpFilter() {
    users.sort(User.mostXpFilter)
}

function ascendentAlphabeticOder() {
    users.sort(User.alphabeticOrder)
}

// !This function form the body of the table based on the users array
function renderTable() {

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    if (document.querySelector('#stlOrder').value == "") {
        ascendentAlphabeticOder()
    }
    
    if (document.querySelector('#stlOrder').value == "Maior XP") {
        xpFilter()
    }

    let usersBodyTable = document.querySelector('#usersTableBody')
    usersBodyTable.innerHTML = ''
    let type = ""

    let r = 0

    users.forEach(user => {
        if (user._accountType == '1') {
            type = 'Administador'
        } else {
            type = 'Utilizador'
        }
        r++
        usersBodyTable.innerHTML += `<tr>
                                        <th scope="row">${r}</th>
                                        <td> ${user._username}</td>
                                        <td>${user._xp}</td>
                                        <td><button type="button" id="${user._id}" data-toggle="modal" data-target="#blockUserModal" class="btn blockButton pt-2"><img src="/Images/lock.png" alt="Bloquear"></button></td>
                                        <td><button type="button" id="${user._username}" data-toggle="modal" data-target="#removeUser" class="btn remove"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                        <td>${type}</td>
                                        <td><button type="button" id="${user._id}" class="btn change"><img src="/Images/changeUser.png" class="changeUser" alt="Mudar"></td>
                                    </tr>`
    });
    removeButtons()
    blockBtnNewEvent()
    changeUsersTypeBtns()
}

function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeUser(this.id)
        })
    }
}

function removeUser(username) {
    document.querySelector('.yesButton').addEventListener('click', function () {
        for (let i = 0; i < users.length; i++) {
            if (users[i]._username == username) {
                users.splice(i, 1)
            }
        }
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#29ABE2'
        });
        toast.fire({
            type: 'success',
            title: '<span style="color:#FFFFFF">Utilizador removido!<span>'
        })
        localStorage.setItem('users', JSON.stringify(users))
        renderTable()
        $('#removeUser').modal('hide')
    })
}

function blockBtnNewEvent() {
    let editButtons = document.getElementsByClassName('blockButton')
    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            blockUser(this.id)
        })
    }
}

function blockUser(id) {
    document.querySelector('.yesBlock').addEventListener('click', function () {
        for (const user of users) {
            if (user._id == id) {
                if (user._loginBlock == true) {
                    user._loginBlock = false
                    console.log(user._loginBlock);
                    localStorage.setItem('users', JSON.stringify(users))
                    const toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#29ABE2'
                    });
                    toast.fire({
                        type: 'success',
                        title: '<span style="color:#FFFFFF">Utilizador desbloqueado!<span>'
                    })
                    // location.reload()

                } else {
                    user._loginBlock = true
                    console.log(user._loginBlock);
                    localStorage.setItem('users', JSON.stringify(users))
                    const toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#29ABE2'
                    });
                    toast.fire({
                        type: 'success',
                        title: '<span style="color:#FFFFFF">Utilizador bloqueado!<span>'
                    })
                }
            }
            // $('#blockUserModal').modal('hide')
        }
    })
}

function changeUsersTypeBtns() {
    let changeBtns = document.getElementsByClassName("btn change")
    for (const elem of changeBtns) {
        elem.addEventListener("click", function () {
            changeUsersType(this.id)
        })
    }
}

let change = 1

function changeUsersType(id) {
    for (const user of users) {
        if (user._id == id) {
            if (change == 1) {
                user._accountType = '1'
                change = 0
                localStorage.setItem('users', JSON.stringify(users))
            } else {
                user._accountType = '2'
                change = 1
                localStorage.setItem('users', JSON.stringify(users))
            }
        }
    }
}

function dataCards() {
    let type = ""
    let adminCount = 0
    let blockCount = 0

    users.forEach(user => {
        if (user._accountType == '1') {
            type = 'Administador'
            adminCount++
        } else {
            type = 'Utilizador'
        }

        if (user._loginBlock == true) {
            blockCount++
        }
    })

    document.querySelector('#usersTotal').innerHTML = '<img src="/Images/user.png" class="userImage" alt="Utilizador" style="width: 20%;"> ' + users.length
    document.querySelector('#adminUsers').innerHTML = '<img src="/Images/user.png" class="userImage" alt="Utilizador" style="width: 20%;"> ' + adminCount
    document.querySelector('#blockedAccounts').innerHTML = '<img src="/Images/user.png" class="userImage" alt="Utilizador" style="width: 20%;"> ' + blockCount
}