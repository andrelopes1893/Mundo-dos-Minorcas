import Country from '../models/countriesModels.js'

export let countries = []

if (localStorage.countries) {
    countries = JSON.parse(localStorage.countries)
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
    let countriesTableBody = document.querySelector('#countriesTableBody')
    countriesTableBody.innerHTML = ''

    let r = 0
    for (const country of countries) {
        r++
        countriesTableBody.innerHTML += `<tr>
                                        <th scope="row">${r}</th>
                                        <td>${country.name}</td>
                                        <td>${country.continent}</td>
                                        <td><button type="button" id="${country.name}" data-toggle="modal" data-target="#ModalEditCountry" class="btn editBtn"><img src="/Images/lock.png" alt="Editar"></button></td> 
                                        <td><button type="button" id="${country.name}" class="btn remove"><img src="/Images/x.png" alt="Remover"></button></td>
                                    </tr> `
    }
    editButtons()
    removeButtons()
}

function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            // O this.id é o valor do atributo id de cada elemento button
            removeCountry(this.id)
        })
    }
}

function removeCountry(name) {
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].name === name) {
            countries.splice(i, 1)
        }
    }

    localStorage.setItem('countries', JSON.stringify(countries))
    renderTable()
}

function isRepeated(name) {
    for (const country of countries) {
        if (country.name.toLowerCase() === name.toLowerCase()) {
            alert('asd')
            return true
        }
    }
    return false
}

function editEvent2() {
    document.querySelectorAll('.btn.editBtn').addEventListener('click', function () {
        for (const country of countries) {
            document.getElementById('txtEditCountryName').value = Country.getIdByName(country.name)

            console.log(Country.getIdByName(country.name));
        }
    })
}

function editButtons() {
    let editButtons = document.getElementsByClassName('btn edit')
    for (const elem of editButtons) {
        elem.addEventListener('click', function () {
            editEvent2(this.id)
        })
    }
}

// function editCountry(name) {
//     document.querySelector('#editCountry').addEventListener('submit', function () {
//         const editUsername = document.querySelector('#txtEditCountryName').value
//         const newSltContinent = document.querySelector('#newSltContinent').value
//     })

//     console.log(editUsername);
//     console.log(newSltContinent);

//     newCountry.replace(countryName, editUsername)
//     newCountry.replace(countryContinent, newSltContinent)
//     countries.push(newCountry)
//     localStorage.setItem('countries', JSON.stringify(countries))
// }