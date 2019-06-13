// import {
//     users
// } from '../models/main.js'

let users = [];

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    dataCards()
    renderTable()
}

import {
    newUserByAdmin
} from '../models/main.js'

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

// !This function form the body of the table based on the users array
function renderTable() {

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    let usersBodyTable = document.querySelector('#usersTableBody')
    usersBodyTable.innerHTML = ''
    let type = ""

    let r = 0

    users.forEach(user => {
        if (user._accountType == '1') {
            type = 'admin'
        } else {
            type = 'utilizador'
        }
        r++
        usersBodyTable.innerHTML += `<tr>
                                        <th scope="row">${r}</th>
                                        <td> ${user._username}</td>
                                        <td>${user._xp}</td>
                                        <td><button type="button" id="${user._id}" data-toggle="modal" data-target="#newBlockUserModal" class="btn blockButton pt-2"><img src="/Images/lock.png" alt="Bloquear"></button></td>
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
    let loginBlock = false
    let commentBlock = false

    let BlockBtn = document.querySelector('.block')

    for (const user of users) {
        if (user._id == id) {
            document.getElementById('txtBlockUserName').value = user._username
            loginBlock = user._loginBlock
            commentBlock = user._commentBlock
        }
    }

    if (loginBlock == true && commentBlock == true) {

        BlockBtn.value = 'Desbloquear'
        BlockBtn.addEventListener('click', function () {

            for (const user of users) {
                // console.log(id);
                // console.log(user._id);

                if (user._id == id) {
                    user._commentBlock = false
                    user._loginBlock = false
                    localStorage.setItem('users', JSON.stringify(users))
                    renderTable()
                }
            }
            $('#newBlockUserModal').modal('hide')
        })
    } else {
        document.querySelector('#blockUserForm').addEventListener('click', function () {
            for (const user of users) {
                if (user._id == id) {
                    user._loginBlock = true
                    user._commentBlock = true
                    localStorage.setItem('users', JSON.stringify(users))
                    renderTable()
                }
            }
            // event.preventDefault()
            //$('#newBlockUserModal').modal('hide')
        })
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

let change = 1

function changeUsersType(id) {
    for (const user of users) {
        console.log(user._accountType);
        
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
    document.querySelector('#usersTotal').innerHTML = '<img src="/Images/user.png" class="userImage" alt="Utilizador" style="width: 3rem;"> ' + users.length
    document.querySelector('#usersTotal').style.fontSize = '2rem'
}
