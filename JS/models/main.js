import User from '../models/userModels.js'

export let users = []

// window.onload = function () {
//     if (localStorage.getItem("users")) {
//         users = JSON.parse(localStorage.getItem("users"))
//     }
// }





// !This function add a new User from the Addmin Point Of view
export function newUserByAdmin(txtUsername, txtEmail, txtPassword, txtPasswordConf, userType) {

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    
    users.push(new User(txtUsername, txtPassword, txtEmail, userType))
    localStorage.setItem("users", JSON.stringify(users))

   /*  if (User.confUserExistent(txtUsername) === true) {
        alert("Username já existente escolhe outro username")
    } else {
        if (User.confEmailExistent(txtEmail) === true) {
            alert("O email já conteim um conta na aplicação")
        } else {
            if (txtPassword !== txtPasswordConf) {
                alert("confirme Corretamente o password")
            } else {

                users.push(new User(txtUsername, txtPassword, txtEmail, userType))
                localStorage.setItem("users", JSON.stringify(users))
                alert("Conta criada com sucesso")
            }
        }
    } */
}