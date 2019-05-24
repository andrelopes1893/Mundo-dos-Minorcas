import {
    countries
} from '../controler/adminCatalog.js'

export default class Country {
    constructor(name, capital, language, continent, images = [], points = [], information = [], flag, comments = [], date) {
        this._id = Country.getLastId() + 1
        this.name = name
        this.continent = continent
        this.capital = capital
        this.language = language
        this.points = points
        this.flag = flag
        this.information = information
        this.images = images
        this.comments = comments
        this.date = date
    }

    get id() {
        return this._id
    }

    static getLastId() {
        let id = 0
        if (countries.length > 0) {
            for (let prop of countries) {
                id = prop.id
            }
        }
        return id
    }

    get name() {
        return this._name
    }

    set name(value) {
        this._name = value
    }

    get continent() {
        return this._continent
    }

    set continent(value) {
        this._continent = value
    }

    get capital() {
        return this._capital
    }

    set capital(capital) {
        this._capital = capital
    }

    get language() {
        return this._language
    }

    set language(value) {
        this._language = value
    }

    get flag() {
        return this._flag
    }

    set flag(value) {
        this._flag = value
    }

    get points() {
        return this._points
    }

    set points(value) {
        this._points = value
    }

    get information() {
        return this._information
    }

    set information(value) {
        this._information = value
    }

    get image() {
        return this._image
    }

    set image(value) {
        this._image = value
    }

    get comments() {
        return this._comments
    }

    set comments(value) {
        this._comments = value
    }

    get date() {
        return this._date
    }

    set date(value) {
        this._date = value
    }    

    static getNameById(id) {        
        for (const prop of countries) {                        
            if (prop.id == id) {                
                return prop.name
            }
        }
    }
}