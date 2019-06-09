export default class Comment {
    constructor(comment, userId) {
        this._id = Comment.getLastId() + 1
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

    get id() {
        return this._id
    }

    get dateTime(){
        return this._dateTime
    }

    set dateTime(value){
        this._dateTime = value
    }

    static getLastId() {
        let id = 0
        if (comments.length > 0) {
            for (let comment of comments) {
                id = comment._id
            }
        }
        return id
    }
}