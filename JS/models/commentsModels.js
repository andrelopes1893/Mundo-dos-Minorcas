export default class Comment {
    constructor(comment) {
        this._id = Comment.getLastId() + 1
        this._comment = comment
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