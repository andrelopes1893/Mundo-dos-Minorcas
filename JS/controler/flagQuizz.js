let quizzes = []
let continentStyle = ''
let ChosenQuizz = ''




QuizzGenerator()














//!!!!!funcao que adiciona ao utilizador o actualnivel que se encotra nos quizzes
function actualLevel(level){
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
        if(user._id==loggedUserId){
            let quizzState ={
                continent: continentStyle,
                quizzTitle: ChosenQuizz,
                level: level
            }
            user._currentLevels.push(quizzState)
            break;
        }
    }
    alert("danger")
}



// !Generate a random number
function GenerateRandomNumb() {
    let random = Math.floor(Math.random() * 4) + 1;
    return random
}
//! This function Gives back an random "Id", id that will be the id of the quizz
function GenerateRandomGame() {
    let maxNumber = quizzes.length
    let game = Math.floor(Math.random() * maxNumber) + 1;
    return game;
}

//!This Fuction Looks if the has already number existes
function answearAddExistence(arrayAnswears, randomNumber) {
    for (const answear of arrayAnswears) {
        if (answear == randomNumber) {
            return true
        }
    }
    return false;
}

// !This fuctin get all the buttons with the options and add an event That will Check if the choosen answear is the right one
function isTheAnswearRight(pointXp) {
    let options = document.querySelectorAll('.optionsButton')
    for (const option of options) {
        option.addEventListener('click', function () {
            ConfIfUserIsRight(this.id,pointXp)
        })
    }
}
// !Confirm if the answear is right
function ConfIfUserIsRight(id,pointXp) {
    if (id === '3') {
        alert('Acertaste, vem ai o proximo nivel pa')
        assignXpToThePlayer(pointXp)
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

// !This Function confirm if the user xp let him play de quizz
/**
 * This function see witch levels the player is able to play
 * @param {String} continentStyle The continent quizz that we choose
 */
function unlockedLevels(continentStyle) {
    let playebleLevels = []
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }
    if(continentStyle=== 'africa'){
        for (const user of users) {
            if (user._id == loggedUserId) {
    
                if (user._xp <= 50) {
                    playebleLevels.push(1)
                }
                if (user._xp > 50 && user._xp <= 100) {
                    playebleLevels.push(2)
                }
                if (user._xp > 100 && user._xp <= 150) {
                    playebleLevels.push(3)
                }
                if (user._xp > 150 && user._xp <= 200) {
                    playebleLevels.push(4)
                }
                if (user._xp > 200 && user._xp <= 250) {
                    playebleLevels.push(5)
                }
                renderLevelButtons(playebleLevels)
                return playebleLevels
            }
        }
    }
    if(continentStyle=== 'america'){
        for (const user of users) {
            if (user._id == loggedUserId) {
    
                if (user._xp > 250 && user._xp<300) {
                    playebleLevels.push(1)
                }
                if (user._xp > 300 && user._xp <= 350) {
                    playebleLevels.push(2)
                }
                if (user._xp > 350 && user._xp <= 400) {
                    playebleLevels.push(3)
                }
                if (user._xp > 400 && user._xp <= 450) {
                    playebleLevels.push(4)
                }
                if (user._xp > 450 && user._xp <= 500) {
                    playebleLevels.push(5)
                }
                renderLevelButtons(playebleLevels)
                return playebleLevels
            }
        }
    }
    if(continentStyle=== 'europa'){
        for (const user of users) {
            if (user._id == loggedUserId) {
    
                if (user._xp > 500 && user._xp <= 550) {
                    playebleLevels.push(1)
                }
    
                if (user._xp > 550 && user._xp <= 600) {
                    playebleLevels.push(2)
                }
                if (user._xp > 600&& user._xp <= 650) {
                    playebleLevels.push(3)
                }
                if (user._xp > 650 && user._xp <= 700) {
                    playebleLevels.push(4)
                }
                if (user._xp > 700 && user._xp <= 750) {
                    playebleLevels.push(5)
                }
                renderLevelButtons(playebleLevels)
                return playebleLevels
            }
        }
    }
    if(continentStyle=== 'asia'){
        for (const user of users) {
            if (user._id == loggedUserId) {
    
                if (user._xp > 750 && user._xp <= 800) {
                    playebleLevels.push(1)
                }
    
                if (user._xp > 800 && user._xp <= 850) {
                    playebleLevels.push(2)
                }
                if (user._xp > 850  && user._xp <= 900) {
                    playebleLevels.push(3)
                }
                if (user._xp > 900 && user._xp <= 950) {
                    playebleLevels.push(4)
                }
                if (user._xp > 1000 && user._xp <= 1050) {
                    playebleLevels.push(5)
                }
                renderLevelButtons(playebleLevels)
                return playebleLevels
            }
        }
    }
    if(continentStyle=== 'oceania'){
        for (const user of users) {
            if (user._id == loggedUserId) {
    
                if (user._xp > 1050 && user._xp <= 1100) {
                    playebleLevels.push(1)
                }
    
                if (user._xp > 1100 && user._xp <= 1150) {
                    playebleLevels.push(2)
                }
                if (user._xp > 1150 && user._xp <= 1200) {
                    playebleLevels.push(3)
                }
                if (user._xp > 1200 && user._xp <= 1250) {
                    playebleLevels.push(4)
                }
                if (user._xp > 1300 && user._xp <= 1350) {
                    playebleLevels.push(5)
                }
                renderLevelButtons(playebleLevels)
                return playebleLevels
            }
        }
    }   
}
/**
 * Generate the levels buttons          
 * @param {array} playebleLevels level that the user can play
 */
function renderLevelButtons(playebleLevels){
    let holder= document.querySelector('#levelButtonsHolder')
    holder.innerHTML=""
    for(let i = 0;i < playebleLevels.length; i++){
        holder.innerHTML+=`<div class="col">
        <button type="button" class="btn btn-primary" id="${playebleLevels[i]}">${playebleLevels[i]}</button></div>`
    }
    selectLevel()
}

function selectLevel(){
    let btns = document.querySelectorAll(".btn btn-primary")
    for (const btn of btns) {

        btn.addEventListener("click",function(){
            ChosenLevel(this.id)
        })   
    }
}
function ChosenLevel(id){
    // ******************************************************************
    actualLevel(id)
}
   











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

    

    let levels = unlockedLevels(continentStyle)
    let level = levels[0]

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
    let timesInsideQuizzes=0;

    // This is a number (id)
    let game = GenerateRandomGame()
    for (const quizz of quizzes) {
        if (quizz._id == game && quizz._continent.toUpperCase() == continentStyle.toUpperCase() && quizz._quizType == ChosenQuizz && quizz._level == level ) {
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
            isTheAnswearRight(quizz._pointXp)
            break;
        }
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // else{
        //     QuizzGenerator()
        // } 
        timesInsideQuizzes ++;
        if(timesInsideQuizzes==quizzes.length){
            QuizzGenerator()
        }
    }
}
// !!!!!!!!!!!!!!!!!!Para continuar!!!!!!!!!!!!!!!!!!!!
/**
 * This function validate if the quizz has already been played by the user
 * @param {string} id this is the id of the current quizz
 */
function alreadyPlayed(id) {

    let playedQuizzes = []

    if (localStorage.getItem('playedQuizzes')) {
        playedQuizzes = JSON.parse(localStorage.getItem('playedQuizzes'))
    }
    for (const playedQuizz of playedQuizzes) {

        if (playedQuizz == id) {
            return true;
        }
    }
    return false;
}

/**
 * Give Xp To the user that get the answears right
 * @param {number} xp quantity of Xps that the user will gain
 */
function assignXpToThePlayer(xp){
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    if (sessionStorage.getItem('loggedUserId')) {
        loggedUserId = JSON.parse(sessionStorage.getItem('loggedUserId'))

    } else {
        loggedUserId = 2
    }
    for (const user of users) {
        if(user._id==loggedUserId){
            user._xp+=  Number(xp)
            localStorage.setItem("users", JSON.stringify(users))
        }
    }
}
// !Falta
//*fazer com que o mesmo quizz nao seja generado 
//Pop up a dizer a criança que esta errada
//Fornecer Xp                