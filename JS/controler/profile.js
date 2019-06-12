import User from '../models/userModels.js'
import Question from '../models/quizzesModels.js'
import Suggestion from '../models/suggestionModels.js'
import {
        signOut
} from '../controler/loginAndSignup.js'

export let suggestions = []
export let users = []

window.onload = function () {
        if (localStorage.getItem("users")) {
                users = JSON.parse(localStorage.getItem("users"))
        }
        let id = ""
        if (sessionStorage.getItem("loggedUserId")) {
                id = JSON.parse(sessionStorage.getItem('loggedUserId'))
        }
        doNotShowPasswordData()
        showUserData()
        showAvatarOnload()
        showCurrentXP()
}

cleanInputData()

if (document.querySelector('#leaveAccount') != null) {
        document.querySelector('#leaveAccount').addEventListener('click', function () {
                signOut()
                console.log('123');
        })
}

document.querySelector('#suggestionForm').addEventListener('submit', function (event) {
        let stlContinent = document.querySelector('#stlContinent').value
        let txtCountryName = document.querySelector('#txtCountryName').value
        let txtCountryCapital = document.querySelector('#txtCountryCapital').value
        let txtCountryLanguage = document.querySelector('#txtCountryLanguage').value

        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
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

        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        }

        for (const user of users) {
                if (user._id == id) {
                        if (txtUsername == '') {
                                Swal.fire({
                                        type: 'error',
                                        title: 'Oops...',
                                        text: 'Tens de ter um username!',
                                        padding: '1rem',
                                        background: '#CCCC33',
                                        confirmButtonColor: '#29ABE2'
                                }).then((result) => {
                                        if (result.value) {
                                                document.querySelector('#txtUsername').value = user._username
                                        }
                                })
                        } else {
                                const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'bottom-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        background: '#29ABE2'
                                });
                                Toast.fire({
                                        type: 'success',
                                        title: '<span style="color:#FFFFFF">Alterações guardadas com sucesso!<span>'
                                })
                                user._username = txtUsername
                        }

                        if (txtPassword == "") {
                                Swal.fire({
                                        type: 'error',
                                        title: 'Oops...',
                                        text: 'Tens de ter uma password!',
                                        padding: '1rem',
                                        background: '#CCCC33',
                                        confirmButtonColor: '#29ABE2'
                                }).then((result) => {
                                        if (result.value) {
                                                document.querySelector('#txtPassword').value = user._password
                                        }
                                })
                        } else {
                                const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'bottom-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        background: '#29ABE2'
                                });
                                Toast.fire({
                                        type: 'success',
                                        title: '<span style="color:#FFFFFF">Alterações guardadas com sucesso!<span>'
                                })
                                user._password = txtPassword
                        }

                        if (txtCountry == "") {
                                // document.querySelector('.country').classList.add('is-invalid')
                                // countryElement.classList.add('invalid-feedback')
                                // countryElement.innerHTML += 'Escreve o teu país!'
                                // document.querySelector('.countryForm').style.marginBottom = 15 + '%';
                                // setInterval(() => {
                                //         document.querySelector('.country').classList.remove('is-invalid')
                                //         countryElement.classList.remove('invalid-feedback')
                                //         countryElement.innerHTML = ""
                                // }, 5000);
                        } else {
                                // document.querySelector('.country').classList.add('is-valid')
                                // countryElement.classList.add('valid-feedback')
                                // countryElement.innerHTML += 'País Localizado!'
                                // document.querySelector('.countryForm').style.marginBottom = 15 + '%';
                                // setInterval(() => {
                                //         document.querySelector('.country').classList.remove('is-valid')
                                //         countryElement.classList.remove('valid-feedback')
                                //         countryElement.innerHTML = ""
                                // }, 5000);
                                // document.querySelector('#txtCountry').value = txtCountry
                                // user._country = txtCountry
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
        for (const user of users) {
                document.querySelector('.avatarPlaceHolder').innerHTML = `<div class="row text-center">
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Principiante
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Amador
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Amador 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Amador 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Amador 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Amador 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Profissional
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                    <div class="col-3">
                                                        <p class="lead avatarType text-center">
                                                            Experiente
                                                        </p>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 1.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 2.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 3.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                        <button class="btn avatarButton" id="${user._avatar}" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 4.png"
                                                                alt="Avatar1" class="boyAvatar"></button>
                                                    </div>
                                                </div>`
        }
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
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Principiante 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                <div class="col-3">
                                                                        <p class="lead avatarType text-center">
                                                                        Amador
                                                                        </p>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Amador 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Amador 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Amador 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Amador 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                <div class="col-3">
                                                                        <p class="lead avatarType text-center">
                                                                        Profissional
                                                                        </p>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Profissional 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                <div class="col-3">
                                                                        <p class="lead avatarType text-center">
                                                                        Experiente
                                                                        </p>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 1.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 2.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 3.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                        <button class="btn avatarButton" type="button"><img src="/Images/BoyAvatars/Avatar Experiente 4.png"
                                                                                alt="Avatar1" class="boyAvatar"></button>
                                                                </div>
                                                                </div>`
        avatarChange()
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
                        }

                        for (const user of users) {
                                if (user._id == id) {
                                        for (let i = 0; i < users.length; i++) {
                                                user._avatar = elem.querySelector('img').src
                                                //Change avatar in navbar
                                                document.querySelector('.avatar').src = elem.querySelector('img').src
                                                document.querySelector('#currentPhoto').src = user._avatar
                                        }
                                }
                                localStorage.setItem('users', JSON.stringify(users))
                        }
                })
        }
}

function showCurrentXP() {
        let width = 1
        for (const user of users) {
                let id = ""
                if (sessionStorage.getItem('loggedUserId')) {
                        id = JSON.parse(sessionStorage.getItem("loggedUserId"))
                }

                if (user._id == id) {
                        if (user._xp <= 20) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 20 && user._xp <= 80) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 80 && user._xp <= 160) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 160 && user._xp <= 240) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 240 && user._xp <= 320) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 320 && user._xp <= 400) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 400 && user._xp <= 480) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 480 && user._xp <= 560) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 560 && user._xp <= 640) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 640 && user._xp <= 720) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 720 && user._xp <= 800) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 800 && user._xp <= 880) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 880 && user._xp <= 960) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 1040 && user._xp <= 1120) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp > 1120 && user._xp <= 1199) {
                                width += 6.25
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else {
                                width = 100
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        }
                }
                // if (user._xp == 0) {
                //         document.querySelector('#currentXpBar').innerHTML = ""
                //         break
                // }
                // document.querySelector('#currentXpBar').innerHTML = user._xp
                // if (user._xp >= 100) {
                //         $('.progress-bar').css({
                //                 'width': '0%'
                //         });
                //         document.querySelector('#currentXpBar').innerHTML = user._xp
                // } else {
                //         width++

                //         document.querySelector('#currentXpBar').innerHTML = user._xp
                // }
                // document.querySelector('.progress-bar').style.width = width + '%'

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
}

export function showUserData() {
        if (localStorage.getItem("users")) {
                users = JSON.parse(localStorage.getItem("users"))
        }
        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
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

                        document.querySelector('#txtDescription').value = user._description

                        document.querySelector('.avatar').src = user._avatar

                        document.querySelector('#currentPhoto').src = user._avatar
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