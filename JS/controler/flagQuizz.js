let quizzes = []
let continentStyle = ''
let ChosenQuizz = ''
document.querySelector('#quit').addEventListener('click', function () {
    location.href = '/HTML/quizz.html'

})

function confirmSystemHaker() {
    if (sessionStorage.getItem("loggedUserId") == null) {
        location.href = '/HTML/loginAndSigup.html'
    }
}

window.onload = function () {
    confirmSystemHaker()
}

QuizzGenerator()
// *Working (Butt needs some adjustments)
//! this function reads all the components of an  array and tells if the user have or not quizzes from that category and level(optional)
function confExistence(continent, quizzes, type, level) {
    for (const quizz of quizzes) {
        if (quizz._continent == continent && quizz._quizType == type && quizz._level == level) {
            return 1;
        }
    }
    return 0
}
/**
 * confirm if the game has already been played
 * @param {string} generatedId the generated id from the randomGame Generator
 */
function getplayedQuizz(generatedId) {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }
    for (const user of users) {
        if (user._id == loggedUserId) {
            for (const played of user._playedQuizzes) {
                if (played == generatedId) {
                    return true;
                }

            }
        }
    }
    return false
}
// *Working
/**
 * This functions add to the user the quizz that he has already played
 * @param {number} quizzId This is the generated quizz id
 */
function setPlayedQuizzes(quizzId) {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }
    for (const user of users) {
        if (user._id == loggedUserId) {
            user._playedQuizzes.push(quizzId)
        }
    }
    localStorage.setItem('users', JSON.stringify(users))
}
// *Working
/**
 * Get the user acctual status inside a quizz
 * @param {String} continent The continet 
 * @param {String} quizzType Type of quizz
 */
function getActualLevel(continent, quizzType) {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }
    let level = 0;

    for (const user of users) {
        if (user._id == loggedUserId) {
            let currentLevels = user._currentLevels
            if (currentLevels.length == 0) {
                return level
            } else {
                for (const currentLevel of currentLevels) {
                    if (currentLevel.continent == continent && currentLevel.quizzTitle == quizzType) {
                        level = currentLevel.level - 1
                        return level
                    }
                }
                return level
            }

        }
    }
}

// *Working
/**
 * update the user status inside a expecific quizz
 * @param {String} level The actual level inside a quizz
 */
function actualLevel(level) {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }
    if (sessionStorage.getItem('continentStyle')) {
        continentStyle = JSON.parse(sessionStorage.getItem('continentStyle'))
    } else {
        // !Para eliminar
        continentStyle = 'Africa'
        // !Para eliminar
        sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    }
    // Get the type of quizzes that the user whant to play from the sessionStorage
    if (sessionStorage.getItem('ChosenQuizz')) {
        ChosenQuizz = JSON.parse(sessionStorage.getItem('ChosenQuizz'))
    } else {
        // !Para eliminar
        ChosenQuizz = 'Bandeiras'
        // !Para eliminar
        sessionStorage.setItem('ChosenQuizz', JSON.stringify(ChosenQuizz))
    }
    for (const user of users) {
        if (user._id == loggedUserId) {
            let cont = 0;
            if (user._currentLevels.length > 0) {
                for (const stage of user._currentLevels) {
                    if (stage.continent == continentStyle && stage.quizzTitle == ChosenQuizz) {
                        stage.level = level
                        break;
                    }
                    cont++;
                }
                if (user._currentLevels.length == cont) {
                    let quizzState = {
                        continent: continentStyle,
                        quizzTitle: ChosenQuizz,
                        level: level
                    }
                    user._currentLevels.push(quizzState)
                }
                break;
            } else {
                let quizzState = {
                    continent: continentStyle,
                    quizzTitle: ChosenQuizz,
                    level: level
                }
                user._currentLevels.push(quizzState)
            }
        }
    }
    localStorage.setItem('users', JSON.stringify(users))
}


// *Working
// !Generate a random number
function GenerateRandomNumb() {
    let random = Math.floor(Math.random() * 4) + 1;
    return random
}
// *Working
//! This function Gives back an random "Id", id that will be the id of the quizz
function GenerateRandomGame() {
    let maxNumber = quizzes.length
    let game
    do {
        game = Math.floor(Math.random() * maxNumber) + 1;
        pass = getplayedQuizz(game)
    } while (pass !== false);
    return game;
}

// *Working
//!This Fuction Looks if the random number has already been generated
function answearAddExistence(arrayAnswears, randomNumber) {
    for (const answear of arrayAnswears) {
        if (answear == randomNumber) {
            return true
        }
    }
    return false;
}
// *Working
// !This fuctin get all the buttons with the options and add an event That will Check if the choosen answear is the right one
function isTheAnswearRight(pointXp, game, level) {
    let options = document.querySelectorAll('.optionsButton')
    for (const option of options) {
        option.addEventListener('click', function () {
            ConfIfUserIsRight(this.id, pointXp, game, level)
        })
    }
}
// *Working
// !Confirm if the answear is right
/**
 * gives xp to the user if he is write and updates user status inside a quizz
 * @param {Number} id The position of the answear inside the array
 * @param {String} pointXp Number of xp that the user will win
 * @param {Number} game The id of the question that the user is playind
 * @param {Number} level 
 */
function ConfIfUserIsRight(id, pointXp, game, level) {
    if (id === '3') {
        Swal.fire({
            title: '<span style="color:#ffff ; font-size:1.7rem">Parabéns, acertaste</span>',
            type: 'info',
            confirmButtonText: 'ok',
            background: `#29ABE2`
        })
        assignXpToThePlayer(pointXp)
        setPlayedQuizzes(game)
        checkLevelProgress(level)
        let quizzPlaceHolder = document.querySelector('#quizzHolder')
        // Eleminate the previouse quizz
        quizzPlaceHolder.innerHTML = ''
        QuizzGenerator()
    } else {

        Swal.fire({
            title: '<span style="color:#ffff ; font-size:1.7rem">Erraste!</span>',
            type: 'info',
            confirmButtonText: 'ok',
            background: `#29ABE2`
        })
        // location.reload()//This is not right
        let quizzPlaceHolder = document.querySelector('#quizzHolder')
        // Eleminate the previouse quizz
        quizzPlaceHolder.innerHTML = ''
        //location.href = '/HTML/continentQuizz.html'
    }
}

// *Working
/**
 * Function that make the level buttons 
 */
function unlockedLevels(level) {
    let playebleLevels = []
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }

    playebleLevels.push(1, 2, 3, 4, 5)
    renderLevelButtons(playebleLevels, level)

    return playebleLevels
}
/**
 * Generate the levels buttons  (helps identify the level that the user is playing)         
 * @param {array} playebleLevels level that the user can play
 */
function renderLevelButtons(playebleLevels, level) {
    let holder = document.querySelector('#levelButtonsHolder')
    holder.innerHTML = ""
    for (let i = 0; i < playebleLevels.length; i++) {
        holder.innerHTML += `<div class="col">
        <button type="button" class="btn levelSelection my-4" id="${playebleLevels[i]}" disabled>${playebleLevels[i]}</button></div>`
    }
    selectLevel(level)
}

function selectLevel(level) {
    let btns = document.querySelectorAll(".levelSelection")
    for (const btn of btns) {

        if (level == btn.id) {
            btn.style.backgroundColor = "red"
        }
    }
}

// function ChosenLevel(id) {
// ******************************************************************
//     actualLevel(id)
// }

// *Working(main function)
/**
 * This Function generate the quizz
 */
function QuizzGenerator() {
    //countdown()

    // exit()

    //  get the ulocked id

    //!Exist because if it doesn't ann error will appear
    if (localStorage.getItem('quizzes')) {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
    }
    if (sessionStorage.getItem('continentStyle')) {
        continentStyle = JSON.parse(sessionStorage.getItem('continentStyle'))
    } else {
        // !Para eliminar
        continentStyle = 'Africa'
        // !Para eliminar
        sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    }
    // Get the type of quizzes that the user whant to play from the sessionStorage
    if (sessionStorage.getItem('ChosenQuizz')) {
        ChosenQuizz = JSON.parse(sessionStorage.getItem('ChosenQuizz'))
    } else {
        // !Para eliminar
        ChosenQuizz = 'Bandeiras'
        // !Para eliminar
        sessionStorage.setItem('ChosenQuizz', JSON.stringify(ChosenQuizz))
    }

    let position = Number(getActualLevel(continentStyle, ChosenQuizz)) + 1
    let level = position


    let numbers = quantity(continentStyle, quizzes, ChosenQuizz, level)

    levelInfoBuilder(level, continentStyle, ChosenQuizz, numbers)
    showCurrentXP()
    if (isCompleted(level)) {
        //countdown()
        Swal.fire({
            title: '<span style="color:#ffff ; font-size:1.7rem">Já Completaste este quizz</span>',
            type: 'info',
            confirmButtonText: 'ok',
            background: `#29ABE2`
        }).then((result) => {
            if (result.value) {
                location.href = '/HTML/quizz.html'
            }
        })
    } else {
        unlockedLevels(level)

        // ??????Questionavel 
        // Tells the actual level of the user 
        // actualLevel(continentStyle,level)

        // Get the place where the quizzes are going to be generated
        let quizzPlaceHolder = document.querySelector('#quizzHolder')

        // Eleminate the previouse quizz
        quizzPlaceHolder.innerHTML = ''

        //Array that will prevent the generation of the same number
        let generatedNumbers = []

        // This create a new in case of the gamer cannot played de random game
        let timesInsideQuizzes = 0;

        //continent,quizzes, type
        if (confExistence(continentStyle, quizzes, ChosenQuizz, level) == false) {
            Swal.fire({
                title: '<span style="color:#ffff ; font-size:1.7rem">Neste momento não existem quizzes deste nível nesta catergoria deste Continente</span>',
                type: 'info',
                confirmButtonText: 'ok',
                background: `#CCCC33`,
                confirmButtonColor: `#29ABE2`

            }).then((result) => {
                if (result.value) {
                    location.href = '/HTML/quizz.html'
                }
            })
        } else {
            actualLevel(level)
            let game = GenerateRandomGame()
            for (const quizz of quizzes) {
                if (quizz._id == game && quizz._continent.toUpperCase() == continentStyle.toUpperCase() && quizz._quizType == ChosenQuizz && quizz._level == level) {
                    document.querySelector('#questionHolder').innerHTML = quizz._question

                    document.querySelector('#quizzImg').src = quizz._img
                    for (let i = 0; i < 4; i++) {
                        if (generatedNumbers.length == 0) {
                            let position = GenerateRandomNumb()
                            generatedNumbers.push(position)
                            quizzPlaceHolder.innerHTML += ` <div class="row optionsRow">
                        <button class="btn mx-auto optionsButton" id='${position -1}'>${quizz._answers[position-1]}</button>
                         </div>`

                        } else {
                            let position = GenerateRandomNumb()

                            if (answearAddExistence(generatedNumbers, position) == false) {
                                generatedNumbers.push(position)
                                quizzPlaceHolder.innerHTML += ` <div class="row optionsRow">
                        <button class="btn mx-auto optionsButton" id='${position-1}'>${quizz._answers[position-1]}</button>
                         </div>`
                            } else {
                                i--
                            }
                        }
                    }
                    // !Validade answer
                    isTheAnswearRight(quizz._pointXp, game, level)
                    break;
                }
                timesInsideQuizzes++;
                if (timesInsideQuizzes == quizzes.length) {
                    QuizzGenerator()
                }
            }
        }
    }
    // This is a number (id)
}

// *Working
/**
 * Give Xp To the user that get the answears right
 * @param {number} xp quantity of Xps that the user will gain
 */
function assignXpToThePlayer(xp) {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))
    } else {
        loggedUserId = 2
    }
    for (const user of users) {
        if (user._id == loggedUserId) {
            user._xp += Number(xp)
            localStorage.setItem("users", JSON.stringify(users))
        }
    }
}
// !Falta
//Function to make you go to the next level  

//* Working
/**
 * This function validadte if the user is ready to play another level from the quizz in the continet from that category 
 * @param {Number} level the actual level that the user is inside in that quizz
 */
function checkLevelProgress(level) {

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }
    if (sessionStorage.getItem('continentStyle')) {
        continentStyle = JSON.parse(sessionStorage.getItem('continentStyle'))
    } else {
        // !Para eliminar
        continentStyle = 'Africa'
        // !Para eliminar
        sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    }
    // Get the type of quizzes that the user whant to play from the sessionStorage
    if (sessionStorage.getItem('ChosenQuizz')) {
        ChosenQuizz = JSON.parse(sessionStorage.getItem('ChosenQuizz'))
    } else {
        // !Para eliminar
        ChosenQuizz = 'Bandeiras'
        // !Para eliminar
        sessionStorage.setItem('ChosenQuizz', JSON.stringify(ChosenQuizz))
    }


    let played = []
    // !Get the quizzes that the player have played in the current level
    for (const user of users) {
        if (user._id == loggedUserId) {
            played = user._playedQuizzes
        }
    }

    //!Counts the amount of quizzes from that level that existe
    let howManyQuizz = 0
    for (const quizz of quizzes) {
        if (quizz._level == level && quizz._continent == continentStyle && quizz._quizType == ChosenQuizz) {
            howManyQuizz++
        }
    }
    let cont = 0

    let toDelite = []

    for (let i = 0; i < played.length; i++) {

        for (const quizz of quizzes) {
            if (quizz._id == played[i]) {
                toDelite.push(played[i])
                cont++;
                break;
            }
        }
    }
    if (howManyQuizz === cont) {
        for (const user of users) {
            if (user._id == loggedUserId) {

                for (let j = 0; j < toDelite.length; j++) {

                    for (let i = 0; i < user._playedQuizzes.length; i++) {
                        if (user._playedQuizzes[i] == toDelite[j]) {
                            user._playedQuizzes.splice([i], 1)
                            break;
                        }
                    }
                }
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        Swal.fire({
            title: '<span style="color:#ffff ; font-size:1.7rem">Parabéns, Subiste de Nível</span>',
            type: 'info',
            confirmButtonText: 'ok',
            background: `#29ABE2`
        })
        actualLevel(level + 1)
    }

}
//* Working
//!function that validade if the user has already completed the quizz
function isCompleted(level) {
    if (level == 6) {
        return true
    }
    return false
}

/**
 * build the information to update the user about his status inside the quizz           
 * @param {String} level the actual level that the user is inside in that quizz
 * @param {String} continent The continent that the quizz represents
 * @param {String} quizzType Type of Quizz (flag,Capital or Location)
 * @param {Array} numbers array with the number of games existence in that level from that category and continent(second possition (1) inside the array ) and the number of quizzes from the same that the user has played (first possition (0) inside the array)
 */

function levelInfoBuilder(level, continent, quizzType, numbers) {
    let quizzInfoHolder = document.querySelector('#actualLevel')
    let continentPlace = document.querySelector('#actualContinet')
    if (continent === 'Africa') {
        quizzInfoHolder.innerHTML = `Tipo de Quizz: <span>${quizzType}</span><br> Nível: <span>${level}</span><br>Progresso: <span>${numbers[0]}/${numbers[1]}</span> `
        continentPlace.innerHTML = `Continente: <span>África</span>`
    }
    if (continent === 'America') {
        quizzInfoHolder.innerHTML = `Tipo de Quizz: <span>${quizzType}</span><br> Nível: <span>${level}</span> <br>Progresso: <span>${numbers[0]}/${numbers[1]}</span> `
        continentPlace.innerHTML = `Continente: <span>América</span>`
    }
    if (continent === 'Asia') {
        quizzInfoHolder.innerHTML = `Tipo de Quizz: <span>${quizzType}</span><br> Nível: <span>${level}</span><br>Progresso: <span>${numbers[0]}/${numbers[1]}</span>`
        continentPlace.innerHTML = `Continente: <span>Ásia</span>`
    }
    if (continent === 'Europa') {
        quizzInfoHolder.innerHTML = `Tipo de Quizz: <span>${quizzType}</span> <br> Nível: <span>${level}</span><br>Progresso: <span>${numbers[0]}/${numbers[1]}</span>`
        continentPlace.innerHTML = `Continente: <span>Europa</span>`
    }
    if (continent === 'Oceania') {
        quizzInfoHolder.innerHTML = `Tipo de Quizz: <span>${quizzType}</span> <br>Nível: <span>${level}</span><br>Progresso: <span>${numbers[0]}/${numbers[1]}</span>`
        continentPlace.innerHTML = `Continente: <span>Oceânia</span>`
    }
    let spans = document.querySelectorAll("span")
    for (const span of spans) {
        span.style.color = "#CCCC33"
    }
}
//* Working
/**
 * This function gives back the number of quizzes from the current level category and continet that the user has played and gives the total of level from the same condition that existes 
 * @param {String} continent The continent that the quizz represents
 * @param {Array} quizzes The quizzes from the app
 * @param {String} type  Type of Quizz (flag,Capital or Location)
 * @param {Number} level the actual level that the user is inside one quizz
 */
function quantity(continent, quizzes, type, level) {


    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }


    let total = 0;
    let comparations = []
    for (const quizz of quizzes) {
        if (quizz._continent == continent && quizz._quizType == type && quizz._level == level) {
            total++;
            comparations.push(quizz._id)
        }
    }

    let play = 0;
    for (const user of users) {
        if (user._id == loggedUserId) {
            for (const played of user._playedQuizzes) {
                for (const id of comparations) {
                    if (id == played) {
                        play++;
                    }
                }
            }
        }
    }

    let toReturn = []
    toReturn.push(play)
    toReturn.push(total)
    return toReturn
}


//*WORKING
// !Progress bar fill
function showCurrentXP() {
    let width = 1
    for (const user of users) {
        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
            id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        } else {
            id = 2
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
    }
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})