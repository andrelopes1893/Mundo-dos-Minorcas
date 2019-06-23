import {
    quizzes
} from '../controler/adminQuizz.js'
export default class Question {
    constructor(quizType, continent, level = 1, question, answers = [], correctAnswer, pointXp, img, id = "undefine") {
        this._id = Question.getLastId(id) + 1
        this.quizType = quizType
        this.continent = continent
        this.level = level
        this.question = question
        this.answers = answers
        this.correctAnswer = correctAnswer
        this.pointXp = pointXp
        this.img = img
    }
    get id() {
        return this._id
    }
    static getLastId(id) {
        if (id == "undefine") {
            let id = 0
            if (quizzes.length > 0) {
                for (let quiz of quizzes) {
                    id = quiz._id
                }
            }
            return id
        } else {
            return id - 1
        }
    }

    get continent() {
        return this._continent
    }

    set continent(value) {
        this._continent = value
    }

    get quizType() {
        return this._quizType
    }

    set quizType(value) {
        this._quizType = value
    }

    get level() {
        return this._level
    }

    set level(value) {
        this._level = value
    }

    get question() {
        return this._question
    }

    set question(value) {
        this._question = value
    }

    get answers() {
        return this._answers
    }

    set answers(value) {
        this._answers = value
    }

    get correctAnswer() {
        return this._correctAnswer
    }

    set correctAnswer(value) {
        this._correctAnswer = value
    }

    get pointXp() {
        return this._pointXp
    }

    set pointXp(value) {
        this._pointXp = value
    }



    get img() {
        return this._img
    }

    set img(value) {
        this._img = value
    }

    static establishQuizQuestion(quizType) {
        if (quizType == 'Bandeiras') {
            return 'Qual é o país representado por esta bandeira?'
        } else if (quizType == 'Capitais') {
            return 'Qual é a capital deste país?'
        } else {
            return 'Qual destes países se localiza onde a imagem o mostra?'
        }
    }

    static xpByLevel(level) {
        switch (level) {
            case "1":
                return '5'
                break
            case "2":
                return '10'
                break
            case "3":
                return '15'
                break
            case "4":
                return '20'
                break
            case "5":
                return '25'
                break
        }
    }

    /**
     * Function that will check if the quiz already exists
     * @param {String} continent keeps that value of the continent
     * @param {String} category keeps the value of the category
     * @param {String} answer keeps the value of the answer
     */
    static ConfirmQuizExistence(continent, category, answer) {
        for (const quiz of quizzes) {
            if (quiz._continent == continent && quiz._quizType == category && quiz._correctAnswer == answer) {
                return true;
            }
        }
        return false;
    }

    static getCorrectAnswerById(correctAnswer) {
        let id = -1
        for (const quiz of quizzes) {
            if (quiz._id === correctAnswer) {
                id = quiz._correctAnswer
            }
        }
        return id
    }

    static continentFilter(quizA, quizB) {
        if (quizA._continent < quizB._continent) {
            return -1;
        }
        if (quizA._continent > quizB._continent) {
            return 1;
        }
        return 0;
    }

    static levelFilter(quizA, quizB) {
        if (quizA._level < quizB._level) {
            return 1;
        }
        if (quizA._level > quizB._level) {
            return -1;
        }
        return 0;
    }
}