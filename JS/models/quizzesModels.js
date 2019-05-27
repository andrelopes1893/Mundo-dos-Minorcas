export let quizzes=[]
 
export default class Question {
    constructor(quizType, continent, level = 1, question, answers = [],correctAnswer, pointXp) {
        this._id = Question.getLastId() + 1
        this.quizType = quizType
        this.continent = continent
        this.level = level
        this.question = question
        this.answers = answers
        this.correctAnswer = correctAnswer
        this.pointXp = pointXp
    }

    get id() {
        return this._id
    }

    static getLastId() {
        let id = 0
        if (quizzes.length > 0) {
            for (let prop of quizzes) {
                id = prop.id
            }
        }
        return id
        
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
            case 1:
                return '5'
                break
            case 2:
                return '10'
                break
            case 3:
                return '15'
                break
            case 4:
                return '20'
                break
            case 5:
                return '25'
                break
            case 6:
                return '30'
                break
            case 7:
                return '35'
                break
            case 8:
                return '40'
                break
            case 9:
                return '45'
                break
            case 10:
                return '50'
                break
        }
    }


// !This makes the quizze validation
    static ConfirmQuizExistence(continent,categoria,answear){
        for (const quizz of quizzes) {

            console.log(continent)
            console.log(categoria)
            console.log(answear)
             console.log(quizz._continent)
             console.log(quizz._quizType)
             console.log(quizz._correctAnswer)

            if(quizz._continent==continent && quizz._quizType==categoria && answear==quizz._correctAnswer){
                return true;
            }
        }
        return false;
    }




}