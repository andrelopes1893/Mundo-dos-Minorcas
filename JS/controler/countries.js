import Country from "../models/countriesModels.js"
import Comment from '../models/commentsModels.js'

let countries = []
let users = []
let currentCountry

// !This array get the countries from an expecific continent
let continentCountrys = []

// !Function that gives back the cards levels that the user have unlocked based on xp (obs: if it gives back 4 the user can see cards information from levels 1,2,3,4)
function renderCatalogByXP() {
    let value = 0
    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }
    for (const user of users) {
        if (user._id == id) {
            console.log(user._xp);

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

motherFunction()
//!Since that windows on load wasn't working we based on this function to do all the work when the window loads 
function motherFunction() {

    // if (localStorage.countries) {
    //     countries = JSON.parse(localStorage.countries)
    // }

    if (localStorage.getItem("countries")) {
        countries = JSON.parse(localStorage.getItem("countries"))
    }

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
    }
    //!page is the page that you are in the countrie ,its main "job" is to help with the pagination
    if (localStorage.getItem('page')) {
        localStorage.removeItem('page')
    }

    continentCountrysFill()

    renderCatalog()
    // !!!new
    ConstructPaginationButton()
    renderModalInfo()
    userData()
    if (sessionStorage.getItem('continentCatalogStyle')) {
        continentCatalogStyle = sessionStorage.getItem('continentCatalogStyle')
    }
}


searchCountry()

//botão de filtrar
if (document.querySelector("#btnFilter") != null) {
    document.querySelector("#btnFilter").addEventListener("click", function (event) {
        renderCatalog()
        renderModalInfo()
        event.preventDefault()
    })
}
/**
 * Function that render the catalog
 * @param {Number} quantity the position that it stops getting elements from the array to render and this value - 16 = to the the position where it starts
 */
// função que renderiza o catalogo
function renderCatalog(quantity = 16) {
    if (document.querySelector('#stlGenre')) {
        if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Crescente") {
            sortCountriesAscendent()
        }

        if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Decrescente") {
            sortCountriesDescendent()
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
                            <div class="card africanCards" style="width: 18rem;">
                            <button type="button" id="${continentCountrys[j]._id}" class="btn countryButton" data-toggle="modal" data-target="#countryModal">
                                <img src="${continentCountrys[j]._flag}" class="card-img-top" alt="Brasil">
                            </button>
                                <div class="card-body" id="${continentCountrys[j]._id}">
                                    <p class="card-text paragraph">NOME: <span>${continentCountrys[j]._name}</span> </p>
                                    <p class="card-text paragraph">CAPITAL: <span>${continentCountrys[j]._capital}</span></p>
                                    <p class="card-text paragraph">LÍNGUA: <span>${continentCountrys[j]._language}</span></p>
                                    <div class="stars" data-rating="${continentCountrys[j]._points}" id="${continentCountrys[j]._id}">
                                        <span class="star star_${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}">&nbsp;</span>
                                        <span class="star star_${continentCountrys[j]._id}">&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
            } else {
                result += `<div class="col-lg-3 col-sm-6 col-xs-12" id="countriesCol">
                            <div class="card africanCards" style="width: 18rem;">
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

    $('.lockImg').css({
        'position': 'absolute',
        'align-content': 'center',
        'justify-content': 'center'
    });

    $('.africanCards').css({
        'background-color': 'rgb(255, 255, 255, .8)'
    })

    // Programar botoes nas imagens dos modais
    let countryBtn = document.getElementsByClassName("countryButton")
    for (const elem of countryBtn) {
        elem.addEventListener("click", function () {
            renderModalInfo(this.id)
        })
    }
    renderModalInfo()
}

function ratingButtons() {
    let stars = document.querySelectorAll('.stars');
    for (const elem of stars) {
        elem.addEventListener("click", function () {
            rating(this.id)
        })
    }
}

//initial setup
function rating(id) {
    for (const country of countries) {
        if (country._id == id) {
            let stars = document.querySelectorAll('.star');
            const str = `.star_${id}`
            document.querySelectorAll(str).forEach(function (star) {
                star.addEventListener('click', function (ev) {
                    let asd = ""
                    if (sessionStorage.getItem("id")) {
                        asd = JSON.parse(sessionStorage.getItem('id'))
                    }
                    let span = ev.currentTarget;
                    const str = `.star_${id}`
                    let stars = document.querySelectorAll(str);
                    let match = false;
                    let num = 0;
                    stars.forEach(function (star, index) {
                        if (match) {
                            star.classList.remove('rated');
                        } else {
                            star.classList.add('rated');
                        }
                        //are we currently looking at the span that was clicked
                        if (star === span) {
                            match = true;
                            num = index + 1;
                        }
                    })
                    let a = ""
                    if (sessionStorage.getItem("loggedUserId")) {
                        a = JSON.parse(sessionStorage.getItem('loggedUserId'))
                    }
                    for (const user of users) {
                        if (user._id == a) {
                            for (const country of countries) {
                                if (country._id == asd) {
                                    document.querySelector('.stars').setAttribute('data-rating', num);
                                    let obj = {
                                        user: user._username,
                                        points: num
                                    }
                                    country._points.push(obj)
                                }
                            }
                        }
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

function loadCSSstar() {
    let a = ""
    if (sessionStorage.getItem("loggedUserId")) {
        a = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }

    for (const country of countries) {
        for (const points of country._points) {
            if (points.username == a) {
                let stars = document.querySelectorAll('.star')
                for (const star of stars) {
                    let match = false;
                    let num = 0;
                    if (match) {
                        star.classList.remove('rated');
                    } else {
                        star.classList.add('rated');
                    }
                    //are we currently looking at the span that was clicked
                    if (star === span) {
                        match = true;
                        num = index + 1;
                    }
                }
            }
        }
    }
}


// function setRating(ev) {

// }


// function ratingStars(id) {

//     console.log(id);
//     const starTotal = 5;
//     let a = ""
//     if (sessionStorage.getItem("loggedUserId")) {
//         a = JSON.parse(sessionStorage.getItem('loggedUserId'))
//     }
//     for (const user of users) {
//         if (user._id == a) {
//             for (const country of countries) {     
//                 if (country._id == id) {
//                     console.log(country._points[country._points]);
//                     // 2
//                     const starPercentage = (country._points[country._points] / starTotal) * 100;
//                     // 3
//                     const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
//                     // 4                    
//                     console.log(Number(starPercentageRounded));

//                     country._points = starPercentageRounded
//                     document.querySelector(`.${country._points} .stars-inner`).style.width = starPercentageRounded;
//                 }
//             }
//         }
//     }
// }

//função para trocar letras com caracteres especiais das letras (como acentos, cedilhas, etc por essa letra, simples.)
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


//Função que ordena o array de paises pelo nome, de forma crescente, no container
function sortCountriesAscendent() {
    continentCountrys.sort(Country.ascendentAlphabeticOrder)
}

//Função que ordena o array de paises pelo nome, de forma decrescente, no container
function sortCountriesDescendent() {
    continentCountrys.sort(Country.descendentAlphabeticOrder)
}

//funçao para procurar paises 
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
 * This function opens the modal with the information about one of the countries 
 * @param {Number} id This is The id of an country 
 */
function renderModalInfo(id) {
    for (const country of countries) {
        if (country._id == id) {
            currentCountry = country
            document.querySelector("#modalFlag").src = country._flag
            document.querySelector("#infoInfo").innerHTML = country._information
            document.querySelector("#imgModal").src = country._location
            country._visit++
            const divComments = document.querySelector(".commentContainer")
            //listar comentario(s) registados sobre o pais em causa
            divComments.innerHTML = ""
            for (let i = 0; i < currentCountry._comments.length; i++) {
                divComments.innerHTML += `Utilizador: ${currentCountry._comments[i]._userId} | Comentário: "${currentCountry._comments[i]._comment}" | ${currentCountry._comments[i]._dateTime}<br><br>`
            }
        }
    }
    comment(id)
}

function comment(id) {
    if (document.querySelector('#commentForm') != null) {
        document.querySelector('#commentForm').addEventListener('submit', function (event) {

            let txtComment = document.querySelector('#txtComment').value
            let as = ""
            if (sessionStorage.getItem('loggedUserId')) {
                as = JSON.parse(sessionStorage.getItem("loggedUserId"))
                //inserir o comentario no array
                if (txtComment == "") {
                    alert("Para comentar tem que escrever um comentário.")
                } else {
                    for (const country of countries) {
                        if (country._id == id) {
                            const newComment = new Comment(txtComment, id)
                            country._comments.push(newComment)
                            localStorage.setItem('countries', JSON.stringify(countries))
                            alert("O teu comentário foi registado com sucesso!")
                            break;
                        }
                    }

                }
            } else {
                alert("Não é possível efetuar comentários sem primeiro iniciar sessão!\nSe ainda não tens conta, cria uma e anda divertir-te connosco.")
            }
            event.preventDefault()
        })
    }
}

//codigo para adicionar comentarios


//ordenar comentarios por data
const stlGenreComment = document.querySelector('#stlGenreComment')
if (stlGenreComment != null) {
    stlGenreComment.addEventListener("change", function () {

        if (stlGenreComment.value == "Ordem Antigo para Recente") {
            currentCountry._comments.sort(Comment.dateFromOldToRecent)
        }

        if (stlGenreComment.value == "Ordem Recente para Antigo") {
            currentCountry._comments.sort(Comment.dateFromRecentToOld)
        }

        //listar comentario(s) registados sobre o pais em causa
        const divComments = document.querySelector(".commentContainer")
        divComments.innerHTML = ""
        for (let i = 0; i < currentCountry._comments.length; i++) {

            divComments.innerHTML += `
            Utilizador: ${currentCountry._comments[i]._userId} | Comentário: "${currentCountry._comments[i]._comment}" | ${currentCountry._comments[i]._dateTime}<br><br>
            `
        }
    })
}

function userData() {
    let id = ""
    if (sessionStorage.getItem("loggedUserId")) {
        id = JSON.parse(sessionStorage.getItem('loggedUserId'))
    }
    for (const user of users) {
        if (user._id == id) {
            document.querySelector('.avatar').src = user._avatar
        }
    }
}


//!New
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
function continentCountrysFill() {
    if (document.querySelector('.continentTitle')) {
        let contName = document.querySelector('.continentTitle').innerHTML
        for (const country of countries) {
            if (removeAcento(contName.toLowerCase()) == country._continent.toLowerCase()) {
                continentCountrys.push(country)
            }
        }
    }
}