import User from '../models/userModels.js'
import Question from '../models/quizzesModels.js'

let users = []

window.onload = function () {
        if (localStorage.getItem("users")) {
                users = JSON.parse(localStorage.getItem("users"))
        }
        doNotShowPasswordData()
        showUserData()
        showAvatarOnload()
        showCurrentXP()
}

cleanInputData()

document.querySelector('#descriptionForm').addEventListener('submit', function (event) {

        event.preventDefault()
})


let x = document.querySelector('.form-group')

let newDiv = `<div class="invalid-feedback">
                        Escreve o teu novo nome de utilizador!
                </div>`

x.parentNode.insertBefore(newDiv, x.nextSibling)

console.log(x.parentNode.insertBefore(newDiv, x.nextSibling));


document.querySelector('#profileForm').addEventListener('submit', function (event) {
        let txtUsername = document.querySelector('#txtUsername').value
        let txtPassword = document.querySelector('#txtPassword').value
        let txtCountry = document.querySelector('#txtCountry').value
        let txtBirthdayDate = document.querySelector('#txtBirthdayDate').value

        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        }

        for (const user of users) {
                if (user._id != id) {
                        if (txtUsername == "") {
                                document.querySelector('.username').classList.add('is-invalid')



                                document.querySelector('.usernameText').innerHTML += `<div class="invalid-feedback">
                                                                                        Escreve o teu novo nome de utilizador!
                                                                                </div>`
                        } else {
                                document.querySelector('.username').classList.add('is-valid')
                                document.querySelector('.usernameText').innerHTML += `<div class="valid-feedback">
                                                                                        Que nome altamente!
                                                                                </div>`
                                document.querySelector('#txtUsername').value = txtUsername
                                user._username = txtUsername
                        }

                        if (txtPassword == "") {
                                document.querySelector('.password').classList.add('is-invalid')
                                document.querySelector('.passwordText').innerHTML += `<div class="invalid-feedback">
                                                                                        Escreve o teu novo nome de utilizador!
                                                                                </div>`
                        } else {
                                document.querySelector('.password').classList.add('is-valid')
                                document.querySelector('.passwordText').innerHTML += `<div class="valid-feedback">
                                                                                        Que nome altamente!
                                                                                </div>`
                                document.querySelector('#txtPassword').value = txtPassword
                                user._password = txtPassword
                        }

                        if (txtCountry == "") {
                                document.querySelector('.country').classList.add('is-invalid')
                                document.querySelector('.countryText').innerHTML += `<div class="invalid-feedback">
                                                                                        Escreve o teu novo nome de utilizador!
                                                                                </div>`
                        } else {
                                document.querySelector('.country').classList.add('is-valid')
                                document.querySelector('.countryText').innerHTML += `<div class="valid-feedback">
                                                                                        Que nome altamente!
                                                                                </div>`
                                document.querySelector('#txtCountry').value = txtCountry
                                user._country = txtCountry
                        }

                        if (txtBirthdayDate == "") {
                                document.querySelector('.birthday').classList.add('is-invalid')
                                document.querySelector('.birthdayText').innerHTML += `<div class="invalid-feedback">
                                                                                        Escreve o teu novo nome de utilizador!
                                                                                </div>`
                        } else {
                                document.querySelector('.birthday').classList.add('is-valid')
                                document.querySelector('.birthdayText').innerHTML += `<div class="valid-feedback">
                                                                                        Que nome altamente!
                                                                                </div>`
                                document.querySelector('#txtBirthdayDate').value = txtBirthdayDate
                                user._birthday = txtBirthdayDate
                        }

                }
                localStorage.setItem('users', JSON.stringify(users))
        }

        event.preventDefault()
})

document.querySelector('.buttonGirl').addEventListener('click', function () {
        document.querySelector('.avatarPlaceHolder').innerHTML = `<div class="row text-center">
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Principiante
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Amador
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Amador 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Amador 2 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Amador 3 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Amador 4 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Profissional
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Profissional 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Profissional  2 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Profissional  3 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Profissional  4 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Experiente
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avata Experiente 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Experiente 2 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Experiente 3 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/GirlAvatar/Avatar Experiente 4 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                </div>`
        $('.girlAvatar').css({
                'width': '6rem',
                'height': '6rem',
        });


})

document.querySelector('.buttonBoy').addEventListener('click', function () {
        document.querySelector('.avatarPlaceHolder').innerHTML = `<div class="row text-center">
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Principiante
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Amador
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Profissional
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Experiente
                                                        </p>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                </div>`
        $('.boyAvatar').css({
                'width': '6rem',
                'height': '6rem',
        });
})

function showAvatarOnload() {
        document.querySelector('.avatarPlaceHolder').innerHTML = `<div class="row text-center">
                                                                <div class="col-3">
                                                                        <p class="lead avatarType text-center">
                                                                        Principiante
                                                                        </p>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                <div class="col-3">
                                                                        <p class="lead avatarType text-center">
                                                                        Amador
                                                                        </p>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Amador 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                <div class="col-3">
                                                                        <p class="lead avatarType text-center">
                                                                        Profissional
                                                                        </p>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                <div class="col-3">
                                                                        <p class="lead avatarType text-center">
                                                                        Experiente
                                                                        </p>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                </div>`
        $('.boyAvatar').css({
                'width': '6rem',
                'height': '6rem',
                'box-shadow': '0 0 0 0'
        });
}

function showCurrentXP() {
        let width = 1
        for (const user of users) {
                if (user._xp === 0) {
                        document.querySelector('#currentXpBar').innerHTML = ""
                        break
                }
                if (user._xp >= 100) {
                        $('.progress-bar').css({
                                'width': '0%'
                        });
                        document.querySelector('#currentXpBar').innerHTML = user._xp
                } else {
                        width++
                        document.querySelector('.progress-bar').style.width = width + '%'
                        document.querySelector('#currentXpBar').innerHTML = user._xp
                }

        }
}

// $('.buttonBoy').click(function () {
//     $('.buttonGirl').css({
//         'visibility': 'visible',
//         'opacity': '0.5',
//         'transition': 'opacity .4s linear',
//     });
//     $('.buttonGirl').css({
//         'visibility': 'visible',
//         'opacity': '1',
//         'transition': 'opacity .4s linear',
//     });
// });

// $('.buttonGirl').click(function () {
//     $('.buttonBoy').css({
//         'visibility': 'visible',
//         'opacity': '0.5',
//         'transition': 'opacity .4s linear',
//     });
//     $('.buttonBoy').css({
//         'visibility': 'visible',
//         'opacity': '1',
//         'transition': 'opacity .4s linear',
//     });
// });

function cleanInputData() {
        document.querySelector('#txtUsername').addEventListener('click', function () {
                document.querySelector('#txtUsername').value = ""
        })

        document.querySelector('#txtPassword').addEventListener('click', function () {
                document.querySelector('#txtPassword').value = ""
        })

        document.querySelector('#txtCountry').addEventListener('click', function () {
                document.querySelector('#txtCountry').value = ""
        })

        document.querySelector('#txtBirthdayDate').addEventListener('click', function () {
                document.querySelector('#txtBirthdayDate').value = ""
        })
}

function showUserData() {
        if (localStorage.getItem("users")) {
                users = JSON.parse(localStorage.getItem("users"))
        }
        for (const user of users) {
                document.querySelector('#txtUsername').value = user._username

                document.querySelector('#txtPassword').value = user._password

                if (user._country === undefined) {
                        document.querySelector('#txtCountry').value = ""
                } else {
                        document.querySelector('#txtCountry').value = user._country
                }

                if (user._birthday === undefined) {
                        document.querySelector('#txtBirthdayDate').value = ""
                } else {
                        document.querySelector('#txtBirthdayDate').value = user._birthday
                }
        }
}

function doNotShowPasswordData() {
        let text = document.getElementById("txtPassword");
        if (text.type === "password") {
                text.type = "text";
        } else {
                text.type = "password";
        }
}

// xpAvatar()
// function xpAvatar() {
//         console.log(User.getLastId(User.getAvatarByXP())); 0
// }