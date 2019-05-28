let africa = ""

document.querySelector('#africanBtnQuiz').addEventListener('click', function() {
    africa = 'africa'
    sessionStorage.setItem('africa', JSON.stringify(africa))
    location.href = '../../HTML/continentQuizz.html'
})