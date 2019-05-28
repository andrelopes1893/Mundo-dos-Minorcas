import {
    countries
} from '../controler/adminCatalog.js'

export default class Country {
    constructor(name, capital, flag, language, continent,information ='',location = "",points=[], comments = [],visit=0) {
        this._id = Country.getLastId() + 1
        this.name = name
        this.continent = continent
        this.capital = capital
        this.language = language
        this.points = points
        this.flag = flag
        this.information = information
        this.location = location
        this.comments = comments
        this.visit=visit
    }

    get id() {
        return this._id
    }

    static getLastId() {
        let id = 0
        if (countries.length > 0) {
            for (let country of countries) {
                id = country._id
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

    get location() {
        return this._location
    }

    set location(value) {
        this._location = value
    }

    get comments() {
        return this._comments
    }

    set comments(value) {
        this._comments = value
    }
    get visit() {
        return this._visit
    }

    set visit(value) {
        this._visit = value
    }

    static getNameById(id) {        
        for (const country of countries) {                        
            if (country._id == id) {                
                return country._name
            }
        }
    }
}