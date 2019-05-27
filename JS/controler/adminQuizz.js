import {
    quizzes
} from '../models/quizzesModels.js'

import Question from '../models/quizzesModels.js'

if (localStorage.getItem('quizzes')) {
    quizzes = JSON.parse(localStorage.getItem('quizzes'))
}

document.querySelector('#quizCreateForm').addEventListener('submit', function (event) {
    let quizContinent = document.querySelector('#stlContinent').value
    let quizCategory = document.querySelector('#stlCategory').value
    let level = document.querySelector('#stlLevel').value
    let txtWrongAnswer1 = document.querySelector('#txtAnswerOptions1').value
    let txtWrongAnswer2 = document.querySelector('#txtAnswerOptions2').value
    let txtWrongAnswer3 = document.querySelector('#txtAnswerOptions3').value
    let txtCorrectAnswer = document.querySelector('#txtCorrectAnswer').value

 

    // let exist = false

    // if (condition) {

    // }

    if (Question.ConfirmQuizExistence(quizContinent,quizCategory,txtCorrectAnswer)){
        alert("quizz já existente ")
    }
    else{    quizzes.push(new Question(quizCategory, quizContinent, level, Question.establishQuizQuestion(quizCategory) , txtCorrectAnswer, Question.xpByLevel(level)))
        localStorage.setItem('quizzes', JSON.stringify(quizzes))
    }
       
 





    



    // for (const quiz of quizzes) {
    //     console.log(quizzes);

    //     if (quiz.continent.toLowerCase() == quizContinent.toLowerCase() &&
    //         quiz.quizType.toLowerCase() == quizCategory.toLowerCase() &&
    //         quiz.correctAnswer.toLowerCase() == txtCorrectAnswer.toLowerCase()) {
    //         alert('Ja existe um quizz')
    //     } else {
    //         quizzes.push(new Question(Question.establishQuizQuestion(quizCategory), quizContinent, level, txtWrongAnswer1, txtWrongAnswer2, txtWrongAnswer3, txtCorrectAnswer))
    //         localStorage.setItem('quizzes', JSON.stringify(quizzes))
    //     }
    // }

    event.preventDefault()
})