let continentStyle = ''
window.onload = function () {
    if (sessionStorage.getItem('continentStyle')) {
        continentStyle = JSON.parse(sessionStorage.getItem('continentStyle'))
    }
    // else {
    //      // !Para eliminar
    //     continentStyle = 'africa'
    //     // !Para eliminar
    //     sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    // }
    styleChangeByContinent()
}
// !Page Looking
function styleChangeByContinent() {
    if (continentStyle == 'africa') {
        document.querySelector('#Bandeiras').src = '/Images/africanFlags.png'
        document.querySelector('#Localizacao').src = '/Images/africaTerritorios.png'
        document.querySelector('#Bandeiras').src = '/Images/africanFlags.png'
        document.querySelector('title').innerHTML += 'África'
        document.body.style.backgroundColor = '#F5BB00'
        document.querySelector('#continentHeader').innerHTML = 'África'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    } else if (continentStyle == 'america') {
        document.querySelector('#Bandeiras').src = '/Images/africanFlags.png'
        document.querySelector('#Localizacao').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Americas_%28orthographic_projection%29.svg/250px-Americas_%28orthographic_projection%29.svg.png'
        document.querySelector('#Bandeiras').src = 'https://st2.depositphotos.com/2172651/9604/v/950/depositphotos_96048400-stock-illustration-the-americas-and-the-caribbean.jpg'
        document.querySelector('title').innerHTML += 'América'
        document.body.style.backgroundColor = '#4AB71B'
        document.querySelector('#continentHeader').innerHTML = 'América'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    } else if (continentStyle == 'asia') {
        console.log('man')
        document.querySelector('#Bandeiras').src = '/Images/africanFlags.png'
        document.querySelector('#Localizacao').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Asia_%28orthographic_projection%29.svg/250px-Asia_%28orthographic_projection%29.svg.png'
        document.querySelector('#Bandeiras').src = 'https://www.flagsimporter.com/pub/media/catalog/product/cache/image/600x800/e9c3970ab036de70892d86c6d221abfe/a/s/asianstick__56183.1384290081.1280.1280.jpgc-2_2.jpg'
        document.querySelector('title').innerHTML += 'Ásia'
        document.body.style.backgroundColor = '#BE3DE3'
        document.querySelector('#continentHeader').innerHTML = 'Ásia'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    } else if (continentStyle == 'europa') {
        document.querySelector('#Bandeiras').src = '/Images/africanFlags.png'
        document.querySelector('#Localizacao').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Europe_orthographic_Caucasus_Urals_boundary.svg/250px-Europe_orthographic_Caucasus_Urals_boundary.svg.png'
        document.querySelector('#Bandeiras').src = 'https://st2.depositphotos.com/3757793/7572/v/950/depositphotos_75727495-stock-illustration-flags-of-europe-complete-set.jpg'
        document.querySelector('title').innerHTML += 'Europa'
        document.body.style.backgroundColor = '#204987'
        document.querySelector('#continentHeader').innerHTML = 'Europa'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    } else if (continentStyle == 'oceania') {
        document.querySelector('#Bandeiras').src = '/Images/africanFlags.png'
        document.querySelector('#Localizacao').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Oceania_%28orthographic_projection%29.svg/220px-Oceania_%28orthographic_projection%29.svg.png'
        document.querySelector('#Bandeiras').src = 'https://online.seterra.com/mapimage/2018.png'
        document.querySelector('title').innerHTML += 'Oceânia'
        document.body.style.backgroundColor = '#B7541B'
        document.querySelector('#continentHeader').innerHTML = 'Oceânia'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    }

    turnImgintoBtn()
}

function turnImgintoBtn() {
    let imgsBtn = document.querySelectorAll('.card-img-top')
    for (const imgBtn of imgsBtn) {
        imgBtn.addEventListener('click', function () {
            playQuizzByType(this.id);
        })
    }

}


function playQuizzByType(id) {
    sessionStorage.setItem('ChosenQuizz', JSON.stringify(id))
    location.href = '../../HTML/flagQuizz.html'
}