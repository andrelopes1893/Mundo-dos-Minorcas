// !this sis a jquery code and it makes the owl carousel work
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    mouseDrag: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
})

confirmSystemHaker();

/**
 * Function that prevents hacking
 */
function confirmSystemHaker(){
    if (sessionStorage.getItem("loggedUserId")==null) {
        location.href = '/HTML/loginAndSigup.html'
    }
}

//Animation between pages changes
window.addEventListener('beforeunload', function () {
    document.body.classList.add('animate-out')
})