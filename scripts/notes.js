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
// scroll filter 1.0
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

// scroll filter 2.0
function constructFilter(e) {
    let fetchURL = 'https://api.punkapi.com/v2/beers?page=1&per_page=80';
    let beerStyle = '';
    let abvURL = `&abv_gt=` + `${Number(abvSliderA.value)}` + `&abv_lt=` + `${Number(abvSliderB.value)}`
    let ibuURL =  `&ibu_gt=` + `${Number(ibuSliderA.value)}` + `&ibu_lt=` + `${Number(ibuSliderB.value) }`;

    if (e.target.id == "random"  ) {
        fetchURL = "https://api.punkapi.com/v2/beers/random";
        console.log(e.target.id,"LOOK")
        return makeRequest(fetchURL);
    }  

    if (e.target.id == "rIcon"  ) {
        fetchURL = "https://api.punkapi.com/v2/beers/random";
        console.log(e.target.id,"LOOK HERE")
        return makeRequest(fetchURL);
    }  

    if (e.target.id == 'abvSliderA' || e.target.id == 'abvSliderB' ||
        e.target.id == 'ibuSliderA' || e.target.id == 'ibuSliderB') {
            let beerfilter = document.getElementsByName('filter');
            // find which beerStyle is checked everytime slider is changed
            beerfilter.forEach(fil => {
                if (fil.checked == true && fil.id != 'all') {
                    beerStyle = `&beer_name=` + `${fil.id}`;
                    fetchURL = `${fetchURL}` + `${abvURL}` + `${ibuURL}` + `${beerStyle}`;
                } 
            });
            fetchURL = `${fetchURL}` + `${abvURL}` + `${ibuURL}` + `${beerStyle}`;
        }  
        
    if (e.target.id == 'all') {  beerStyle =  ''; } 
    else if (e.target.id == 'beerMe') {  beerStyle = ''; } 
    
    if (e.target.id == 'ipa' || e.target.id == 'wheat' ||
        e.target.id == 'pale_ale' || e.target.id == 'pilsner' ||
        e.target.id == 'porter' || e.target.id == 'saison' ||
        e.target.id == 'christmas' || e.target.id == 'stout' ||
        e.target.id == 'hop' || e.target.id == 'malt' || 
        e.target.id == 'orange' || e.target.id == 'black' ||
        e.target.id == 'tart' || e.target.id == 'lager' ||
        e.target.id == 'chili' ) {
            beerStyle =  `&beer_name=` + `${e.target.id}`;
            fetchURL = `${fetchURL}` + `${abvURL}` + `${ibuURL}` + `${beerStyle}`;
        }

    console.log( `${fetchURL}`, "end of fn" );
    

    return makeRequest(fetchURL);

}