import Country from '../models/countriesModels.js'

import {
    removeAcento
} from '../controler/countries.js'

export let countries = []

window.onload = function () {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }
    renderTable()
}

if (document.querySelector('#createCountryForm') != null) {
    document.querySelector('#createCountryForm').addEventListener('submit', function (event) {
        const countryName = document.querySelector('#txtCountryName').value
        const countryCapital = document.querySelector('#txtCountryCapital').value
        const countryContinent = document.querySelector('#stlContinent').value
        const countryLanguage = document.querySelector('#txtCountryLanguage').value
        const countryInfo = document.querySelector('#txtInfo').value
        const countryLocation = document.querySelector('#txtLocation').value
        const countryFlag = document.querySelector('#txtFlag').value

        if (!isRepeated(countryName)) {
            countries.push(new Country(countryName, countryCapital, countryFlag, countryLanguage, countryContinent, countryInfo, countryLocation))
            localStorage.setItem('countries', JSON.stringify(countries))
            renderTable()
            document.querySelector('#createCountryForm').reset();
        }

        event.preventDefault()
    })
}

//função de renderizar a tabela de paises
function renderTable() {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }

    document.querySelector("#stlOrder").addEventListener("change", function () {
        if (document.querySelector('#stlOrder').value == "Ordem Alfabetica Crescente dos Continentes") {
            countries.sort(Country.continentFilterascendentAlphabeticOrder)
        }
        if (document.querySelector('#stlOrder').value == "Ordem Alfabetica Decrescente dos Continentes") {
            countries.sort(Country.continentFilterDescendentAlphabeticOrder)
        }
        if (document.querySelector('#countriesTableBody') != null) {
    
            let r = 0
            for (const country of countries) {
                r++
                document.querySelector('#countriesTableBody').innerHTML += `<tr>
                                                <th scope="row">${r}</th>
                                                <td>${country._continent}</td>
                                                <td>${country._name}</td>
                                                <td><button type="button" id="${country._id}" data-toggle="modal" data-target="#ModalEditCountry" class="btn editBtn"><img src="/Images/lock.png" alt="Editar"></button></td> 
                                                <td><button type="button" id="${country._name}" class="btn remove"><img src="/Images/x.png" alt="Remover"></button></td>
                                            </tr> `
            }

        }
        removeButtons()
        editButtons()
    })
}

function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeCountry(this.id)
            renderTable()
        })
    }
}

//função de remover pais
function removeCountry(name) {
    for (let i = 0; i < countries.length; i++) {
        if (countries[i]._name === name) {
            countries.splice(i, 1)
        }
    }
    localStorage.setItem('countries', JSON.stringify(countries))
    $('#ModalEditCountry').modal('hide')
}

function isRepeated(name) {
    for (const country of countries) {
        if (country._name.toLowerCase() === name.toLowerCase()) {
            alert('asd')
            return true
        }
    }
    return false
}

//função de editar pais do catalogo
function submitEdit(id) {
    document.getElementById('editCountry').addEventListener('click', function () {

        if (localStorage.countries) {
            countries = JSON.parse(localStorage.countries)
        }
        let txtName = document.getElementById('txtEditCountryName').value
        let txtContinent = document.querySelector('#newSltContinent').value
        let txtCapital = document.querySelector('#txtEditCountryCapital').value
        let txtLanguage = document.querySelector('#txtEditCountryLanguage').value
        let txtInfo = document.querySelector('#txtEditCountryInfo').value
        let txtLocation = document.querySelector('#txtEditCountryLocation').value
        let txtFlag = document.querySelector('#txtEditCountryFlag').value
        for (const country of countries) {
            if (id == country._id) {
                console.log(country._id)
                country._name = txtName
                country._continent = txtContinent
                country._capital = txtCapital
                country._language = txtLanguage
                country._information = txtInfo
                country._location = txtLocation
                country._flag = txtFlag
            }
        }
        localStorage.setItem('countries', JSON.stringify(countries))
        $('#ModalEditCountry').modal('hide')
        alert("Catalogo Editado com Sucesso")
        // ?Questionable solution
        location.reload()
    })
}

function editButtons() {
    let editButtons = document.getElementsByClassName('editBtn')

    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            EditFormInfoAdd(this.id)
            submitEdit(this.id)
        })
    }
}

function EditFormInfoAdd(id) {
    for (const country of countries) {
        if (country._id == id) {
            document.querySelector('#txtEditCountryName').value = country._name
            document.querySelector('#newSltContinent').value = country._continent
            document.querySelector('#txtEditCountryCapital').value = country._capital
            document.querySelector('#txtEditCountryLanguage').value = country._language
            document.querySelector('#txtEditCountryInfo').value = country._information
            document.querySelector('#txtEditCountryLocation').value = country._location
            document.querySelector('#txtEditCountryFlag').value = country._flag
        }
    }
}