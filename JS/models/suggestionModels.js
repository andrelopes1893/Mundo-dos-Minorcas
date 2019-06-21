import {
    suggestions
} from '../controler/profile.js'

export default class Suggestion {
    constructor(continent, country, capital, language, confirmedAdmin = false, confirmedUser = false) {
        this._id = Suggestion.getLastId() + 1
        this.continent = continent
        this.country = country
        this.capital = capital
        this.language = language
        this.confirmedAdmin = confirmedAdmin
        this.confirmedUser = confirmedUser
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

    get confirmedAdmin() {
        return this._confirmedAdmin
    }
    set confirmedAdmin(value) {
        this._confirmedAdmin = value
    }

    get confirmedUser() {
        return this._confirmedUser
    }
    set confirmedUser(value) {
        this._confirmedUser = value
    }

    static getIdBySuggestion(id) {
        let asd = -1
        for (const suggestion of suggestions) {
            if (suggestion._id == id) {
                asd = suggestion._id
            }
        }
        return asd
    }
}