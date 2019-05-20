import Country from "../models/countriesModels.js"

export let countries = []

if (localStorage.countries) {
    countries = JSON.parse(localStorage.countries)
}
else{
    let newCountry1 = new Country('Portugal', 'Europa', 'Lisboa' , 'Português' , 'pt' , 'Portugal' , '../../Images/Portugal.png' , 'Info 1' , 'Info 2' , '../../Images/Noruega.png' , '../../Images/Brasil.png' , new Date())
    countries.push(newCountry1)
    localStorage.setItem("countries", JSON.stringify(countries))
}