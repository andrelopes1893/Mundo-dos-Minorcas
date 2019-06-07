import User from '../models/userModels.js'
import Question from '../models/quizzesModels.js'
import Suggestion from '../models/suggestionModels.js'

export let suggestions = []
export let users = []

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

document.querySelector('#suggestionForm').addEventListener('submit', function (event) {
        let stlContinent = document.querySelector('#stlContinent').value
        let txtCountryName = document.querySelector('#txtCountryName').value
        let txtCountryCapital = document.querySelector('#txtCountryCapital').value
        let txtCountryLanguage = document.querySelector('#txtCountryLanguage').value

        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        } else {
                id = 1
        }

        for (const user of users) {
                if (user._id == id) {
                        suggestions.push(new Suggestion(stlContinent, txtCountryName, txtCountryCapital, txtCountryLanguage))
                }

        }
        localStorage.setItem('suggestions', JSON.stringify(suggestions))

        event.preventDefault()
})

document.querySelector('#descriptionForm').addEventListener('keyup', function () {
        let txtDescription = document.querySelector('#txtDescription').value

        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        } else {
                id = 1
        }

        for (const user of users) {
                if (user._id == id) {
                        if (txtDescription == "") {
                                document.querySelector('#txtDescription').placeholder = 'Escreve uma descrição fixe!'
                        } else {

                                document.querySelector('#txtDescription').value = txtDescription
                                user._description = txtDescription
                        }
                }
                localStorage.setItem('users', JSON.stringify(users))
        }
})

document.querySelector('#profileForm').addEventListener('submit', function (event) {
        let txtUsername = document.querySelector('#txtUsername').value
        let txtPassword = document.querySelector('#txtPassword').value
        let txtCountry = document.querySelector('#txtCountry').value
        let txtBirthdayDate = document.querySelector('#txtBirthdayDate').value

        let usernameClass = document.querySelector('.username')
        let usernameDiv = document.createElement('div')
        let usernameElement = usernameClass.parentNode.insertBefore(usernameDiv, usernameClass.nextSibling)

        let passwordClass = document.querySelector('.password')
        let passwordDiv = document.createElement('div')
        let passwordElement = passwordClass.parentNode.insertBefore(passwordDiv, passwordClass.nextSibling)

        let countryClass = document.querySelector('.country')
        let countryDiv = document.createElement('div')
        let countryElement = countryClass.parentNode.insertBefore(countryDiv, countryClass.nextSibling)

        let birthdayClass = document.querySelector('.birthday')
        let birthdayDiv = document.createElement('div')
        let birthdayElement = birthdayClass.parentNode.insertBefore(birthdayDiv, birthdayClass.nextSibling)

        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        } else {
                id = 1
        }

        for (const user of users) {
                if (user._id == id) {
                        if (txtUsername == "") {
                                document.querySelector('.username').classList.add('is-invalid')
                                usernameElement.classList.add('invalid-feedback')
                                usernameElement.innerHTML += 'Escreve o teu novo nome de utilizador!'
                                // document.querySelector('.invalid-feedback').style.transition = 'all .5s ease-in-out'
                                // document.querySelector('.invalid-feedback').style.transform = 'scale(1.1, 1.1)'
                                // document.querySelector('.usernameForm').style.marginBottom = 15 + '%';
                                setTimeout(() => {
                                        document.querySelector('.usernameForm').style.transition = 'all .5s ease-in-out'
                                        document.querySelector('.usernameForm').style.transform = 'scale(1, 1)'
                                        document.querySelector('.username').classList.remove('is-invalid')
                                        usernameElement.classList.remove('invalid-feedback')
                                        usernameElement.innerHTML = ""

                                }, 5000);
                        } else {
                                document.querySelector('.username').classList.add('is-valid')
                                usernameElement.classList.add('valid-feedback')
                                usernameElement.innerHTML += 'Que nome mais altamente!'
                                // document.querySelector('.usernameForm').style.marginBottom = 15 + '%';
                                setTimeout(() => {
                                        document.querySelector('.username').classList.remove('is-valid')
                                        usernameElement.classList.remove('valid-feedback')
                                        usernameElement.innerHTML = ""
                                }, 5000);
                                document.querySelector('#txtUsername').value = txtUsername
                                user._username = txtUsername
                        }

                        if (txtPassword == "") {
                                document.querySelector('.password').classList.add('is-invalid')
                                passwordElement.classList.add('invalid-feedback')
                                passwordElement.innerHTML += 'Escreve a tua nova palavra-passe!'
                                // document.querySelector('.passwordForm').style.marginBottom = 15 + '%';
                                setInterval(() => {
                                        document.querySelector('.password').classList.remove('is-invalid')
                                        passwordElement.classList.remove('invalid-feedback')
                                        passwordElement.innerHTML = ""
                                }, 5000);
                        } else {
                                document.querySelector('.password').classList.add('is-valid')
                                passwordElement.classList.add('valid-feedback')
                                passwordElement.innerHTML += 'Palavra-passe segura!'
                                // document.querySelector('.passwordForm').style.marginBottom = 15 + '%';
                                setInterval(() => {
                                        document.querySelector('.password').classList.remove('is-valid')
                                        passwordElement.classList.remove('valid-feedback')
                                        passwordElement.innerHTML = ""
                                }, 5000);
                                document.querySelector('#txtPassword').value = txtPassword
                                user._password = txtPassword
                        }

                        if (txtCountry == "") {
                                document.querySelector('.country').classList.add('is-invalid')
                                countryElement.classList.add('invalid-feedback')
                                countryElement.innerHTML += 'Escreve o teu país!'
                                // document.querySelector('.countryForm').style.marginBottom = 15 + '%';
                                setInterval(() => {
                                        document.querySelector('.country').classList.remove('is-invalid')
                                        countryElement.classList.remove('invalid-feedback')
                                        countryElement.innerHTML = ""
                                }, 5000);
                        } else {
                                document.querySelector('.country').classList.add('is-valid')
                                countryElement.classList.add('valid-feedback')
                                countryElement.innerHTML += 'País Localizado!'
                                // document.querySelector('.countryForm').style.marginBottom = 15 + '%';
                                setInterval(() => {
                                        document.querySelector('.country').classList.remove('is-valid')
                                        countryElement.classList.remove('valid-feedback')
                                        countryElement.innerHTML = ""
                                }, 5000);
                                document.querySelector('#txtCountry').value = txtCountry
                                user._country = txtCountry
                        }

                        if (txtBirthdayDate == "") {
                                document.querySelector('.birthday').classList.add('is-invalid')
                                birthdayElement.classList.add('invalid-feedback')
                                birthdayElement.innerHTML += 'Escreve a tua data de aniversário!'
                                // document.querySelector('.birthdayForm').style.marginBottom = 15 + '%';
                                setInterval(() => {
                                        document.querySelector('.birthday').classList.remove('is-invalid')
                                        birthdayElement.classList.remove('invalid-feedback')
                                        birthdayElement.innerHTML = ""
                                }, 5000);
                        } else {
                                document.querySelector('.birthday').classList.add('is-valid')
                                birthdayElement.classList.add('valid-feedback')
                                birthdayElement.innerHTML += 'Data de aniversário aceite!'
                                // document.querySelector('.birthdayForm').style.marginBottom = 0 + '%';
                                setInterval(() => {
                                        document.querySelector('.birthday').classList.remove('is-valid')
                                        birthdayElement.classList.remove('valid-feedback')
                                        birthdayElement.innerHTML = ""
                                }, 5000);
                                document.querySelector('#txtBirthdayDate').value = txtBirthdayDate
                                user._birthday = txtBirthdayDate
                        }
                }
                localStorage.setItem('users', JSON.stringify(users))
        }
        event.preventDefault()
})

document.querySelector('.buttonGirl').addEventListener('click', function () {
        for (const user of users) {
                document.querySelector('.avatarPlaceHolder').innerHTML = `<div class="row text-center">
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Principiante
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 2 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 3 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Principiante 4 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Amador
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Amador 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Amador 2 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Amador 3 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Amador 4 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Profissional
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Profissional 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Profissional  2 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Profissional  3 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Profissional  4 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Experiente
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avata Experiente 1 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Experiente 2 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Experiente 3 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/GirlAvatar/Avatar Experiente 4 Girl.png"
                                                                alt="Avatar1" class="girlAvatar"></button>
                                                    </div>
                                                </div>`
        }
        avatarChange()
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

function avatarChange() {
        let profileBtns = document.querySelectorAll('.avatarButton')
        for (const elem of profileBtns) {
                elem.addEventListener("click", function () {
                        let id = ""
                        if (sessionStorage.getItem('loggedUserId')) {
                                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
                        } else {
                                id = 1
                        }

                        for (const user of users) {
                                if (user._id == id) {
                                        for (let i = 0; i < users.length; i++) {
                                                user._avatar = elem.querySelector('img').src
                                                //Change avatar in navbar
                                                document.querySelector('.avatar').src = elem.querySelector('img').src
                                        }
                                }
                                localStorage.setItem('users', JSON.stringify(users))
                        }
                })
        }
}

// function showAvatar(source) {
//         let avatarImg = document.querySelector('.girlAvatar').src

//         let id = ""
//         if (sessionStorage.getItem('loggedUserId')) {
//                 id = JSON.parse(sessionStorage.getItem("loggedUserId"))
//         } else {
//                 id = 1
//         }

//         for (const user of users) {
//                 if (user._id == id) {
//                         for (let i = 0; i < users.length; i++) {
//                                 if (users[i]._avatar != source) {
//                                         user._avatar = avatarImg
//                                         //Change avatar in navbar
//                                         document.querySelector('.avatar').src = avatarImg
//                                 }
//                         }
//                 }
//                 localStorage.setItem('users', JSON.stringify(users))
//         }
// }

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

export function showUserData() {
        if (localStorage.getItem("users")) {
                users = JSON.parse(localStorage.getItem("users"))
        }
        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        } else {
                id = 1 //Alterar
        }
        for (const user of users) {
                if (user._id == id) {
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

                        document.querySelector('#txtDescription').value = user._description

                        document.querySelector('.avatar').src = user._avatar
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