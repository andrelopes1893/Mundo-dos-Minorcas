export default class Quiz{
    constructor(title, category, continent, correctAnswer){
        this.title = title
        this.category = category
        this.continent = continent
        this.correctAnswer = correctAnswer
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