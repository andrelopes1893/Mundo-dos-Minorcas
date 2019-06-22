import {
    suggestions
} from '../controler/profile.js'

export default class Suggestion {
    constructor(continent, country, capital, language, confirmed = false) {
        this._id = Suggestion.getLastId() + 1
        this.continent = continent
        this.country = country
        this.capital = capital
        this.language = language
        this.confirmed = confirmed
    }

    get id() {
        return this._id
    }
    static getLastId() {
        let lastId = 0
        if (suggestions.length != 0) {
            lastId = suggestions[suggestions.length - 1]._id            
        }
        return lastId
    }

    get continent() {
        return this._continent
    }
    set continent(value) {
        this._continent = value
    }

    get country() {
        return this._country
    }
    set country(value) {
        this._country = value
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
    set capital(value) {
        this._capital = value
    }

    get language() {
        return this._language
    }
    set language(value) {
        this._language = value
    }

    get confirmed() {
        return this._confirmed
    }
    set confirmed(value) {
        this._confirmed = value
    }
}