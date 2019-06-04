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
            items:1
        },
        1000:{
            items:3
        }
    }
})