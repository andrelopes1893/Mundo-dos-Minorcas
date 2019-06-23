import User from '../models/userModels.js'

let users = []


function confirmSystemHaker(){
    if (sessionStorage.getItem("loggedUserId")==null) {
        location.href = '/HTML/loginAndSigup.html'
    }
}

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    renderTable()
    userData()
}

function renderTable() {
    let r = 0

    //Array created to save the data from the "users" array
    let normalUsers = [] 
    for (const user of users) {
        if(user._accountType==2){
            normalUsers.push(user)
        }
    }
    normalUsers.sort(User.mostXpFilter)
    for (const user of normalUsers) {
        r++
        document.querySelector('#statsFilterTableBody').innerHTML += `<tr>
                                                                        <th scope="row">${r}</th>
                                                                        <td>${user._username}</td>
                                                                        <td>${user._xp}</td>
                                                                    </tr>`
    }
}

/**
 * Function to show the correct data of each user - show the correct avatar in the navbar
 */
function userData() {
    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }
    for (const user of users) {
        if (user._id == id) {
            document.querySelector('.avatar').src = user._avatar
        }
    }
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})