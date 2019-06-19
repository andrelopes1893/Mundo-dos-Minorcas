var timeLeft = 30;
var elem = document.querySelector('.timer');
var timerId = setInterval(countdown, 1000); // 30 seconds

function countdown() {
    if (timeLeft == -1) {
        afterStop();
    } else {
        elem.innerHTML = 'Restam-te ' + timeLeft + " s" ;
        timeLeft--;
    }
}

function afterStop() {
    document.getElementsByClassName('optionsRow').disabled = true
}