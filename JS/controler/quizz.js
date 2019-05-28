let continentStyle = ""

document.querySelector('#africanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'africa'
    addValue(continentStyle)
})

document.querySelector('#americanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'america'
    addValue(continentStyle)
})

document.querySelector('#asianBtnQuiz').addEventListener('click', function() {
    continentStyle = 'asia'
    addValue(continentStyle)
})

document.querySelector('#europeanBtnQuiz').addEventListener('click', function() {
    continentStyle = 'europa'
    addValue(continentStyle)
})

document.querySelector('#oceaniaBtnQuiz').addEventListener('click', function() {
    continentStyle = 'oceania' 
    addValue(continentStyle)  
})

function addValue(continentStyle) {
    sessionStorage.setItem('continentStyle', JSON.stringify(continentStyle))
    location.href = '../../HTML/continentQuizz.html'
}