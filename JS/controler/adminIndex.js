document.querySelector('.usersStats').addEventListener('click', function() {
    location.href = '/HTML/adminUsers.html'
})

document.querySelector('.catalogStats').addEventListener('click', function() {
    location.href = '/HTML/adminCatalog.html'
})

document.querySelector('.quizzesStats').addEventListener('click', function() {
    location.href = '/HTML/adminQuizz.html'
})

document.querySelector('.suggestionsStats').addEventListener('click', function() {
    location.href = '/HTML/adminSugestion.html'
})

window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})