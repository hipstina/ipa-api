'use strict';


switch(x) {
case `${e.target.id}` == undefined:
    styleURL == ''
case `${Number(abvSlider.value)}` == undefined:
    abvURL == ''; 
}



// -----

function buildURL(e) {
let apiURL = 'https://api.punkapi.com/v2/beers';
let resultsPerPage = `?pages=1&per_page=80`;

let styleURL = `&beer_name=` + `${e.target.id}`;

let abvURL =  `&abv_gt=` + `${Number(abvSlider.value)}` + `&abv_lt=` + `${Number(abvSlider.value) + 1}`;
 
let ibuURL = `&ibu_gt=` + `${Number(ibuSlider.value)}` + `&ibu_lt=` + `${Number(ibuSlider.value) + 10}`;
 
let foodPair = `&beer_name=` + `${e.target.id}`;

 URL = `${apiURL}` + `${resultsPerPage}` + `${styleURL}` + `${abvURL}` + `${ibuURL}` + `${foodPair}`;

 console.log(URL); 
}
// -----

function constructFilter(e) {
    let fetchURL = 'https://api.punkapi.com/v2/beers';
    if (e.target.id == "bartender") {
        fetchURL += "/random";
    } else if (e.target.id == "beerMe") { 
        fetchURL += `?pages=1&per_page=80`;
    } else if (e.target.id == "citrusy") {
        fetchURL += `?ids=89|142|233|237|256|262|310`;
    } else if (e.target.id == "seasonal") {
        fetchURL += `?ids=98|130|156`;
    } else if (e.target.id == "tartfunky") {
        fetchURL += `?ids=3|19|35|94|143|151|160|169|193|299`;
    } else if (e.target.id == "experimental") {
        fetchURL += `?ids=166|182|229|235|266`;
    } else if (e.target.id == "abvSlider") {
        console.log(Number(abvSlider.value));
        fetchURL += `?pages=1&per_page=80&abv_gt=` + `${Number(abvSlider.value)}` + `&abv_lt=` + `${Number(abvSlider.value) + 1}`;
    } else if (e.target.id == "ibuSlider") {
        fetchURL += `?pages=1&per_page=80&ibu_gt=` + `${Number(ibuSlider.value)}` + `&ibu_lt=` + `${Number(ibuSlider.value) + 10}`;
    } else fetchURL += `?pages=1&per_page=80` + `&beer_name=` + `${e.target.id}`;
    makeRequest(fetchURL);

}