let continentStyle=''
let ChosenQuizz=''
window.onload = function () {
    if (sessionStorage.getItem('continentStyle')) {
        continentStyle = JSON.parse(sessionStorage.getItem('continentStyle'))
    } else {
        // !Para eliminar
        continentStyle = 'africa'
        // !Para eliminar
        sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    }

    if(sessionStorage.getItem('ChosenQuizz')){
        ChosenQuizz =  JSON.parse(sessionStorage.getItem('ChosenQuizz'))
    }
    else{

        ChosenQuizz = 'africa'
        // !Para eliminar
        sessionStorage.setItem('ChosenQuizz', JSON.stringify(ChosenQuizz))
    }
}
