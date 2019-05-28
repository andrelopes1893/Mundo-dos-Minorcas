window.onload = function() {
    if (sessionStorage.getItem('africa')) {
        africa = JSON.parse(sessionStorage.getItem('africa'))
    }

    if (africa == 'africa') {
        document.body.style.backgroundColor = '#4AB71B'
        document.querySelector('#continentHeader').innerHTML = 'África'
        document.querySelector('#continentHeader').style.color = '#FFFFFF'
    } 
}