let quizzes = []
let continentStyle = ''
let ChosenQuizz = ''
window.onload = function () {
    //    Get the continet saves in the sessition Storege to get all quizzes from that continet
    if (sessionStorage.getItem('continentStyle')) {
        continentStyle = JSON.parse(sessionStorage.getItem('continentStyle'))
    } else {
        // !Para eliminar
        continentStyle = 'africa'
        // !Para eliminar
        sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    }
    // Get the type of quizzes that the user whant to play from the sessionStorage
    if (sessionStorage.getItem('ChosenQuizz')) {
        ChosenQuizz = JSON.parse(sessionStorage.getItem('ChosenQuizz'))
    } else {

        
        ChosenQuizz = 'Bandeiras'
        // !Para eliminar
        sessionStorage.setItem('ChosenQuizz', JSON.stringify(ChosenQuizz))
    }

    //  Get the existent quizzes from the localStorage
    if (localStorage.getItem('quizzes')) {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
    }
}

QuizzGenerator()


// !What do I need Is to get a random Quizz from the Local Storage !!!!!!!!!!!!!!!! Easy 
//!The hard Part is to get the elements that i need From the quizz and passed to the quizz area !!!!!!!!Fuck
/**
 * This Fuction from the Quizzes
 */
function QuizzGenerator() {


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

        ChosenQuizz = 'Bandeiras'
        // !Para eliminar
        sessionStorage.setItem('ChosenQuizz', JSON.stringify(ChosenQuizz))
    }

    // Get the place where the quizzes are going to be generated
    let quizzPlaceHolder = document.querySelector('#quizzHolder')

    // Eleminate the previouse quizz
    quizzPlaceHolder.innerHTML=''

    //Array that will prevent the generation of the same number
    let generatedNumbers = []

    // This is a number (id)
    let game = GenerateRandomGame()

    for (const quizz of quizzes) {
        if (quizz._id == game && quizz._continent.toUpperCase() == continentStyle.toUpperCase() && quizz._quizType == ChosenQuizz) {
            document.querySelector('questionHolder').innerHTML=quizz._question  
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
                        continue;
                    }
                }
            }
            isTheAnswearRight()
        } else {
            QuizzGenerator()
        }
    }
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
function isTheAnswearRight() {
    let options = document.querySelectorAll('.optionsButton')
    for (const option of options) {
        option.addEventListener('click', function () {
            ConfIfUserIsRight(this.id)
        })
    }
}
// !Confirm if the answear is right
function ConfIfUserIsRight(id){
    if (id==='3'){
        alert('Acertaste, vem ai o proximo nivel pa')
        QuizzGenerator()
    }
    else{
        alert('Pff es pior que o benfica quando falhou o penta')
        // location.reload()//This is not right
        location.href = '/HTML/continentQuizz.html'
    }
}