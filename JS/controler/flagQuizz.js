let quizzes = []
let continentStyle = ''
let ChosenQuizz = ''


QuizzGenerator()
// *Working (Butt needs some adjustments)
//! this function reads all the array and tells if the user have or not quizzes from that category
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
//!!!!!!!!!!!!funcao que busca o atual nivel
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
            }

        }
    }
}

// *Working
//!!!!!funcao que adiciona ao utilizador o actualnivel que se encotra nos quizzes
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
function ConfIfUserIsRight(id, pointXp, game, level) {
    if (id === '3') {
        alert('Acertaste, vem ai o proximo nivel pa')
        assignXpToThePlayer(pointXp)
        setPlayedQuizzes(game)
        checkLevelProgress(level)
        let quizzPlaceHolder = document.querySelector('#quizzHolder')
        // Eleminate the previouse quizz
        quizzPlaceHolder.innerHTML = ''
        QuizzGenerator()
    } else {
        alert('Pff es pior que o benfica quando falhou o penta')
        // location.reload()//This is not right
        let quizzPlaceHolder = document.querySelector('#quizzHolder')
        // Eleminate the previouse quizz
        quizzPlaceHolder.innerHTML = ''
        location.href = '/HTML/continentQuizz.html'
    }
}


/**
 * !Function that make the level buttons 
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
 * Generate the levels buttons          
 * @param {array} playebleLevels level that the user can play
 */
function renderLevelButtons(playebleLevels, level) {
    let holder = document.querySelector('#levelButtonsHolder')
    holder.innerHTML = ""
    for (let i = 0; i < playebleLevels.length; i++) {
        holder.innerHTML += `<div class="col">
        <button type="button" class="btn btn-primary levelSelection" id="${playebleLevels[i]}">${playebleLevels[i]}</button></div>`
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
//     // ******************************************************************
//     actualLevel(id)
// }
























// *Working(main function)
/**
 * This Function generate the quizz
 */
function QuizzGenerator() {

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



    if (isCompleted(level)) {



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
            alert("Aquela")
        } else {
            actualLevel(level)
            let game = GenerateRandomGame()
            for (const quizz of quizzes) {
                if (quizz._id == game && quizz._continent.toUpperCase() == continentStyle.toUpperCase() && quizz._quizType == ChosenQuizz && quizz._level == level) {
                    document.querySelector('#questionHolder').innerHTML = quizz._question
                    console.log(quizz._pointXp)
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
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // else{
                //     QuizzGenerator()
                // } 
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
                        console.log(user._playedQuizzes[i])
                        console.log(toDelite[j])
                        if (user._playedQuizzes[i] == toDelite[j]) {
                            user._playedQuizzes.splice([i], 1)
                            break;
                        }
                    }
                }

            }
            // !!!!!!!!!!!!
        }

        // user._playedQuizzes = []
        localStorage.setItem('users', JSON.stringify(users))
        alert("Parabens subiste de nivel")
        actualLevel(level + 1)
    }

}









//function that validade if the user has already completed the quizz
function isCompleted(level) {
    if (level == 6) {
        return true
    }
    return false
}