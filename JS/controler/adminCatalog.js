import Country from '../models/countriesModels.js'

export let countries = []

window.onload = function () {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }
    renderTable()
}

document.querySelector('#createCountryForm').addEventListener('submit', function (event) {
    const countryName = document.querySelector('#txtCountryName').value
    const countryCapital = document.querySelector('#txtCountryCapital').value
    const countryContinent = document.querySelector('#stlContinent').value
    const countryLanguage = document.querySelector('#txtCountryLanguage').value
    const countryInfo1 = document.querySelector('#txtInfo1').value
    const countryInfo2 = document.querySelector('#txtInfo2').value
    const countryImg1 = document.querySelector('#imgCarousel1').value
    const countryImg2 = document.querySelector('#imgCarrousel2').value
    const countryImg3 = document.querySelector('#imgCarrousel3').value

    if (!isRepeated(countryName)) {
        countries.push(new Country(countryName, countryCapital, countryLanguage, countryContinent, countryInfo1, countryInfo2, countryImg1, countryImg2, countryImg3))
        localStorage.setItem('countries', JSON.stringify(countries))
        renderTable()
    }

    event.preventDefault()
})

function renderTable() {
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }
    let countriesTableBody = document.querySelector('#countriesTableBody')
    countriesTableBody.innerHTML = ''

    let r = 0
    for (const country of countries) {
        r++
        countriesTableBody.innerHTML += `<tr>
                                        <th scope="row">${r}</th>
                                        <td>${country._name}</td>
                                        <td>${country._continent}</td>
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
            // O this.id é o valor do atributo id de cada elemento button
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
    document.getElementById('editCountry').addEventListener('click', function (event) {

        let txtName = document.getElementById('txtEditCountryName').value

        for (const country of countries) {
            if (country._id == id) {
                country._name = txtName
                localStorage.setItem('countries', JSON.stringify(countries))
                renderTable()
            }
        }
        $('#ModalEditCountry').modal('hide')
    })
}

function editButtons() {

    let editButtons = document.getElementsByClassName('editBtn')

    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            // document.getElementById('txtEditCountryName').value = Country.getNameById(this.id)
            //editNameContinent(this.id)
            submitEdit(this.id)

        })
    }
}