
// import {
//     users
// } from '../models/main.js'

let users=[];

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    renderTable()
}  

import {
    newUserByAdmin
} from '../models/main.js'


//Este event ainda nao esta a funcionar devido ao erro: Cannot read property 'addEventListener' of null at loginAndSignup.js:9
document.querySelector('#adminForm').addEventListener('submit', function (event) {
    const txtUsername = document.querySelector('#txtUsername').value
    const txtEmail = document.querySelector('#txtEmail').value
    const txtPassword = document.querySelector('#txtPassword').value
    const txtPasswordConf = document.querySelector('#txtPasswordConf').value
    const userType = document.querySelector('#stlUsers').value
 
    //!Function called here
    newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType);
    




    // let exist = false
    // if (User.getUsernameById(txtUsername) != -1 && localStorage.getItem(User.getUsernameById(user.username)) == true) {
    //     exist = true
    //     alert('Já existe um utilizador com esse nome de utilizador')
    // }

    // //metodo static e se existir um email ja com o valor do input no localStorage
    // if (User.getEmailById(txtEmail) != -1 && localStorage.getItem(User.getUsernameById(user.email)) == true) {
    //     exist = true
    //     alert('Já existe um utilizador com esse nome de email')
    // }

    // if (exist) {
    //     alert('Erro')
    // } else {
    //     users.push(new User(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType))
    //     localStorage.setItem('users', JSON.stringify(users))
    // }

    $('#newUserModal').modal('hide');

    event.preventDefault()
    renderTable()
})

// !This function form the body of the table based on the users array
function renderTable() {
  
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    let usersBodyTable = document.querySelector('#usersTableBody')
    usersBodyTable.innerHTML = ''
    let type = "";

    let r = 0
    // for (const user of users) {
    //     if (user._accountType === '1') {
    //         type = 'admin'
    //     } else {
    //         type = 'utilizador'
    //     }
    //     r++
    //     usersBodyTable.innerHTML+=`<tr>
    //                                     <th scope="row">${r}</th>
    //                                     <td> ${user._username}</td>
    //                                     <td>${user._xp}</td>
    //                                     <td><button type="button" id="${user._id}" data-toggle="modal" data-target="#newBlockUserModal" class="btn blockButton pt-2"><img src="/Images/lock.png" alt="Bloquear"></button></td>
    //                                     <td><button type="button" id="${user._username}" data-toggle="modal" data-target="#removeUser"class="btn remove"><img src="/Images/x.png" alt="Eliminar"></button></td>
    //                                     <td>${type}</td>
    //                                 </tr>`
    // }

    users.forEach(user => {
        if (user._accountType === '1') {
            type = 'admin'
        } else {
            type = 'utilizador'
        }
        r++
        usersBodyTable.innerHTML+=`<tr>
                                        <th scope="row">${r}</th>
                                        <td> ${user._username}</td>
                                        <td>${user._xp}</td>
                                        <td><button type="button" id="${user._id}" data-toggle="modal" data-target="#newBlockUserModal" class="btn blockButton pt-2"><img src="/Images/lock.png" alt="Bloquear"></button></td>
                                        <td><button type="button" id="${user._username}" data-toggle="modal" data-target="#removeUser"class="btn remove"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                        <td>${type}</td>
                                    </tr>`
    });
    
}

function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            // O this.id é o valor do atributo id de cada elemento button
            removeUser(this.id)
            renderTable()
        })
    }
}

function removeUser(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            users.splice(i, 1)
        }
    }
    localStorage.setItem('countries', JSON.stringify(users))
    $('#newUserModal').modal('hide')
}

function blockBtnNewEvent() {

    let editButtons = document.getElementsByClassName('blockButton')

    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            blockUser(this.id)
        })
    }
}


function blockUser(id){
  let loginBlock=false
  let comentBlock=false

  let BlockBtn=document.getElementById('Block')

    for (const user of users) {

        if(user.id=id){
            document.getElementById('txtBlockUserName').value=user.username
            loginBlock=user.loginBlock
            comentBlock=user.comentBlock
        }
    }
    if(loginBlock==true && comentBlock==true){

        BlockBtn.innerHTML="Desbloquear"
        BlockBtn.addEventListener('click', function () {

            for (const user of users) {
                if (user.id == id) {
                    user.comentBlock=false;
                    user.loginBlock = false;
                    localStorage.setItem('countries', JSON.stringify(users))
                    renderTable()
                }            
            }
            $('#newBlockUserModal').modal('hide')
        })
    }
    else{


        BlockBtn.addEventListener('click', function (event) {
            
            for (const user of users) {
                if (user.id == id) {
                    user.loginBlock = true
                    localStorage.setItem('countries', JSON.stringify(countries))
                    renderTable()
                }            
            }
            $('#newBlockUserModal').modal('hide')
        })






    }

    
   
    


}