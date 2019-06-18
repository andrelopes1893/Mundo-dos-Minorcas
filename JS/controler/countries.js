import Country from "../models/countriesModels.js"
import Comment from '../models/commentsModels.js'

let countries = []
let users = []
let ratings = []
let countryId
let currentCountry
let continentCountrys = []

motherFunction()
//o que acontece quando a paginas que usam com suposto este ficheiro, são carregadas

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

//função que renderiza o catalogo
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

    if (continentCountrys.length > 0) {
        for (let j = Number(quantity) - 16; j < Number(quantity); j++) {
            if (i % 4 === 0) {
                result += `<div class="row">`
            }
            result += `<div class="col-lg-3 col-sm-6 col-xs-12" id="countriesCol">
                            <div class="card africanCards" style="width: 18rem;">
                            <button type="button" id="${continentCountrys[j]._id}" class="btn countryButton" data-toggle="modal" data-target="#countryModal">
                                <img src="${continentCountrys[j]._flag}" class="card-img-top" alt="Brasil">
                            </button>
                                <div class="card-body" id="${continentCountrys[j]._id}">
                                    <p class="card-text paragraph">NOME: <span>${continentCountrys[j]._name}</span> </p>
                                    <p class="card-text paragraph">CAPITAL: <span>${continentCountrys[j]._capital}</span></p>
                                    <p class="card-text paragraph">LÍNGUA: <span>${continentCountrys[j]._language}</span></p>
                                    <div class="stars-outer">
                                        <div class="stars-inner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            i++

            if (i % 4 === 0) {
                result += `</div>`
            }

            if ((j + 1) == continentCountrys.length) {
                break;
            }
        }
    }
    // for (const country of countries) {
    //     if (removeAcento(contName.toLowerCase()) == country._continent.toLowerCase()) {
    //         if (i % 4 === 0) {
    //             result += `<div class="row">`
    //         }
    //         result += `
    //             <div class="col-lg-3 col-sm-6 col-xs-12" id="countriesCol">
    //                 <div class="card africanCards" style="width: 18rem;">
    //                 <button type="button" id="${country._id}" class="btn countryButton" data-toggle="modal" data-target="#countryModal">
    //                     <img src="${country._flag}" class="card-img-top" alt="Brasil">
    //                 </button>
    //                     <div class="card-body" id="${country._id}">
    //                         <p class="card-text paragraph">NOME: <span>${country._name}</span> </p>
    //                         <p class="card-text paragraph">CAPITAL: <span>${country._capital}</span></p>
    //                         <p class="card-text paragraph">LÍNGUA: <span>${country._language}</span></p>
    //                         <div class="stars-outer">
    //                             <div class="stars-inner"></div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>`
    //         i++

    //         if (i % 4 === 0) {
    //             result += `</div>`
    //         }
    //     }
    // }
    ratingButtons()

    if (document.querySelector("#containerCatalog") != null) {
        document.querySelector("#containerCatalog").innerHTML = result
    }



    // Programar botoes nas imagens dos modais
    let countryBtn = document.getElementsByClassName("countryButton")
    for (const elem of countryBtn) {
        elem.addEventListener("click", function () {
            countryId = this.id
            //console.log(this.id)
            renderModalInfo(this.id)
        })
    }
    renderModalInfo()
}

//codigo de implementar a avaliação de cada card de um pais
function ratingButtons() {
    let starBtn = document.getElementsByClassName('star')
    for (const elem of starBtn) {
        elem.addEventListener("click", function () {
            ratingStars()
            console.log(elem)
        })
    }
}

function ratingStars() {
    const starTotal = 5;

    for (const rating in ratings) {
        // 2
        const starPercentage = (ratings[rating] / starTotal) * 100;
        // 3
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        // 4
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
    }
}

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

//Função que injeta na modal as informaçoes correspondentes ao pais em que o card foi carregado
function renderModalInfo(id) {
    for (const country of countries) {
        if (country._id == id) {
            currentCountry = country
            document.querySelector("#modalFlag").src = country._flag
            document.querySelector("#infoInfo").innerHTML = country._information
            document.querySelector("#imgModal").src = country._location

            const divComments = document.querySelector(".commentContainer")
            //listar comentario(s) registados sobre o pais em causa
            divComments.innerHTML = ""

            for (let i = 0; i < currentCountry._comments.length; i++) {
                divComments.innerHTML += `Utilizador: ${currentCountry._comments[i]._userId} | Comentário: "${currentCountry._comments[i]._comment}" | ${currentCountry._comments[i]._dateTime}<br><br>`
            }
        }
    }
}

//codigo para adicionar comentarios
if (document.querySelector('#commentForm') != null) {
    document.querySelector('#commentForm').addEventListener('submit', function (event) {

        let txtComment = document.querySelector('#txtComment').value
        let id = ""
        if (sessionStorage.getItem('loggedUserId')) {
            id = JSON.parse(sessionStorage.getItem("loggedUserId"))
            //inserir o comentario no array
            if (txtComment == "") {
                alert("Para comentar tem que escrever um comentário.")
            } else {
                for (const country of countries) {
                    if (country._id == countryId) {

                        const newComment = new Comment(txtComment, id)
                        country._comments.push(newComment)
                    }
                }
                alert("O teu comentário foi registado com sucesso!")
            }
        } else {
            alert("Não é possível efetuar comentários sem primeiro iniciar sessão!\nSe ainda não tens conta, cria uma e anda divertir-te connosco.")
        }

        localStorage.setItem('countries', JSON.stringify(countries))
        event.preventDefault()
    })
}

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