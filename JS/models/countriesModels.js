export default class Country{
    constructor(name, continent, capital, language, tag, flag, informationOne, informationTwo, imageOne, imageTwo, imageThree, date){
        this.name = name
        this.continent = continent
        this.capital = capital
        this.language = language
        this.tag = tag
        this.points = []
        this.flag = flag
        this.informationOne = informationOne
        this.informationTwo = informationTwo
        this.imageOne = imageOne
        this.imageTwo = imageTwo
        this.imageThree = imageThree
        this.comments = []
        this.date = date
        this.status = true
    }

    get name() {
        return this._name
    }

    set name(name){
        this._name = name
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

    set language(language){
        this._language = language
    }

    get flag() {
        return this._flag
    }

    set flag(flag){
        this._flag = flag
    }

    get points() {
        return this._points
    }

    set points(points){
        this._points = points
    }

    get informationOne() {
        return this._informationOne
    }

    set informationOne(informationOne){
        this._informationOne = informationOne
    }

    get informationTwo() {
        return this._informationTwo
    }

    set informationTwo(informationTwo){
        this._informationTwo = informationTwo
    }

    get imageOne() {
        return this._imageOne
    }

    set imageOne(imageOne){
        this._imageOne = imageOne
    }

    get imageTwo() {
        return this._imageTwo
    }

    set imageTwo(imageTwo){
        this._imageTwo = imageTwo
    }

    get imageThree() {
        return this._imageThree
    }

    set imageThree(imageThree){
        this._imageThree = imageThree
    }

    get continent() {
        return this._continent
    }

    set continent(continent){
        this._continent = continent
    }

    get date() {
        return this._date
    }

    set date(date){
        this._date = date
    }
}