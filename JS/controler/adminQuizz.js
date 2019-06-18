export let quizzes = []

import Question from '../models/quizzesModels.js'

window.onload = function () {
    if (localStorage.getItem('quizzes')) {
        quizzes = JSON.parse(localStorage.getItem('quizzes'))
    }

    $('.filterCatalog').css({
        'border': '1px solid #ffffff',
        'margin-left': '6rem',
        'color': '#ffffff',
        'font-weight': '500',
    });

    renderTable()
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

if (document.querySelector('.filterCatalog') != null) {
    document.querySelector('.filterCatalog').addEventListener('click', function () {
        renderTable()
    })
}


renderTable()

function renderTable() {

    if (localStorage.getItem("quizzes")) {
        quizzes = JSON.parse(localStorage.getItem("quizzes"))
    }

    if (document.querySelector('#stlOrder') != null) {
        if (document.querySelector('#stlOrder').value == 'Continente') {
            quizzes.sort(Question.continentFilter)
        }
    }

    if (document.querySelector('#stlOrder') != null) {
        if (document.querySelector('#stlOrder').value == '') {
            quizzes.sort(Question.levelFilter)
        }
    }

    if (document.querySelector('#QuizzTableBody') != null) {
        document.querySelector('#QuizzTableBody').innerHTML = ''

        let r = 0

        quizzes.forEach(quiz => {
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

function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeQuiz(this.id)
        })
    }
}

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