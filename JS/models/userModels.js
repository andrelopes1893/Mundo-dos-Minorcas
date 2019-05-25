import {
    users
} from '../controler/loginAndSignup.js'

export default class User{
    constructor(username, password, email, avatar, accountType = 1, description = '', commentBlock = false, loginBlock = false, xp = 0, suggestions = [], unlockCountries = [], unlockAvatar = [] ){
        this._id = User.getLastId() + 1
        this.username = username
        this.password = password
        this.email = email
        this.avatar = avatar
        this.accountType = accountType
        this.description = description
        this.commentBlock = commentBlock
        this.loginBlock = loginBlock
        this.xp = xp
        this.suggestions = suggestions
        this.unlockCountries = unlockCountries
        this.unlockAvatar = unlockAvatar
    }

    get id() {
        return this._id
    }

    static getLastId() {
        let id = 0
        if (users.length > 0) {
            for (let prop of users) {
                id = prop.id
            }
        }
        return id
    }

    get username() {
        return this._username
    }

    set username(value){
        this._username = value
    }

    get password() {
        return this._password
    }

    set password(value){
        this._password = value
    }

    get email() {
        return this._email
    }

    set email(value){
        this._email = value
    }

    get avatar() {
        return this._avatar
    }

    set avatar(value){
        if(value === ''){
            value = '/Images/avatar.png'
        }
        
        this._avatar = value
    }

    get accountType() {
        return this._accountType
    }

    set accountType(value){
        this._accountType = value
    }

    get description() {
        return this._description
    }

    set description(value){
        if(value === ''){
            value = 'Escreva algo sobre ti'
        }

        this._description = value
    }

    get commentBlock() {
        return this._commentBlock
    }

    set commentBlock(value){
        this._commentBlock = value
    }

    get loginBlock() {
        return this._loginBlock
    }

    set loginBlock(value){
        this._loginBlock = value
    }

    get xp() {
        return this._xp
    }

    set xp(value){
        this._xp = value
    }

    get suggestions() {
        return this._suggestions
    }

    set suggestions(value){
        this._suggestions = value
    }

    get unlockCountries() {
        return this._unlockCountries
    }

    set unlockCountries(value){
        this._unlockCountries = value
    }

    get unlockAvatar() {
        return this._unlockAvatar
    }

    set unlockAvatar(value){
        this._unlockAvatar = value
    }

    static accessType(accountType){
        if (accountType) {
            return 'Administrador'
        }
        return 'Utilizador'
    }

    static removeUserById(id) {
        for (let i in users) {
            if (users[i].id === id) {
                users.splice(i, 1)
            }
        }
    }

    static getUsernameById(username) {
        let id = -1
        for (const prop of users) {
            if (prop.username.toLowerCase() === username.toLowerCase()) {
                id = prop.id
            }
        }
        return id
    }

    static getEmailById(email) {
        let id = -1
        for (const prop of users) {
            if(prop.email.toLowerCase() === email.toLowerCase()){
                id = prop.id
            }
        }
        return id
    }

    static getPasswordById(password){
        let id = -1
        for (const prop of users) {
            if(prop.password === password){
                id = prop.id
            }
        }
        return id
    }
}