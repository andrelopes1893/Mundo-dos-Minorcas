import User from '../models/userModels.js'

let users = []

window.onload = function () {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    renderTable()
}

function renderTable() {
    let r = 0
    users.sort(User.mostXpFilter)
    for (const user of users) {
        r++
        
        document.querySelector('#statsFilterTableBody').innerHTML += `<tr>
                                                                        <th scope="row">${r}</th>
                                                                        <td>${user._username}</td>
                                                                        <td>${user._xp}</td>
                                                                    </tr>`
    }
}