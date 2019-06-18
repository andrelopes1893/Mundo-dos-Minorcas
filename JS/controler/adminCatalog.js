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

        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#29ABE2'
        });
        toast.fire({
            type: 'success',
            title: '<span style="color:#FFFFFF">País adicionado com sucesso!<span>'
        })
        $('#newCountryModal').modal('hide')
        event.preventDefault()
    })
}


if (document.querySelector('.filterCatalog') != null) {
    document.querySelector('.filterCatalog').addEventListener('click', function () {
        renderTable()
    })
}

function renderTable() {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }

    if (document.querySelector('#stlOrder').value == "Ordem Alfabetica Crescente dos Continentes") {        
        countries.sort(Country.ascendentContinentOrder)
    }

    if (document.querySelector('#stlOrder').value == "Ordem Alfabetica Decrescente dos Continentes") {
        countries.sort(Country.descendentContinentOrder)
    }

    document.querySelector('#countriesTableBody').innerHTML = ''

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
    removeButtons()
    editButtons()
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

function removeCountry(name) {
    for (let i = 0; i < countries.length; i++) {
        if (countries[i]._name === name) {
            countries.splice(i, 1)
        }
    }
    const toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        background: '#29ABE2'
    });
    toast.fire({
        type: 'success',
        title: '<span style="color:#FFFFFF">País removido com sucesso!<span>'
    })
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

function submitEdit(id) {
    document.getElementById('editCountry').addEventListener('click', function () {
        if (localStorage.countries) {
            countries = JSON.parse(localStorage.countries)
        }
        for (const country of countries) {
            if (country._id == id) {
                country._name = document.querySelector('#txtEditCountryName').value
                country._continent = document.querySelector('#newSltContinent').value
                country._capital = document.querySelector('#txtEditCountryCapital').value
                country._language = document.querySelector('#txtEditCountryLanguage').value
                country._information = document.querySelector('#txtEditCountryInfo').value
                country._location = document.querySelector('#txtEditCountryLocation').value
                country._flag = document.querySelector('#txtEditCountryFlag').value
            }
        }
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#29ABE2'
        });
        toast.fire({
            type: 'success',
            title: '<span style="color:#FFFFFF">País editado com sucesso!<span>'
        })
        localStorage.setItem('countries', JSON.stringify(countries))
        $('#ModalEditCountry').modal('hide')
    })
}

function editButtons() {
    let editButtons = document.getElementsByClassName('editBtn')
    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            EditFormInfoAdd(this.id)
            submitEdit(this.id)
            renderTable()
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