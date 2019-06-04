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
let continentCatalogStyle = ""


document.querySelector('#africaCatalog').addEventListener('click', function() {
    continentCatalogStyle = 'africa'    
    addCatalogValue(continentCatalogStyle)
})

document.querySelector('#americaCatalog').addEventListener('click', function() {  
    continentCatalogStyle = 'america'
    location.href = '/HTML/countries.html'
    addCatalogValue(continentCatalogStyle)
})

document.querySelector('#asiaCatalog').addEventListener('click', function() {
    continentCatalogStyle = 'asia'
    addCatalogValue(continentCatalogStyle)
})

document.querySelector('#europaCatalog').addEventListener('click', function() {
    continentCatalogStyle = 'europa'
    addCatalogValue(continentCatalogStyle)
})

document.querySelector('#oceaniaCatalog').addEventListener('click', function() {
    continentCatalogStyle = 'oceania' 
    addCatalogValue(continentCatalogStyle)  
})

function addCatalogValue(continentCatalogStyle) {    
    sessionStorage.setItem('continentCatalogStyle', continentCatalogStyle)
    location.href = '../../HTML/countries.html'
}