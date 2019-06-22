import {
    countries
} from '../controler/adminCatalog.js'

export default class Country {
    constructor(name, capital, flag, language, continent, level, information = '', location = "", id = "undefine", points = [], comments = [], visit = 0) {
        this._id = Country.getLastId(id) + 1
        this.name = name
        this.continent = continent
        this.capital = capital
        this.language = language
        this.points = points
        this.flag = flag
        this.information = information
        this.location = location
        this.comments = comments
        this.visit = visit
        this.level = level
    }
    get id() {
        return this._id
    }
    static getLastId(id) {

        if (id == "undefine") {
            let id = 0
            if (countries.length > 0) {
                for (let country of countries) {
                    id = country._id
                }
            }
            return id
        } else {
            return id - 1
        }

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

    get level() {
        return this._level
    }
    set level(value) {
        this._level = value
    }

    static getNameById(id) {
        for (const country of countries) {
            if (country._id == id) {
                return country._name
            }
        }
    }

    // Compara dois paises pelo seu nome. Faz uma ordenação alfabética crescente.
    static ascendentAlphabeticOrder(countryA, countryB) {
        if (countryA._name < countryB._name) {
            return -1;
        }
        if (countryA._name > countryB._name) {
            return 1;
        }
        return 0;
    }

    // Compara dois paises pelo seu nome. Faz uma ordenação alfabética decrescente.
    static descendentAlphabeticOrder(countryA, countryB) {
        if (countryA._name < countryB._name) {
            return 1;
        }
        if (countryA._name > countryB._name) {
            return -1;
        }
        return 0;
    }

    // Compara dois paises pelo seu nome. Faz uma ordenação alfabética crescente por continente.
    static ascendentContinentOrder(continentA, continentB) {
        if (continentA._continent < continentB._continent) {
            return -1;
        }
        if (continentA._continent > continentB._continent) {
            return 1;
        }
        return 0;
    }

    // Compara dois paises pelo seu nome. Faz uma ordenação alfabética decrescente por continente..
    static descendentContinentOrder(continentA, continentB) {
        if (continentA._continent < continentB._continent) {
            return 1;
        }
        if (continentA._continent > continentB._continent) {
            return -1;
        }
        return 0;
    }


    static sortByMostVisited(countryA, countryB) {
        if (countryA._visit < countryB._visit) {
            return 1;
        }
        if (countryA._visit > countryB._visit) {
            return -1;
        }
        return 0;
    }
}