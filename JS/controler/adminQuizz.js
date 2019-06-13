export let quizzes = []

import Question from '../models/quizzesModels.js'

window.onload = function () {
    if (localStorage.getItem('quizzes')) {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
    }
}
let answers = []

if (document.getElementById('quizCreateForm') != null) {
    document.getElementById('quizCreateForm').addEventListener('submit', function (event) {
        let quizContinent = document.querySelector('#stlContinent').value
        let quizCategory = document.querySelector('#stlCategory').value
        let level = document.querySelector('#stlLevel').value
        let txtWrongAnswer1 = document.querySelector('#txtAnswerOptions1').value
        let txtWrongAnswer2 = document.querySelector('#txtAnswerOptions2').value
        let txtWrongAnswer3 = document.querySelector('#txtAnswerOptions3').value
        let txtCorrectAnswer = document.querySelector('#txtCorrectAnswer').value
        let representationImg= document.querySelector('#representationImg').value
    
    
    
        if (Question.ConfirmQuizExistence(quizContinent, quizCategory, txtCorrectAnswer)) {
            alert("O quiz já existente ")
        } else {
            answers.push(txtWrongAnswer1, txtWrongAnswer2, txtWrongAnswer3, txtCorrectAnswer)
            quizzes.push(new Question(quizCategory, quizContinent, level, Question.establishQuizQuestion(quizCategory), answers, 3, Question.xpByLevel(level),representationImg))
            localStorage.setItem('quizzes', JSON.stringify(quizzes))
            answers = []
        }
        renderTable()
        event.preventDefault()
    })
}


renderTable()
function renderTable() {

    if (localStorage.getItem("quizzes")) {
        quizzes= JSON.parse(localStorage.getItem("quizzes"))
    }
    let QuizzTableBody = document.querySelector('#QuizzTableBody')
    QuizzTableBody.innerHTML = ''
 

    let r = 0

    quizzes.forEach(quizze => {
        r++
        QuizzTableBody.innerHTML += `<tr>
                                        <th scope="row">${r}</th>
                                        <td> ${quizze._continent}</td>
                                        <td>${quizze._quizType}</td>
                                        <td>${quizze._level}</td>
                                        <td>${quizze._answers[3]}</td>
                                        <td><button type="button" id="${quizze._id}" data-toggle="modal" data-target="#removeQuizz" class="btn remove"><img src="/Images/x.png" alt="Eliminar"></button></td>
                                       
                                    </tr>`
    });
    removeButtons()
   
}



function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeUser(this.id)
        })
    }
}


function removeUser(quizzId) {
    document.querySelector('.yesButton').addEventListener('click', function () {
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i]._id == quizzId) {
                quizzes.splice(i, 1)
            }
        }
        localStorage.setItem('quizzes', JSON.stringify(quizzes))
        renderTable()
        $('#removeQuizz').modal('hide')
    })
}