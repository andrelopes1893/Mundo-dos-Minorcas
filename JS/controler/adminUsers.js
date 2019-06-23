import User from "../models/userModels.js";
import {
    signOut
} from '../controler/loginAndSignup.js'
import {
    newUserByAdmin
} from '../models/main.js'

let users = []

let userOutput=[]

/**
 * Function that will prevent hacking
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

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    dataCards()
    renderTable()
}

//Sign out
document.querySelector('#leaveAccount').addEventListener('click', signOut)

/**
 * Form that will create users
 * @param {String} txtUsername return the value of the username that was written
 * @param {String} txtEmail return the value of the email that was written
 * @param {String} txtPassword return the value of the password that was written
 * @param {String} txtPasswordConf return the value of the password confirm that was written
 * @param {String} userType return the value of the type of user that was chosen
 */
document.querySelector('#adminForm').addEventListener('submit', function (event) {
    const txtUsername = document.querySelector('#txtUsername').value
    const txtEmail = document.querySelector('#txtEmail').value
    const txtPassword = document.querySelector('#txtPassword').value
    const txtPasswordConf = document.querySelector('#txtPasswordConf').value
    const userType = document.querySelector('#stlUsers').value

    newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType);

    $('#newUserModal').modal('hide');
    renderTable()

    event.preventDefault()
})

//Filter button
document.querySelector('.filterUsers').addEventListener('click', function () {
    renderTable()
})

//Sort by xp
function xpFilter() {
    userOutput.sort(User.mostXpFilter)
}

//Sort by ascendent alphabetic order
function ascendentAlphabeticOder() {
    userOutput.sort(User.alphabeticOrder)
}

/**
 * Function that will render users table
 */
function renderTable() {

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    //this variable will save the data from the users array
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
                                        <td>${type}<p id="blockedState"></p></td>
                                        <td><button type="button" id="${user._id}" class="btn change"><img src="/Images/changeUser.png" class="changeUser" alt="Mudar"></td>
                                    </tr>`
    });
    removeButtons()
    block()
    changeUsersTypeBtns()
    dataCards()
}

/**
 * Function that will set all the remove buttons
 */
function removeButtons() {
    let removeBtns = document.getElementsByClassName("remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeUser(this.id)
        })
    }
}

/**
 * Function to remove users
 * @param {String} username parameter that will save the username that was written
 */
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

/**
 * Function that will set all the block buttons
 */
function block() {
    let editButtons = document.getElementsByClassName('blockButton')
    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            blockUser(this.id)
        })
    }
}

/**
 * 
 * @param {String} id parameter that will save the specific user that we want to block
 */
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
    }
}

/**
 * Function to set the changing type of users
 * Type 1 - Admin
 * Type 2 - Normal User
 */
function changeUsersTypeBtns() {
    let changeBtns = document.getElementsByClassName("btn change")
    for (const elem of changeBtns) {
        elem.addEventListener("click", function () {
            changeUsersType(this.id)
        })
    }
}

/**
 * Function to change the users type
 * @param {Number} id parameter that returns the user id that we want to change type
 */
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

/**
 * Function tht will set the correct information about users in the cards (card-deck)
 */
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

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})