import Country from "../models/countriesModels.js"
import Comment from '../models/commentsModels.js'
import {
    signOut
} from '../controler/loginAndSignup.js'

let countries = []
let users = []
let currentCountry

window.onload = function () {
    confirmSystemHaker()

    if (localStorage.getItem("countries")) {
        countries = JSON.parse(localStorage.getItem("countries"))
    }

    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }

    let countryId = ""
    if (sessionStorage.getItem("id")) {
        countryId = JSON.parse(sessionStorage.getItem('id'))
    }

    for (const country of countries) {
        if (country._id == countryId) {
            ratingButtons()
            document.querySelector('.stars').setAttribute('data-rating', country._points.points);
        }
    }
}

//This array gets the countries from an specific continent
let continentCountrys = []

/**
 * Function that gives back the card levels that the user have unlocked based on xp (obs: if it gives back 4 the user can see cards information from levels 1,2,3,4)
 * @param {Number} id returns the logged user id that is set on the sessionStorage
 * @param {Number} value represents the country level, from 1 to 5
 */
//
function renderCatalogByXP() {
    let value = 0
    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }
    for (const user of users) {
        if (user._id == id) {
            if (user._xp >= 0 && user._xp <= 240) {
                value = 1
            } else if (user._xp > 240 && user._xp <= 480) {
                value = 2
            } else if (user._xp > 480 && user._xp <= 720) {
                value = 3
            } else if (user._xp > 720 && user._xp <= 960) {
                value = 4
            } else {
                value = 5
            }
        }
    }
    return value
}

/**
 * Function that gives back the card levels that the user have unlocked based on xp (obs: if it gives back 4 the user can see cards information from levels 1,2,3,4)
 * @param {Number} id returns the logged user id that is set on the sessionStorage
 * @param {String} countries returns the countries that are set on the localStorage
 * @param {String} users returns the users that are set on the localStorage
 * @param {String} continentCatalogStyle returns the continent catalog style that will be set in the sessionStorage
 */
motherFunction()
//Since that windows on load wasn't working we based on this function to do all the work when the window loading
function motherFunction() {
    if (localStorage.getItem("countries")) {
        countries = JSON.parse(localStorage.getItem("countries"))
    }

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }

    //page is the page that you are in the countries, the main "job" is to help with the pagination
    if (localStorage.getItem('page')) {
        localStorage.removeItem('page')
    }

    continentCountriesFill()
    renderCatalog()
    ConstructPaginationButton()
    renderModalInfo()
    userData()
    if (sessionStorage.getItem('continentCatalogStyle')) {
        continentCatalogStyle = sessionStorage.getItem('continentCatalogStyle')
    }
}


searchCountry()

//Filter Button
if (document.querySelector("#btnFilter") != null) {
    document.querySelector("#btnFilter").addEventListener("click", function (event) {
        renderCatalog()
        renderModalInfo()
        event.preventDefault()
    })
}

/**
 * Function that render the catalog
 * @param {Number} quantity the position that stops getting elements from the array to render. And the value -> 16 = to the the position where it starts
 */
function renderCatalog(quantity = 16) {

    //Filters
    if (document.querySelector('#stlGenre')) {
        if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Crescente") {
            sortCountriesAscendent()
        }

        if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Decrescente") {
            sortCountriesDescendent()
        }

        if (document.querySelector('#stlGenre').value == 'ordenarPorVisitas') {
            sortCountriesByVisit()
        }
    }


    if (quantity == 'prev' || quantity == 'next') {
        let value = 16;
        if (quantity == 'prev') {
            if (JSON.parse(localStorage.getItem('page'))) {
                if (JSON.parse(localStorage.getItem('page')) == 16) {
                    value = 0
                    const toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#29ABE2'
                    });
                    toast.fire({
                        type: 'info',
                        title: '<span style="color:#FFFFFF">Já estás na primeira página<span>'
                    })

                }
                quantity = Number(JSON.parse(localStorage.getItem('page'))) - value

            } else {
                quantity = 16
            }
            localStorage.setItem('page', JSON.stringify(quantity))
        } else {
            if (JSON.parse(localStorage.getItem('page'))) {
                if (JSON.parse(localStorage.getItem('page')) >= continentCountrys.length) {
                    value = 0
                    const toast = Swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#29ABE2'
                    });
                    toast.fire({
                        type: 'info',
                        title: '<span style="color:#FFFFFF">Já estás na última página<span>'
                    })
                }
                quantity = Number(JSON.parse(localStorage.getItem('page'))) + value
            } else {
                quantity = 32

                if (continentCountrys[32 - 16] == null) {
                    quantity = 32 - 16

                }
            }
            localStorage.setItem('page', JSON.stringify(quantity))
        }
    }

    let result = ""
    let i = 0

    let value = renderCatalogByXP()

    if (continentCountrys.length > 0) {
        for (let j = Number(quantity) - 16; j < Number(quantity); j++) {
            if (i % 4 === 0) {
                result += `<div class="row">`
            }
            if (continentCountrys[j]._level <= value) {
                result += `<div class="col-lg-3 col-sm-6 col-xs-12" id="countriesCol">
                            <div class="card africanCards">
                            <button type="button" id="${continentCountrys[j]._id}" class="btn countryButton" data-toggle="modal" data-target="#countryModal">
                                <img src="${continentCountrys[j]._flag}" class="card-img-top" alt="Brasil">
                            </button>
                                <div class="card-body" id="${continentCountrys[j]._id}">
                                    <p class="card-text paragraph">NOME: <span>${continentCountrys[j]._name}</span> </p>
                                    <p class="card-text paragraph">CAPITAL: <span>${continentCountrys[j]._capital}</span></p>
                                    <p class="card-text paragraph">LÍNGUA: <span>${continentCountrys[j]._language}</span></p>
                                    <div class="stars" data-rating="${continentCountrys[j]._points}" id="${continentCountrys[j]._id}">
                                        <span class="star star_${continentCountrys[j]._id}"  id="${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}" id="${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}" id="${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}" id="${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}" id="${continentCountrys[j]._id}">&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
            } else {
                result += `<div class="col-lg-3 col-sm-6 col-xs-12" id="countriesCol">
                            <div class="card africanCards">
                            <img src="/Images/lockCountries.png" class="card-img-top lockImg" alt="Lock">
                            <button type="button" id="${continentCountrys[j]._id}" class="btn countryButton" data-toggle="modal" data-target="#countryModal" disabled>
                                <img src="${continentCountrys[j]._flag}" class="card-img-top" alt="Brasil">
                            </button>
                                <div class="card-body" id="${continentCountrys[j]._id}">
                                    <p class="card-text paragraph">NOME: <span>---</span> </p>
                                    <p class="card-text paragraph">CAPITAL: <span>---</span></p>
                                    <p class="card-text paragraph">LÍNGUA: <span>---</span></p>
                                </div>
                            </div>
                        </div>`
            }
            i++

            if (i % 4 === 0) {
                result += `</div>`
            }

            if ((j + 1) == continentCountrys.length) {
                break;
            }
        }

    }

    if (document.querySelector("#containerCatalog") != null) {
        document.querySelector("#containerCatalog").innerHTML = result
    }

    //Change the CSS of the lock image
    $('.lockImg').css({
        'position': 'absolute',
        'align-content': 'center',
        'justify-content': 'center'
    });
    //Change the CSS of the card background
    $('.africanCards').css({
        'background-color': 'rgb(255, 255, 255, .8)'
    })

    // Set all the image buttons to open the modal
    let countryBtn = document.getElementsByClassName("countryButton")
    for (const elem of countryBtn) {
        elem.addEventListener("click", function () {
            renderModalInfo(this.id)
        })
    }
    onLoadRate()
    ratingButtons()
    renderModalInfo()


}

/**
 * Function that set all the rating buttons
 * @param {String} stars returns the stars (obs: are created when the catalog in rendered)
 */
function ratingButtons() {
    let stars = document.querySelectorAll('.stars');
    for (const elem of stars) {
        elem.addEventListener("click", function () {
            rating(this.id)


            //    if(man==true){
            //     location.reload() 
            //    }


            // 
        })
    }
}

/**
 * Function that makes the rating system work
 * @param {String} id returns the id of the current country that is being rated
 * @param {String} countryId sets in the session storage the country that is going to be rated
 * @param {String} userId sets in the session storage the user that is going to rate the country
 * @param {String} stars returns the stars (obs: are created when the catalog in rendered)
 * @param {Boolean} stop variable used to prevent the user rating twice the same country
 * @param {Boolean} match variable used to prevent painting the wrong star
 * @param {String} str variable used to represent the class star + the id that was gave to that specific star
 * @param {Number} num variable used to represent the points on each country
 * @param {Object} obj object that saves who rated the country and the rating
 */
function rating(id) {
    let stop = false
    for (const country of countries) {
        if (country._id == id) {
            let stars = document.querySelectorAll('.star');
            const str = `.star_${id}`
            document.querySelectorAll(str).forEach(function (star) {
                if (stop == true) {
                    return "nothing"
                }
                star.addEventListener('click', function (ev) {

                    let countryId = ""
                    if (sessionStorage.getItem("id")) {
                        countryId = JSON.parse(sessionStorage.getItem('id'))
                    }
                    let span = ev.currentTarget;
                    const str = `.star_${id}`
                    let stars = document.querySelectorAll(str);
                    let match = false;
                    let num = 0;
                    //For each stars...
                    stars.forEach(function (star, index) {
                        if (match) {
                            //Remove class on the specific star
                            star.classList.remove('rated');
                        } else {
                            //Add class on the specific star
                            star.classList.add('rated');
                        }
                        //We are currently looking at the span that was clicked
                        if (star === span) {
                            match = true;
                            //index variable works has if it was the typical "i"
                            num = index + 1;
                        }
                    })
                    let userId = ""
                    if (sessionStorage.getItem("loggedUserId")) {
                        userId = JSON.parse(sessionStorage.getItem('loggedUserId'))
                    }

                    if (country._points.length > 0) {
                        for (const classification of country._points) {
                            if (classification.user == userId) {
                                stop = true
                                break;
                            }
                            let obj = {
                                user: userId,
                                points: num
                            }
                            country._points.push(obj)
                            document.querySelector('.stars').setAttribute('data-rating', num);
                        }
                    } else if (country._points.length == 0) {
                        let obj = {
                            user: userId,
                            points: num
                        }
                        country._points.push(obj)
                        document.querySelector('.stars').setAttribute('data-rating', num);

                    }
                    localStorage.setItem('countries', JSON.stringify(countries))
                });
                sessionStorage.setItem('id', JSON.stringify(country._id))
            });

            //work with int and get the attribute data-rating
            let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
            //get the current data-target star - subtract 1 because it's an array
            let target = stars[rating - 1];

            //Will trigger the function setRating - will trigger the star we clicked before
            //target.dispatchEvent(new MouseEvent('click'));
        }
    }
}

/**
 * Function that replace the accent characters
 * @param {String} text represents each condition of replace
 */
export function removeAcento(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
}


/**
 * Function sort the countries in an ascendent order
 */
function sortCountriesAscendent() {
    continentCountrys.sort(Country.ascendentAlphabeticOrder)
}

/**
 * Function sort the countries in an descendent order
 */
function sortCountriesDescendent() {
    continentCountrys.sort(Country.descendentAlphabeticOrder)
}

/**
 * Function sort the countries by the number of visits
 */
function sortCountriesByVisit() {
    continentCountrys.sort(Country.sortByMostVisited)
}

/**
 * Function that makes the countries search 
 */
function searchCountry() {
    $(document).ready(function () {
        $("#txtName").on("keyup", function () {
            let textValue = $(this).val().toLowerCase();
            $(".africanCards").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(textValue) > -1)
            });
        });
    });
}

/**
 * This function opens the modal with the information about the country that was clicked
 * @param {Number} id This is The id of the country that was clicked
 * @param {Array} currentCountry Save the array set before in "countries"
 */
function renderModalInfo(id) {
    for (const country of countries) {
        if (country._id == id) {
            currentCountry = country
            document.querySelector("#modalFlag").src = country._flag
            document.querySelector("#infoInfo").innerHTML = country._information
            document.querySelector("#imgModal").src = country._location
            //Increment the visits
            country._visit += 1
            const divComments = document.querySelector(".commentContainer")
            divComments.innerHTML = ""
            localStorage.setItem('countries', JSON.stringify(countries))
            for (let i = 0; i < currentCountry._comments.length; i++) {
                //Render comments in the correct section
                divComments.innerHTML += `Utilizador: ${currentCountry._comments[i]._userId} | Comentário: "${currentCountry._comments[i]._comment}" | ${currentCountry._comments[i]._dateTime}<br><br>`
            }
        }
    }
    comment(id)
}

/**
 * Function that render comments
 * @param {Number} id This is The id of the country that was clicked
 * @param {String} txtComment returns the value of the comment that was written
 */
function comment(id) {
    if (document.querySelector('#commentForm') != null) {
        document.querySelector('#commentForm').addEventListener('submit', function (event) {

            let txtComment = document.querySelector('#txtComment').value
            let as = ""
            if (sessionStorage.getItem('loggedUserId')) {
                as = JSON.parse(sessionStorage.getItem("loggedUserId"))
                //inserir o comentario no array
                if (txtComment == "") {
                    Swal.fire({
                        type: 'error',
                        title: 'Erro...',
                        text: 'Para comentares tens de escrever algo!',
                        padding: '1rem',
                        background: '#CCCC33',
                        confirmButtonColor: '#29ABE2'
                    })
                } else {
                    for (const country of countries) {
                        if (country._id == id) {
                            const newComment = new Comment(txtComment, id)
                            country._comments.push(newComment)
                            localStorage.setItem('countries', JSON.stringify(countries))
                            const toast = Swal.mixin({
                                toast: true,
                                position: 'bottom-end',
                                showConfirmButton: false,
                                timer: 3000,
                                background: '#29ABE2'
                            });
                            toast.fire({
                                type: 'success',
                                title: '<span style="color:#FFFFFF">Comentário feito com sucesso!<span>'
                            })
                            break;
                        }
                    }

                }
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Erro...',
                    text: 'Não é possível efetuar comentários sem primeiro iniciar sessão!\nSe ainda não tens conta, cria uma e anda divertir-te connosco.!',
                    padding: '1rem',
                    background: '#CCCC33',
                    confirmButtonColor: '#29ABE2'
                })
            }
            event.preventDefault()
        })
    }
}

//Sort comments per date of creation
const stlGenreComment = document.querySelector('#stlGenreComment')
if (stlGenreComment != null) {
    stlGenreComment.addEventListener("change", function () {

        if (stlGenreComment.value == "Ordem Antigo para Recente") {
            currentCountry._comments.sort(Comment.dateFromOldToRecent)
        }

        if (stlGenreComment.value == "Ordem Recente para Antigo") {
            currentCountry._comments.sort(Comment.dateFromRecentToOld)
        }

        //List countries by the country you selected
        const divComments = document.querySelector(".commentContainer")
        divComments.innerHTML = ""
        for (let i = 0; i < currentCountry._comments.length; i++) {

            divComments.innerHTML += `
            Utilizador: ${currentCountry._comments[i]._userId} | Comentário: "${currentCountry._comments[i]._comment}" | ${currentCountry._comments[i]._dateTime}<br><br>
            `
        }
    })
}

/**
 * Function that will show the user data that was saved before
 * @param {Number} id This is The id of the users that is logged
 */
function userData() {
    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }
    for (const user of users) {
        if (user._id == id) {
            //Change the avatar in the navbar
            document.querySelector('.avatar').src = user._avatar
        }
    }
}

/**
 * This Function builds the pagination buttons 
 */
function ConstructPaginationButton() {
    let quantity = continentCountrys.length / 16
    let quantityTostring = String(quantity)
    let contains = false

    for (let i = 0; i < quantityTostring.length; i++) {
        if (quantityTostring[i] == '.') {
            contains = true
        }
    }

    if (contains == true) {
        quantity = parseInt(quantity) + 1
    } else {
        quantity = quantity
    }
    if (quantity < 1) {
        quantity = 1
    }
    if (document.querySelector('.pagination')) {
        let paginationHolder = document.querySelector('.pagination')
        paginationHolder.innerHTML = ``
        paginationHolder.innerHTML += `<li class="page-item"><button id='prev' class="page-link"><<</button></li>`
        for (let i = 1; i <= quantity; i++) {
            paginationHolder.innerHTML += `<li class="page-item"><button id='${i*16}'class="page-link">${i}</button></li>`
        }
        paginationHolder.innerHTML += `<li class="page-item"><button id="next"class="page-link">>></button></li>`
        getPageSelection()
    }
}

// This function controls the travell Between  pages
function getPageSelection() {
    let pagesLinks = document.querySelectorAll(".page-link")
    for (const button of pagesLinks) {
        button.addEventListener('click', function () {
            if (this.id != 'prev' && this.id != 'next') {
                localStorage.setItem('page', JSON.stringify(this.id))
            }
            renderCatalog(this.id)
        })
    }
}

// This function gets the elements from the array countries that are going to be showed based on the continent and  push them to the array continentCountrys
function continentCountriesFill() {
    if (document.querySelector('.continentTitle')) {
        let contName = document.querySelector('.continentTitle').innerHTML
        for (const country of countries) {
            if (removeAcento(contName.toLowerCase()) == country._continent.toLowerCase()) {
                continentCountrys.push(country)
            }
        }
    }
}

function onLoadRate() {
    let stars = document.querySelectorAll(".star")

    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }
    for (const country of countries) {

        if (country._points.length > 0) {

            for (const classification of country._points) {
                if (classification.user == id) {
                    let toColor = []
                    for (const star of stars) {
                        if (star.id == country._id) {
                            star.addEventListener("click", function () {
                                location.reload()
                            })
                            toColor.push(star)
                        }
                    }
                    if (toColor.length > 0) {
                        for (let i = 0; i < classification.points; i++) {
                            toColor[i].classList.add('rated');
                        }
                    }
                }
            }
        }
    }
}

/**
 * Function that will prevent hacking
 */
function confirmSystemHaker() {
    if (sessionStorage.getItem("loggedUserId") == null) {
        location.href = '/HTML/loginAndSigup.html'
    }
}

//Sign out
if (document.getElementById('signOut') != null) {
    document.getElementById('signOut').addEventListener('click', function () {
        signOut()
    })
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})