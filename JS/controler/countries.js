import Country from "../models/countriesModels.js"

let countries = []

window.onload = function(){
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    } else {
        let newCountry1 = new Country('Portugal', 'Europa', 'Lisboa', 'Português', 'pt', 'Portugal', '../../Images/Portugal.png', 'Info 1', 'Info 2', '../../Images/Noruega.png', '../../Images/Brasil.png', new Date())
        countries.push(newCountry1)
        localStorage.setItem("countries", JSON.stringify(countries))
    }
}


//nova parte dos filtros... ainda em development
const myCatalog = document.querySelector("#containerCatalog")
const btnFilter = document.querySelector("#btnFilter")

btnFilter.addEventListener("click", function (event) {
    event.preventDefault()
    const txtName = document.querySelector("#txtName").value
    const stlGenre = document.querySelector("#stlGenre").value
    renderCatalog()

})

renderCatalog();

function renderCatalog() {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }
    
    //filtro para ordenar por ordem alfabetica crescente
    if (stlGenre.value == "Ordem Alfabética" ) {
        sortCountries()
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
                <button type="button" class="btn countryButton" data-toggle="modal" data-target="#countryModal"><img
                src="${country._flag}"
                class="card-img-top" alt="Brasil"></button>
                    <div class="card-body">
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
    myCatalog.innerHTML = result
}

/**
 * Função que ordena o array de paises pelo nome e guarda o array ordenado na LocalStorage
 */
export function sortCountries() {
    countries.sort(Country.compare)
}