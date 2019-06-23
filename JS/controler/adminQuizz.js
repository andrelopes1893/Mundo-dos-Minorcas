export let quizzes = []
import Question from '../models/quizzesModels.js'
import {
    signOut
} from '../controler/loginAndSignup.js'

/**
 * Function that will prevent hacking
 */
function confirmSystemHaker() {
    if (sessionStorage.getItem("loggedUserId") == null) {
        location.href = '/HTML/loginAndSigup.html'
    } else {
        let users = JSON.parse(localStorage.getItem("users"))
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        for (const user of users) {

            if (user._id == id) {
                if (user._accountType == 2) {
                    localStorage.removeItem('loggedUserId');
                    location.href = '/HTML/loginAndSigup.html'
                }
            }
        }
    }
}

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.getItem('quizzes')) {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
    }

    //Add CSS to the catalog filter
    $('.filterCatalog').css({
        'border': '1px solid #ffffff',
        'margin-left': '6rem',
        'color': '#ffffff',
        'font-weight': '500',
    });
    renderTable()
}

//Sign out
if (document.querySelector('#leaveAccount') != null) {
    document.querySelector('#leaveAccount').addEventListener('click', signOut)
}

let answers = []

/**
 * Form to create a quiz
 * @param {String} quizContinent return the value of the continent that was chosen
 * @param {String} quizCategory return the value of the category that was chosen
 * @param {String} level return the value of the level that was chosen
 * @param {String} txtWrongAnswer1 return the value of the wrong answer 1 that was written
 * @param {String} txtWrongAnswer2 return the value of the wrong answer 2 that was written
 * @param {String} txtWrongAnswer3 return the value of the wrong answer 3 that was written
 * @param {String} txtCorrectAnswer return the value of the correct answer that was written
 * @param {String} representationImg return the value of the image that was chosen
 */
if (document.getElementById('quizCreateForm') != null) {
    document.getElementById('quizCreateForm').addEventListener('submit', function (event) {
        let quizContinent = document.querySelector('#stlContinent').value
        let quizCategory = document.querySelector('#stlCategory').value
        let level = document.querySelector('#stlLevel').value
        let txtWrongAnswer1 = document.querySelector('#txtAnswerOptions1').value
        let txtWrongAnswer2 = document.querySelector('#txtAnswerOptions2').value
        let txtWrongAnswer3 = document.querySelector('#txtAnswerOptions3').value
        let txtCorrectAnswer = document.querySelector('#txtCorrectAnswer').value
        let representationImg = document.querySelector('#representationImg').value

        if (Question.ConfirmQuizExistence(quizContinent, quizCategory, txtCorrectAnswer)) {
            Swal.fire({
                type: 'error',
                title: 'Erro...',
                text: 'Esse quiz já existe!',
                padding: '1rem',
                background: '#CCCC33',
                confirmButtonColor: '#29ABE2'
            })
        } else {
            answers.push(txtWrongAnswer1, txtWrongAnswer2, txtWrongAnswer3, txtCorrectAnswer)
            quizzes.push(new Question(quizCategory, quizContinent, level, Question.establishQuizQuestion(quizCategory), answers, 3, Question.xpByLevel(level), representationImg))
            localStorage.setItem('quizzes', JSON.stringify(quizzes))
            answers = []
        }
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#29ABE2'
        });
        toast.fire({
            type: 'success',
            title: '<span style="color:#FFFFFF">Quiz criado com sucesso!<span>'
        })
        renderTable()
        $('#newLevel').modal('hide')
        event.preventDefault()
    })
}

//When filter button is pressed, the table renders
if (document.querySelector('.filterCatalog') != null) {
    document.querySelector('.filterCatalog').addEventListener('click', function () {
        renderTable()
    })
}

renderTable()

/**
 * Function tnat will render the table
 * @param {String} quizzes returns the quizzes set on the localStorage
 * @param {String} quizzOutput saves the data of the quizzes array
 */
function renderTable() {
    if (localStorage.getItem("quizzes")) {
        quizzes = JSON.parse(localStorage.getItem("quizzes"))
    }

    let quizzOutput = quizzes

    //Filters
    if (document.querySelector('#stlOrder') != null) {
        if (document.querySelector('#stlOrder').value == 'Continente') {
            quizzOutput.sort(Question.continentFilter)
        }
    }

    if (document.querySelector('#stlOrder') != null) {
        if (document.querySelector('#stlOrder').value == 'Nivel') {
            quizzOutput.sort(Question.levelFilter)
        }
    }
    //End of filters

    if (document.querySelector('#QuizzTableBody') != null) {
        document.querySelector('#QuizzTableBody').innerHTML = ''

        let r = 0

        //Render the table
        quizzOutput.forEach(quiz => {
            r++
            document.querySelector('#QuizzTableBody').innerHTML += `<tr>
                                        <th scope="row">${r}</th>
                                        <td> ${quiz._continent}</td>
                                        <td>${quiz._quizType}</td>
                                        <td>${quiz._level}</td>
                                        <td>${quiz._answers[3]}</td>
                                        <td><button type="button" id="${quiz._id}" data-toggle="modal" data-target="#removeQuizz" class="btn remove"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                       
                                    </tr>`
        });
    }
    removeButtons()
}

/**
 * Function that sets all the remove buttons
 */
function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeQuiz(this.id)
        })
    }
}

/**
 * Function that delete the quiz we want to delete
 * @param {String} quizzId returns the id of the specific quizz we want to delete
 */
function removeQuiz(quizzId) {
    document.querySelector('.yesButton').addEventListener('click', function () {
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i]._id == quizzId) {
                quizzes.splice(i, 1)
            }
        }
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#29ABE2'
        });
        toast.fire({
            type: 'success',
            title: '<span style="color:#FFFFFF">Quiz removido com sucesso!<span>'
        })
        localStorage.setItem('quizzes', JSON.stringify(quizzes))
        renderTable()
        $('#removeQuizz').modal('hide')
    })
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})