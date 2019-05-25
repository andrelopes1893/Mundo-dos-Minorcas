import User from '../models/userModels.js'

import {
    users
} from '../controler/loginAndSignup.js'


if (localStorage.users) {
    users = JSON.parse(localStorage.users)
}

//Este event ainda nao esta a funcionar devido ao erro: Cannot read property 'addEventListener' of null at loginAndSignup.js:9
document.querySelector('#adminForm').addEventListener('submit', function () {
    const txtUsername = document.querySelector('#txtUsername').value
    const txtEmail = document.querySelector('#txtEmail').value
    const txtPassword = document.querySelector('#txtPassword').value
    const txtPasswordConf = document.querySelector('#txtPasswordConf').value
    const userType = document.querySelector('#stlUsers').value

    for (const user of users) {
        let exist = false
        if (User.getUsernameById(txtUsername) != -1 && localStorage.getItem(User.getUsernameById(user.username)) == true) {
            exist = true
            alert('Já existe um utilizador com esse nome de utilizador')
        }

        //metodo static e se existir um email ja com o valor do input no localStorage
        if (User.getEmailById(txtEmail) != -1 && localStorage.getItem(User.getUsernameById(user.email)) == true) {
            exist = true
            alert('Já existe um utilizador com esse nome de email')
        }

        if (exist) {
            alert('Erro')
        } else {
            users.push(new User(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType))
            localStorage.setItem('users', JSON.stringify(users))
        }
    }

    event.preventDefault()
})

// function renderTable() {
//     let usersBodyTable = document.querySelector('#usersTableBody')
//     usersBodyTable.innerHTML = ''

//     let r = 0
//     for (const user of users) {
//         r++
//         usersBodyTable.innerHTML = `<tr>
//                                         <th scope="row">${r}</th>
//                                         <td></td>
//                                         <td></td>
//                                         <td><button type="button" data-toggle="modal" data-target="#newBlockUserModal"
//                                         class="btn blockButton pt-2"><img src="/Images/lock.png" alt="Bloquear"><img src="/Images/lock.png" alt="Bloquear"></button></td>
//                                         <td><button type="button" data-toggle="modal" data-target="#removeUser" 
//                                         class="btn remove"><img src="/Images/x.png" alt="Eliminar"></button></td>
//                                         <td></td>
//                                     </tr>`
//     }
// }

// function removeButtons() {
//     let removeBtns = document.getElementsByClassName("btn remove")
//     for (const elem of removeBtns) {
//         elem.addEventListener("click", function () {
//             // O this.id é o valor do atributo id de cada elemento button
//             removeUser(this.id)
//             renderTable()
//         })
//     }
// }

// function removeUser(username) {
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === username) {
//             users.splice(i, 1)
//         }
//     }
//     localStorage.setItem('countries', JSON.stringify(users))
//     $('#newUserModal').modal('hide')
// }