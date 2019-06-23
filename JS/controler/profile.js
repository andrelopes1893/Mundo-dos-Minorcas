import Suggestion from '../models/suggestionModels.js'
import {
        signOut
} from '../controler/loginAndSignup.js'

export let suggestions = []
export let users = []

window.onload = function () {

        confirmSystemHaker()
        if (localStorage.getItem("users")) {
                users = JSON.parse(localStorage.getItem("users"))
        }
        let id = ""
        if (sessionStorage.getItem("loggedUserId")) {
                id = JSON.parse(sessionStorage.getItem('loggedUserId'))
        }
        if (localStorage.getItem("suggestions")) {
                suggestions = JSON.parse(localStorage.getItem("suggestions"))
        }
        doNotShowPasswordData()
        showUserData()
        showAvatarOnload()
        showCurrentXP()
}

/**
 * Function that will prevent hacking 
 */
function confirmSystemHaker() {
        if (sessionStorage.getItem("loggedUserId") == null) {
                location.href = '/HTML/loginAndSigup.html'
        }
}

cleanInputData()

/**
 * Sign out
 */
if (document.querySelector('#leaveAccount') != null) {
        document.querySelector('#leaveAccount').addEventListener('click', function () {
                signOut()
        })
}

/**
 * Form that will submit the suggestions done by each user
 * @param {Number} id returns the logged user id that is set on the sessionStorage
 * @param {String} stlContinent return the value of the continent input
 * @param {String} txtCountryName return the value of the country input
 * @param {String} txtCountryCapital return the value of the capital input
 * @param {String} txtCountryLanguage return the value of the language input
 */
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

/**
 * Form that will submit the description field for user data changes
 * @param {Number} id returns the logged user id that is set on the sessionStorage
 * @param {String} txtDescription return the value of the description input
 */
document.querySelector('#descriptionForm').addEventListener('keyup', function () {
        let txtDescription = document.querySelector('#txtDescription').value

        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
                id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        }

        for (const user of users) {
                if (user._id == id) {
                        //If the user dont write nothing, the input will automatically write something for him/ her
                        if (txtDescription == "") {
                                document.querySelector('#txtDescription').placeholder = 'Escreve uma descrição fixe!'
                        } else {
                                //Otherwise the description will be saved
                                document.querySelector('#txtDescription').value = txtDescription
                                user._description = txtDescription
                        }
                }
                localStorage.setItem('users', JSON.stringify(users))
        }
})

/**
 * Form that will submit the user data changes
 * @param {Number} id returns the logged user id that is set on the sessionStorage
 * @param {String} txtUsername return the value of the username input
 * @param {String} txtPassword return the value of the password input
 * @param {String} txtCountry return the value of the country input
 */
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
                        // If username and passwords fields are empty an alert will be fired
                        if (txtUsername == '' || txtPassword == "") {
                                Swal.fire({
                                        type: 'error',
                                        title: 'Erro...',
                                        text: 'Tens de preencher todos os campos!',
                                        padding: '1rem',
                                        background: '#CCCC33',
                                        confirmButtonColor: '#29ABE2'
                                }).then((result) => {
                                        if (result.value) {
                                                document.querySelector('#txtUsername').value = user._username
                                                document.querySelector('#txtPassword').value = user._password
                                        }
                                })
                        } else {
                                // Otherwise, changes will be saved successfully
                                const usernameToast = Swal.mixin({
                                        toast: true,
                                        position: 'bottom-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        background: '#29ABE2'
                                });
                                usernameToast.fire({
                                        type: 'success',
                                        title: '<span style="color:#FFFFFF">Alterações guardadas com sucesso!<span>'
                                })
                                user._username = txtUsername
                                user._password = txtPassword
                        }
                        //This field is empty when the user creates an account, so the user will be free to choose is own country
                        document.querySelector('#txtCountry').value = txtCountry
                        user._country = txtCountry
                }
                localStorage.setItem('users', JSON.stringify(users))
        }
        event.preventDefault()
})

// Return the girl avatars
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

// Return the boy avatars
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
        avatarChange()
        $('.boyAvatar').css({
                'width': '6rem',
                'height': '6rem',
        });
})

// Return the boy avatars when the page is loaded
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

/**
 * @param {Number} id returns the logged user id that is set on the sessionStorage
 */
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
                                        user._avatar = elem.querySelector('img').src
                                        //Change avatar in navbar
                                        document.querySelector('.avatar').src = elem.querySelector('img').src
                                        document.querySelector('#currentPhoto').src = user._avatar
                                }
                                localStorage.setItem('users', JSON.stringify(users))
                        }
                })
        }
}

/**
 * @param {Number} width save the width quantity that is going to be user afterwards in the progress bar 
 * @param {Number} id rreturns the logged user id that is set on the sessionStorage
 */
function showCurrentXP() {
        let width = 1
        for (const user of users) {
                let id = ""
                if (sessionStorage.getItem('loggedUserId')) {
                        id = JSON.parse(sessionStorage.getItem("loggedUserId"))
                }

                if (user._id == id) {
                        if (user._xp == 0) {
                                width = 0
                                document.querySelector('.progress-bar').style.width = width + '%'
                                document.querySelector('#currentXpBar').innerHTML = user._xp + ' / 1200 xp'
                        } else if (user._xp >= 1 && user._xp <= 20) {
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
        }
}

/**
 * Function that will clear input data when the text box is pressed
 */
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

/**
 * Function that will show on the text boxes all the user data already saved before
 * @param {Number} id returns the logged user id that is set on the sessionStorage
 */
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

/**
 * Function that won't let show the normal characters in the password text box
 */
function doNotShowPasswordData() {
        let text = document.getElementById("txtPassword");
        if (text.type === "password") {
                text.type = "text";
        } else {
                text.type = "password";
        }
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
        document.body.classList.add('animate-out')
})