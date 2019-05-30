export let quizzes = []

import Question from '../models/quizzesModels.js'

window.onload = function () {
    if (localStorage.getItem('quizzes')) {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
    }
}
let answers = []

document.getElementById('quizCreateForm').addEventListener('submit', function (event) {
    let quizContinent = document.querySelector('#stlContinent').value
    let quizCategory = document.querySelector('#stlCategory').value
    let level = document.querySelector('#stlLevel').value
    let txtWrongAnswer1 = document.querySelector('#txtAnswerOptions1').value
    let txtWrongAnswer2 = document.querySelector('#txtAnswerOptions2').value
    let txtWrongAnswer3 = document.querySelector('#txtAnswerOptions3').value
    let txtCorrectAnswer = document.querySelector('#txtCorrectAnswer').value
    console.log(Question.ConfirmQuizExistence(quizContinent, quizCategory, txtCorrectAnswer))



    if (Question.ConfirmQuizExistence(quizContinent, quizCategory, txtCorrectAnswer)) {
        alert("O quiz já existente ")
    } else {
        answers.push(txtWrongAnswer1, txtWrongAnswer2, txtWrongAnswer3, txtCorrectAnswer)
        quizzes.push(new Question(quizCategory, quizContinent, level, Question.establishQuizQuestion(quizCategory), answers,4, Question.xpByLevel(level)))
        localStorage.setItem('quizzes', JSON.stringify(quizzes))
        answers = []
    }

    event.preventDefault()
})