 let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

 window.onload = function () {
    if (localStorage.getItem('page')) {
       localStorage.removeItem('page')
    }
 }

 renderCatalog()


 ConstructPaginationButton()

 function ConstructPaginationButton() {


    let quantity = a.length / 16
    let quantityTostring = String(quantity)
    let contains=false
   


    for (let i = 0; i<u.length;i++) {
       if(quantityTostring[i]=='.'){
          contains=true
       }
    }

    if (contains == true) {
       quantity = parseInt(quantity) + 1
    } else {
       quantity = quantity
    }

    let paginationHolder = document.querySelector('.pagination')
    paginationHolder.innerHTML = ``
    paginationHolder.innerHTML += `<li class="page-item"><button id='prev'class="page-link">Prev</button></li>`
    for (let i = 1; i <= quantity; i++) {
       paginationHolder.innerHTML += `
     
             <li class="page-item"><button  id='${i*16}'class="page-link">${i}</button></li>`
    }
    paginationHolder.innerHTML += `<li class="page-item"><button id="next"class="page-link">Next</button></li>`
    getPageSelection()
 }

 function getPageSelection() {
    let pagesLinks = document.querySelectorAll(".page-link")
    for (const button of pagesLinks) {
       button.addEventListener('click', function () {
          if (this.id != 'prev' && this.id != 'next') {
             localStorage.setItem('page', JSON.stringify(this.id))
          }
          renderCatalog(this.id)
       })
    }
 }

 function renderCatalog(quantity = 16) {
    if (quantity == 'prev' || quantity == 'next') {
       let value = 16;
       if (quantity == 'prev') {
          if (JSON.parse(localStorage.getItem('page'))) {
             if (JSON.parse(localStorage.getItem('page')) == 16) {
                value = 0

             }
             quantity = Number(JSON.parse(localStorage.getItem('page'))) - value

          } else {
             quantity = 16

          }
          localStorage.setItem('page', JSON.stringify(quantity))

       } else {
          if (JSON.parse(localStorage.getItem('page'))) {
             if (JSON.parse(localStorage.getItem('page')) == a.length) {
                value = 0
             }
             quantity = Number(JSON.parse(localStorage.getItem('page'))) + value
          } else {
             quantity = 32
          }
          localStorage.setItem('page', JSON.stringify(quantity))
       }
    }
    let cb = document.querySelector('#containerCatalog')
    cb.innerHTML = ``;
    for (let i = Number(quantity) - 16; i < Number(quantity); i++) {
       cb.innerHTML += `,${a[i]}`

       if ((i + 1) == a.length) {
          break;
       }



    }
 }