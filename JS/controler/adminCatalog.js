import Country from '../models/countriesModels.js'
import {
    signOut
} from '../controler/loginAndSignup.js'

export let countries = []

window.onload = function () {
    confirmSystemHaker()
    if (localStorage.countries) {
        countries = JSON.parse(localStorage.countries)
    }
    renderTable()
    infoCardFill()
}

/**
 * Function that will prevent hacking
 */
function confirmSystemHaker() {
    if (sessionStorage.getItem("loggedUserId") == null) {
        location.href = '/HTML/loginAndSigup.html'
    } else {
        let users = JSON.parse(localStorage.getItem("users"))
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"))
        for (const user of users) {

         if(user._id==id){
             if(user._accountType==2){
                localStorage.removeItem('loggedUserId');
                location.href = '/HTML/loginAndSigup.html'
             }
         }
        }
    }
}
//Sign out
if (document.querySelector('#leaveAccount') != null) {
    document.querySelector('#leaveAccount').addEventListener('click', signOut)
}

/**
 * Form to create a new country
 * @param {String} countryName return the value of the country that was written
 * @param {String} countryCapital return the value of the capital that was written
 * @param {String} countryContinent return the value of the continent that was written
 * @param {String} countryLevel return the value of the level that was chosen
 * @param {String} countryLanguage return the value of the language that was written
 * @param {String} countryInfo return the value of the info that was written
 * @param {String} countryLocation return the value of the location that was written
 * @param {String} countryFlag return the value of the flag that was written
 */
if (document.querySelector('#createCountryForm') != null) {
    document.querySelector('#createCountryForm').addEventListener('submit', function (event) {
        const countryName = document.querySelector('#txtCountryName').value
        const countryCapital = document.querySelector('#txtCountryCapital').value
        const countryContinent = document.querySelector('#stlContinent').value
        const countryLevel = document.querySelector('#stlLevel').value
        const countryLanguage = document.querySelector('#txtCountryLanguage').value
        const countryInfo = document.querySelector('#txtInfo').value
        const countryLocation = document.querySelector('#txtLocation').value
        const countryFlag = document.querySelector('#txtFlag').value

        if (!isRepeated(countryName)) {
            countries.push(new Country(countryName, countryCapital, countryFlag, countryLanguage, countryContinent, countryLevel, countryInfo, countryLocation))
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


    let countryOutput = countries
    if (document.querySelector('#stlOrder')) {

        if (document.querySelector('#stlOrder').value == "Ordem Alfabetica Crescente dos Continentes") {
            countryOutput.sort(Country.ascendentContinentOrder)
        }

        if (document.querySelector('#stlOrder').value == "Ordem Alfabetica Decrescente dos Continentes") {
            countryOutput.sort(Country.descendentContinentOrder)
        }
        if (document.querySelector('#stlOrder').value == "OrdemDeVisitas") {
            countryOutput.sort(Country.sortByMostVisited)
        }

        if (document.querySelector('#countriesTableBody') != null) {
            document.querySelector('#countriesTableBody').innerHTML = ''
        }

        let r = 0
        for (const country of countryOutput) {
            r++
            if (document.querySelector('#countriesTableBody') != null) {
                document.querySelector('#countriesTableBody').innerHTML += `<tr>
                                                                            <th scope="row">${r}</th>
                                                                            <td>${country._continent}</td>
                                                                            <td>${country._name}</td>
                                                                            <td>${country._level}</td>
                                                                            <td><button type="button" id="${country._id}" data-toggle="modal" data-target="#ModalEditCountry" class="btn editBtn"><img src="/Images/lock.png" alt="Editar"></button></td> 
                                                                            <td><button type="button" id="${country._name}" class="btn remove"><img src="/Images/x.png" alt="Remover"></button></td>
                                                                        </tr> `
            }
        }
        removeButtons()
        editButtons()
    }
}

/**
 * Function to set all the remove buttons
 */
function removeButtons() {
    let removeBtns = document.getElementsByClassName("btn remove")
    for (const elem of removeBtns) {
        elem.addEventListener("click", function () {
            removeCountry(this.id)
            renderTable()
        })
    }
}

/**
 * Function to remove that country that was selected
 * @param {String} name parameter that will save the country name that was written
 */
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

/**
 * Function to check if the country added is repeated or not
 * @param {String} name parameter that will save the country name that was written
 */
function isRepeated(name) {
    for (const country of countries) {
        if (country._name.toLowerCase() === name.toLowerCase()) {
            Swal.fire({
                type: 'error',
                title: 'O país já existe :(',
                padding: '1rem',
                background: '#CCCC33',
                confirmButtonColor: '#29ABE2'
            })
            return true
        }
    }
    return false
}

/**
 * Function to edit the country we selected
 * @param {String} countries return the data that is set on localStorage but the countries array
 */
function submitEdit(id) {
    document.getElementById('editCountry').addEventListener('click', function () {
        if (localStorage.countries) {
            countries = JSON.parse(localStorage.countries)
        }
        for (const country of countries) {
            if (country._id == id) {
                //Saving all the values
                country._name = document.querySelector('#txtEditCountryName').value
                country._continent = document.querySelector('#newSltContinent').value
                country._level = document.querySelector('#stlLevelEdit').value
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

/**
 * Function to set all the edit buttons
 */
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

/**
 * Function to show the correct data of the selected country when the modal is opened 
 */
function EditFormInfoAdd(id) {
    for (const country of countries) {
        if (country._id == id) {
            document.querySelector('#txtEditCountryName').value = country._name
            document.querySelector('#newSltContinent').value = country._continent
            document.querySelector('#txtEditCountryCapital').value = country._capital
            document.querySelector('#txtEditCountryLanguage').value = country._language
            document.querySelector('#stlLevelEdit').value = country._level
            document.querySelector('#txtEditCountryInfo').value = country._information
            document.querySelector('#txtEditCountryLocation').value = country._location
            document.querySelector('#txtEditCountryFlag').value = country._flag
        }
    }
}

/**
 * Function 
 */
function infoCardFill() {
    if (document.querySelector('#catalogQuantity') != null) {
        document.querySelector('#catalogQuantity').innerHTML = countries.length
    }

    let countriesSortbyVisit = countries

    if (countries.length > 0) {
        countriesSortbyVisit.sort(Country.sortByMostVisited)
        if (document.querySelector('#mostVisited') != null) {
            document.querySelector('#mostVisited').innerHTML = countriesSortbyVisit[0]._name
        }
    }
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})