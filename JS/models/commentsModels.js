export default class Comment {
    constructor(comment, userId) {
        this._comment = comment
        this._dateTime = new Date().toLocaleString()
        this._userId = userId
    }

    get comment() {
        return this._comment
    }
    set comment(value) {
        if (value === '') {
            value = ''
        }
        this._comment = value
    }

    get dateTime(){
        return this._dateTime
    }

    set dateTime(value){
        this._dateTime = value
    }
}