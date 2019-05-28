window.onload = function () {
    if (sessionStorage.getItem('continentStyle')) {
        continentStyle = JSON.parse(sessionStorage.getItem('continentStyle'))
    }

    styleChangeByContinent()
}

function styleChangeByContinent() {
    if (continentStyle == 'africa') {
        document.body.style.backgroundColor = '#F5BB00'
        document.querySelector('#continentHeader').innerHTML = 'África'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    }

    if (continentStyle == 'america'){
        document.body.style.backgroundColor = '#4AB71B'
        document.querySelector('#continentHeader').innerHTML = 'América'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    }

    if (continentStyle == 'asia'){
        document.body.style.backgroundColor = '#BE3DE3'
        document.querySelector('#continentHeader').innerHTML = 'Ásia'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    }

    if (continentStyle == 'europa'){
        document.body.style.backgroundColor = '#204987'
        document.querySelector('#continentHeader').innerHTML = 'Europa'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    }

    if (continentStyle == 'oceania'){
        document.body.style.backgroundColor = '#B7541B'
        document.querySelector('#continentHeader').innerHTML = 'Oceânia'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    }
}