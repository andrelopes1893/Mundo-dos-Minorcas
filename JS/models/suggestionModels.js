let suggestions = []

class Suggestion {
    constructor(continent, country, capital, language, confirmed = false) {
        this._id = Suggestion.getLastId() + 1
        this._continent = continent
        this._country = country
        this._capital = capital
        this._language = language
        this._confirmed = confirmed
    }

    get id() {
        return this._id
    }
    static getLastId() {
        let lastId = 0
        if (users.length != 0) {
            lastId = users[users.length - 1]._id
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
        return this._capital
    }
    set language(value) {
        this._language = value
    }

    get confirmed() {
        return this._language
    }
    set confirmed(value) {
        this._confirmed = value
    }
}