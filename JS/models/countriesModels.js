export default class Country{
    constructor(name, capital, language, continent, informationOne, informationTwo, imageOne, imageTwo, imageThree, tag = [], points = [], flag,  comments = [], date){
        this.name = name
        this.continent = continent
        this.capital = capital
        this.language = language
        this.tag = tag
        this.points = points
        this.flag = flag
        this.informationOne = informationOne
        this.informationTwo = informationTwo
        this.imageOne = imageOne
        this.imageTwo = imageTwo
        this.imageThree = imageThree
        this.comments = comments
        this.date = date
    }

    get id() {
        return this._id
    }

    static getLastId() {
        let id = 0
        if (countries.length > 0) {
            for (let i in countries) {
                id = countries[i].id
            }
        }
        return id
    }

    get name() {
        return this._name
    }

    set name(value){
        this._name = value
    }

    get continent() {
        return this._continent
    }

    set continent(value){
        this._continent = value
    }

    get capital() {
        return this._capital
    }

    set capital(capital){
        this._capital = capital
    }

    get language() {
        return this._language
    }

    set language(value){
        this._language = value
    }

    get flag() {
        return this._flag
    }

    set flag(value){
        this._flag = value
    }

    get tag() {
        return this._tag
    }

    set tag(value){
        this._tag = value
    }

    get points() {
        return this._points
    }

    set points(value){
        this._points = value
    }

    get informationOne() {
        return this._informationOne
    }

    set informationOne(value){
        this._informationOne = value
    }

    get informationTwo() {
        return this._informationTwo
    }

    set informationTwo(value){
        this._informationTwo = value
    }

    get imageOne() {
        return this._imageOne
    }

    set imageOne(value){
        this._imageOne = value
    }

    get imageTwo() {
        return this._imageTwo
    }

    set imageTwo(value){
        this._imageTwo = value
    }

    get imageThree() {
        return this._imageThree
    }

    set imageThree(value){
        this._imageThree = value
    }

    get comments() {
        return this._comments
    }

    set comments(value){
        this._comments = value
    }

    get date() {
        return this._date
    }

    set date(value){
        this._date = value
    }

    
}