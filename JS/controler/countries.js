import Country from "../models/countriesModels.js"

let countries = []

window.onload = function () {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    } else {
        let newCountry1 = new Country('Portugal', 'Europa', 'Lisboa', 'Português', 'pt', 'Portugal', '../../Images/Portugal.png', 'Info 1', 'Info 2', '../../Images/Noruega.png', '../../Images/Brasil.png', new Date())
        countries.push(newCountry1)
        localStorage.setItem("countries", JSON.stringify(countries))
    }
    renderCatalog();
    renderModalInfo();
    if (sessionStorage.getItem('continentCatalogStyle')) {
        continentCatalogStyle = sessionStorage.getItem('continentCatalogStyle')
    } /*else {
         // !Para eliminar
        continentCatalogStyle = 'africa'
        // !Para eliminar
        sessionStorage.setItem('continentCatalogStyle', JSON.stringify(continentCatalogStyle))
    }*/
    CatalogStyleChangeByContinent()
}

searchCountry()

document.querySelector("#btnFilter").addEventListener("click", function (event) {
    renderCatalog()
    renderModalInfo()
    event.preventDefault()
})

function renderCatalog() {
    if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Crescente") {
        sortCountriesAscendent()
    }

    if (document.querySelector('#stlGenre').value == "Ordem Alfabetica Decrescente") {
        sortCountriesDescendent()
    }

    let result = ""
    let i = 0
    for (const country of countries) {
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
                        <p class="mb-0 star"><button class="btn star"
                            style='font-size:30px; padding: 0; box-shadow: 0 0 0 0;'>&#9733;</button><button
                            class="btn star"
                            style='font-size:30px; padding: 0; box-shadow: 0 0 0 0;'>&#9733;</button><button
                            class="btn star"
                            style='font-size:30px; padding: 0; box-shadow: 0 0 0 0;'>&#9733;</button><button
                            class="btn star"
                            style='font-size:30px; padding: 0; box-shadow: 0 0 0 0;'>&#9733;</button><button
                            class="btn star" style='font-size:30px; padding: 0; box-shadow: 0 0 0 0;'>&#9733;</button>
                        </p>
                    </div>
                </div>
            </div>`
        i++
        if (i % 4 === 0) {
            result += `</div>`
        }
    }
    document.querySelector("#containerCatalog").innerHTML = result

    // Programar botoes nas imagens dos modais
    const countryBtn = document.getElementsByClassName("countryButton")
    for (const elem of countryBtn) {
        elem.addEventListener("click", function () {
            renderModalInfo(this.id)
        })
    }

    renderModalInfo()
}

/**
 * Função que ordena o array de paises pelo nome, no container
 */
function sortCountriesAscendent() {
    countries.sort(Country.ascendentAlphabeticOrder)
}

function sortCountriesDescendent() {
    countries.sort(Country.descendentAlphabeticOrder)
}

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
 * Função que injeta na modal as informaçoes correspondentes ao pais em que o card foi carregado
 */
function renderModalInfo(id) { 
    for (const country of countries) {
        //console.log(country._id + "-" + id)
        if(country._id == id){
        document.querySelector("#modalFlag").src = country._flag
        document.querySelector("#infoName").innerHTML = country._name
        document.querySelector("#infoCapital").innerHTML = country._capital
        document.querySelector("#infoLanguage").innerHTML = country._language
        document.querySelector("#infoContinent").innerHTML = country._continent
        document.querySelector("#modalMap").src = country._location
        document.querySelector("#infoInfo").innerHTML = country._information
        }
    }
}





let continentCatalogStyle=''

// !Page Looking
function CatalogStyleChangeByContinent() {
    console.log(continentCatalogStyle)
    if (continentCatalogStyle == 'africa') {
        document.querySelector('title').innerHTML += 'África'
        document.body.style.backgroundColor = '#F5BB00'
        document.querySelector('#continentTitle').innerHTML = 'África'
        document.querySelector('#continentTitle').style.color = '#FFFFFF'
    } 
    else if (continentCatalogStyle == 'america') {
        document.querySelector('title').innerHTML += 'América'
        document.body.style.backgroundColor = '#4AB71B'
        document.querySelector('#continentTitle').innerHTML = 'América'
        document.querySelector('#continentTitle').style.color = '#FFFFFF'
    } 
    else if (continentCatalogStyle == 'asia') {
        document.querySelector('title').innerHTML += 'Ásia'
        document.body.style.backgroundColor = '#BE3DE3'
        document.querySelector('#continentTitle').innerHTML = 'Ásia'
        document.querySelector('#continentTitle').style.color = '#FFFFFF'
    } 
    else if (continentCatalogStyle == 'europa') {
        document.querySelector('title').innerHTML += 'Europa'
        document.body.style.backgroundColor = '#204987'
        document.querySelector('#continentTitle').innerHTML = 'Europa'
        document.querySelector('#continentTitle').style.color = '#FFFFFF'
    } 
    else if (continentCatalogStyle == 'oceania') {
        document.querySelector('title').innerHTML += 'Oceânia'
        document.body.style.backgroundColor = '#B7541B'
        document.querySelector('#continentTitle').innerHTML = 'Oceânia'
        document.querySelector('#continentTitle').style.color = '#FFFFFF'
    }
}

