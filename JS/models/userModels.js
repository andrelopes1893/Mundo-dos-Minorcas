 import {
     users
 } from '../models/main.js'

 export default class User {
     constructor(username, password, email, accountType = '1', avatar = '', description = '', id = "undefine", loginBlock = false, xp = 0, unlockCountries = [], country, rating = [], currentLevels = [], playedQuizzes = []) {
         this._id = User.getLastId(id) + 1
         this.username = username
         this.password = password
         this.email = email
         this.accountType = accountType
         this.avatar = avatar
         this.description = description
         this.loginBlock = loginBlock
         this.xp = xp
         this.unlockCountries = unlockCountries
         this.country = country
         this._rating = rating
         this.currentLevels = currentLevels
         this.playedQuizzes = playedQuizzes
     }
     get id() {
         return this._id
     }
     static getLastId(id) {

         if (id == "undefine") {
             let lastId = 0
             if (users.length != 0) {
                 lastId = users[users.length - 1]._id
             }
             return lastId
         } else {
             return id - 1
         }
     }

     get username() {
         return this._username
     }
     set username(value) {
         this._username = value
     }

     get password() {
         return this._password
     }
     set password(value) {
         this._password = value
     }

     get email() {
         return this._email
     }
     set email(value) {
         this._email = value
     }

     get avatar() {
         return this._avatar
     }
     set avatar(value) {
         if (value == '') {
             value = '../../Images/BoyAvatars/Avatar Principiante 1.png'
         }
         this._avatar = value
     }

     get accountType() {
         return this._accountType
     }
     set accountType(value) {
         this._accountType = value
     }

     get description() {
         return this._description
     }
     set description(value) {
         if (value === '') {
             value = 'Escreve algo sobre ti'
         }

         this._description = value
     }

     get loginBlock() {
         return this._loginBlock
     }
     set loginBlock(value) {
         this._loginBlock = value
     }

     get xp() {
         return this._xp
     }
     set xp(value) {
         this._xp = value
     }

     get unlockCountries() {
         return this._unlockCountries
     }
     set unlockCountries(value) {
         this._unlockCountries = value
     }

     get country() {
         return this._country
     }
     set country(value) {
         this._country = value
     }

     get rating() {
         return this._rating
     }
     set rating(value) {
         this._rating = value
     }
     get currentLevels() {
         return this._currentLevels
     }
     set currentLevels(value) {
         this._currentLevels = value
     }
     get playedQuizzes() {
         return this._playedQuizzes
     }
     set playedQuizzes(value) {
         this._playedQuizzes = value
     }

     static accessType(accountType) {
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

     static getIdByUsername(username) {
         let id = -1
         for (const user of users) {
             if (user._username.toLowerCase() == username.toLowerCase()) {
                 id = user._id
             }
         }
         return id
     }

     static getIdByEmail(email) {
         let id = -1
         for (const user of users) {
             if (user._email.toLowerCase() == email.toLowerCase()) {
                 id = user._id
             }
         }
         return id
     }

     static getIdByPassword(password) {
         let id = -1
         for (const user of users) {
             if (user._password == password) {
                 id = user._id
             }
         }
         return id
     }

     static loginVerifyById(password, email) {
         let id = -1
         for (const user of users) {
             if (user._password == password && user._email == email) {
                 id = user._id
             }
         }
         return id
     }

     static checkLoginBlocked(email) {
         for (const user of users) {
             if (user._email === email && user._loginBlock == true) {
                 return true
             }
         }
         return false
     }

     static confirmUserExistent(email, password) {
         for (const user of users) {
             if (user._email == email && user._password == password) {
                 return true
             }
         }
         return false
     }

     static getIdByBlockUser(userId) {
         for (const user of users) {
             if (user._id === userId) {
                 return user._loginBlock
             }
         }
     }

     static getAvatarByXP() {
         for (const user of users) {
             if (user._xp <= 15) {
                 user._avatar = '/Images/BoyAvatars/Avatar Principiante 1.png'
             } else if (user._xp > 15 && user._xp <= 30) {
                 user._avatar = '/Images/BoyAvatars/Avatar Principiante 2.png'
             } else if (user._xp > 15 && user._xp <= 30) {
                 user._avatar = '/Images/BoyAvatars/Avatar Principiante 3.png'
             } else if (user._xp > 30 && user._xp <= 45) {
                 user._avatar = '/Images/BoyAvatars/Avatar Principiante 4.png'
             } else if (user._xp > 45 && user._xp <= 60) {
                 user._avatar = '/Images/BoyAvatars/Avatar Amador 1.png'
             } else if (user._xp > 60 && user._xp <= 75) {
                 user._avatar = '/Images/BoyAvatars/Avatar Amador 2.png'
             } else if (user._xp > 75 && user._xp <= 90) {
                 user._avatar = '/Images/BoyAvatars/Avatar Amador 3.png'
             } else if (user._xp > 90 && user._xp <= 105) {
                 user._avatar = '/Images/BoyAvatars/Avatar Amador 4.png'
             } else if (user._xp > 105 && user._xp <= 120) {
                 user._avatar = '/Images/BoyAvatars/Avatar Profissional 1.png'
             } else if (user._xp > 120 && user._xp <= 135) {
                 user._avatar = '/Images/BoyAvatars/Avatar Profissional 2.png'
             } else if (user._xp > 135 && user._xp <= 150) {
                 user._avatar = '/Images/BoyAvatars/Avatar Profissional 3.png'
             } else if (user._xp > 150 && user._xp <= 165) {
                 user._avatar = '/Images/BoyAvatars/Avatar Profissional 4.png'
             } else if (user._xp > 165 && user._xp <= 180) {
                 user._avatar = '/Images/BoyAvatars/Avatar Experiente 1.png'
             } else if (user._xp > 180 && user._xp <= 195) {
                 user._avatar = '/Images/BoyAvatars/Avatar Experiente 2.png'
             } else if (user._xp > 195 && user._xp <= 210) {
                 user._avatar = '/Images/BoyAvatars/Avatar Experiente 3.png'
             } else {
                 user._avatar = '/Images/BoyAvatars/Avatar Experiente 4.png'
             }
         }
     }

     static mostXpFilter(userA, userB) {
         if (userA._xp < userB._xp) {
             return 1;
         }
         if (userA._xp > userB._xp) {
             return -1;
         }
         return 0;
     }

     static alphabeticOrder(userA, userB) {
         if (userA._username.toLowerCase() < userB._username.toLowerCase()) {
             return -1;
         }
         if (userA._username.toLowerCase() > userB._username.toLowerCase()) {
             return 1;
         }
         return 0;
     }
 }