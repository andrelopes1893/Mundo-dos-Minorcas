export default class Question{
    constructor(level, description, level, responses = [], correctAnswer = 2, continent, pointXp){
        this._id = id
        this.level = level
        this.description = description
        this.level = level
        this.responses = responses
        this.continent = continent
        this.correctAnswer = correctAnswer
        this.pointXp = pointXp
    }

    get title() {
        return this._title
    }

    set title(title){
        this._title = title
    }

    get category() {
        return this._category
    }

    set category(category){
        this._category = category
    }

    get continent() {
        return this._continent
    }

    set continent(continent){
        this._continent = continent
    }

    get correctAnswer() {
        return this._correctAnswer
    }

    set correctAnswer(correctAnswer){
        this._correctAnswer = correctAnswer
    }
}