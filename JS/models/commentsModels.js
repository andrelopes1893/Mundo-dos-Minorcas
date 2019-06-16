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

    // Compara duas datas. Faz uma ordenação da data mais recente para o mais antigo
    static dateFromRecentToOld(a, b){
        if (a._dateTime < b._dateTime){
            return 1;
        }
        if (a._dateTime > b._dateTime){
            return -1;
        }
        return 0;
    }

    // Compara duas datas. Faz uma ordenação da data mais antigo para o mais recente
    static dateFromOldToRecent(a, b){
        if (a._dateTime < b._dateTime){
            return -1;
        }
        if (a._dateTime > b._dateTime){
            return 1;
        }
        return 0;
    }
}