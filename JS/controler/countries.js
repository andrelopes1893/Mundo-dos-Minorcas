import Country from "../models/countriesModels.js"
import Comment from '../models/commentsModels.js'

let comments = []
let countries = []
let users = []
let countryId 

//o que acontece quando a paginas que usam com suposto este ficheiro, são carregadas
window.onload = function () {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }

    if (localStorage.comments) {
        comments = JSON.parse(localStorage.comments)
    }

    if (localStorage.users) {
        users = JSON.parse(localStorage.users)
    }

    renderCatalog();
    renderModalInfo();
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
function renderCatalog() {
    if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Crescente") {
        sortCountriesAscendent()
    }

    if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Decrescente") {
        sortCountriesDescendent()
    }

    let result = ""
    let i = 0
    let contName = document.querySelector('.continentTitle').innerHTML

    for (const country of countries) {
        if (removeAcento(contName.toLowerCase()) == country._continent.toLowerCase()) {
            if (i % 4 === 0) {
                result += `<div class="row">`
            }
            result += `
                <div class="col-lg-3 col-sm-6 col-xs-12" id="countriesCol">
                    <div class="card africanCards" style="width: 18rem;">
                    <button type="button" id="${country._id}" class="btn countryButton" data-toggle="modal" data-target="#countryModal">
                        <img src="${country._flag}" class="card-img-top" alt="Brasil">
                    </button>
                        <div class="card-body" id="${country._id}">
                            <p class="card-text paragraph">NOME: <span>${country._name}</span> </p>
                            <p class="card-text paragraph">CAPITAL: <span>${country._capital}</span></p>
                            <p class="card-text paragraph">LÍNGUA: <span>${country._language}</span></p>
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
        }
    }
    ratingButtons()

    document.querySelector("#containerCatalog").innerHTML = result

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

function ratingButtons() {
    let starBtn = document.getElementsByClassName('star')
    for (const elem of starBtn) {
        elem.addEventListener("click", function () {
            ratingStars()
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
    // document.querySelectorAll('.star')[0].addEventListener('click', function () {
    //     document.getElementById('1').style.color = "#FFD700"
    // })

    // document.querySelectorAll('.star')[1].addEventListener('click', function () {
    //     document.getElementById('1').style.color = "#FFD700"
    //     document.getElementById('2').style.color = "#FFD700"
    // })

    // document.querySelectorAll('.star')[2].addEventListener('click', function () {
    //     document.getElementById('1').style.color = "#FFD700"
    //     document.getElementById('2').style.color = "#FFD700"
    //     document.getElementById('3').style.color = "#FFD700"
    // })

    // document.querySelectorAll('.star')[3].addEventListener('click', function () {
    //     document.getElementById('1').style.color = "#FFD700"
    //     document.getElementById('2').style.color = "#FFD700"
    //     document.getElementById('3').style.color = "#FFD700"
    //     document.getElementById('4').style.color = "#FFD700"
    // })

    // document.querySelectorAll('.star')[4].addEventListener('click', function () {
    //     document.getElementById('1').style.color = "#FFD700"
    //     document.getElementById('2').style.color = "#FFD700"
    //     document.getElementById('3').style.color = "#FFD700"
    //     document.getElementById('4').style.color = "#FFD700"
    //     document.getElementById('5').style.color = "#FFD700"
    // })
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
    countries.sort(Country.ascendentAlphabeticOrder)
}

//Função que ordena o array de paises pelo nome, de forma decrescente, no container
function sortCountriesDescendent() {
    countries.sort(Country.descendentAlphabeticOrder)
}

//Função que ordena o array de comentarios dentro do array dos paises, pela data, de forma crescente, no modal
function sortDateAscendent() {
    country._comments.sort(Comment.dateFromRecentToOld)
}

//Função que ordena o array de comentarios dentro do array dos paises, pela data, de forma decrescente, no modal
function sortDateDescendent() {
    country._comments.sort(Comment.dateFromOldToRecent)
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
            document.querySelector("#modalFlag").src = country._flag
            document.querySelector("#infoInfo").innerHTML = country._information
            document.querySelector("#imgModal").src = country._location
            const divComments = document.querySelector(".commentContainer")

            //listar comentario(s) registados sobre o pais em causa
            divComments.innerHTML=""
            for (let i = 0; i<country._comments.length; i++) {
                
                divComments.innerHTML += `
                 Utilizador: ${country._comments[i]._userId} | Comentário: "${country._comments[i]._comment}" | ${country._comments[i]._dateTime}<br><br>
                `
            }
            if (document.querySelector('#stlGenreComment').value == "Ordem Recente para Antigo") {
                sortDateAscendent()
            }
            
            if (document.querySelector('#stlGenreComment').value == "Ordem Antigo para Recente") {
                sortDateDescendent()
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
            if(txtComment == ""){
                alert("Para comentar tem que escrever um comentário.")
            }
            else{
                for (const country of countries) {
                    if (country._id == countryId) {
                        console.log(country._id + "-" + countryId)
                        const newComment = new Comment(txtComment, id)
                        comments.push(newComment)
                        country._comments.push(newComment)
                    }
                }
                alert("O teu comentário foi registado com sucesso!")
            }
        } 
        else {
            alert("Não é possível efetuar comentários sem primeiro iniciar sessão!\nSe ainda não tens conta, cria uma e anda divertir-te connosco.")            
        }

        localStorage.setItem('comments', JSON.stringify(comments))
        localStorage.setItem('countries', JSON.stringify(countries))
        event.preventDefault()
    })
}