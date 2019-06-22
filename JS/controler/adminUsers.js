import User from "../models/userModels.js";
import {
    signOut
} from '../controler/loginAndSignup.js'
import {
    newUserByAdmin
} from '../models/main.js'

let users = [];

let userOutput=[]
function confirmSystemHaker(){
    if (sessionStorage.getItem("loggedUserId")==false) {
        location.href = '/HTML/loginAndSigup.html'
    }
}
window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    dataCards()
    renderTable()
}

document.querySelector('#leaveAccount').addEventListener('click', signOut)

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

document.querySelector('.filterUsers').addEventListener('click', function () {
    renderTable()
})

function xpFilter() {
    userOutput.sort(User.mostXpFilter)
}

function ascendentAlphabeticOder() {
    userOutput.sort(User.alphabeticOrder)
}

// !This function form the body of the table based on the users array
function renderTable() {

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

     userOutput= users

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

    userOutput.forEach(user => {
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
                                        <td><button type="button" id="${user._id}" class="btn blockButton pt-2"><img src="/Images/lock.png" alt="Bloquear"></button></td>
                                        <td><button type="button" id="${user._username}" data-toggle="modal" data-target="#removeUser" class="btn remove"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                        <td>${type} - <p id="blockedState"></p></td>
                                        <td><button type="button" id="${user._id}" class="btn change"><img src="/Images/changeUser.png" class="changeUser" alt="Mudar"></td>
                                    </tr>`
    });
    removeButtons()
    block()
    changeUsersTypeBtns()
    dataCards()
}

function removeButtons() {
    let removeBtns = document.getElementsByClassName("remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeUser(this.id)
        })
    }
}

function removeUser(username) {
    if (document.querySelector('.yesButton') != null) {
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
                title: '<span style="color:#FFFFFF">Utilizador removido com sucesso!<span>'
            })
            localStorage.setItem('users', JSON.stringify(users))
            renderTable()
            $('#removeUser').modal('hide')
        }) 
    }
    
}

function block() {
    let editButtons = document.getElementsByClassName('blockButton')
    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            blockUser(this.id)
        })
    }
}

function blockUser(id) {
    for (const user of users) {
        if (user._id == id) {
            if (user._loginBlock == true) {
                user._loginBlock = false
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
}

function changeUsersTypeBtns() {
    let changeBtns = document.getElementsByClassName("btn change")
    for (const elem of changeBtns) {
        elem.addEventListener("click", function () {
            changeUsersType(this.id)
        })
    }
}

function changeUsersType(id) {
    for (const user of users) {
        if (user._id == id) {
            if (user._accountType == '1') {
                user._accountType = '2'
                const toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#29ABE2'
                });
                toast.fire({
                    type: 'success',
                    title: '<span style="color:#FFFFFF">Utilizador é agora normal!<span>'
                })
                localStorage.setItem('users', JSON.stringify(users))
                renderTable()
            } else {
                user._accountType = '1'
                const toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#29ABE2'
                });
                toast.fire({
                    type: 'success',
                    title: '<span style="color:#FFFFFF">Utilizador é agora administrador!<span>'
                })
                localStorage.setItem('users', JSON.stringify(users))
                renderTable()
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