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


function buildTag() {

    let tagWrapper = document.getElementById('tagWrapper');
 
    if (!tagWrapper.hasChildNodes == false) {
        console.log(tagWrapper.hasChildNodes);
     tagWrapper.innerHTML = 
     `<p class="tag " id="tagStyleID">× <span class="tag-text" id="tag-style"></span></p>
 
     <p class="tag " id="tagAbvIDMin">× <span class="tag-text" id="tag-abv"></span></p>
 
     <p class="tag " id="tagAbvIDMax">× <span class="tag-text" id="tag-abv-max"></span></p>
 
     <p class="tag " id="tagIbuIDMin">× <span class="tag-text" id="tag-ibu"></span></p>
 
     <p class="tag " id="tagIbuIDMax">× <span class="tag-text" id="tag-ibu-max"></span></p>`
    }  
 
     let tags = document.getElementsByClassName('tag');
     for(let tag of tags) {
         tag.addEventListener('click', deleteTag);
         console.log('STYLE TAG ready to be DELETED')
     }
 
 
     updateTag();
 }

 function updateTag() {
    let tagStyle = document.getElementsByName('filter');
    let styleTag = document.getElementById('tag-style');

    for(let style of tagStyle) {
        style.checked? styleTag.textContent =  style.previousElementSibling.textContent : false
    }

    let abvTag = document.getElementById('tag-abv');
    abvTag.textContent = `${Number(abvSliderA.value)}%` ;

    let ibuTag = document.getElementById('tag-ibu');
    ibuTag.textContent = `${Number(ibuSliderA.value) + 1}` ;

    let abvTagMax = document.getElementById('tag-abv-max');
    abvTagMax.textContent = `${Number(abvSliderB.value)}%` ;

    let ibuTagMax = document.getElementById('tag-ibu-max');
    ibuTagMax.textContent = `${Number(ibuSliderB.value)}` ;

    
}

function deleteTag(e) {
    // when tags are deleted, filters revert to defaults. No tags for defaults.
        if (e.target.parentNode.id == 'tagStyleID') {
            // when style tag is deleted, 'all styles' is checked  
            document.getElementById('tagStyleID').remove();
            let beerStyle = document.getElementById('all');
            beerStyle.checked = true;
            console.log('STYLE TAG DELETED')
            return wipeMenu(e); 
        } else if (e.target.parentNode.id == 'tagAbvIDMin') {
            // when abv tag is deleted, revert to default ABV  
            document.getElementById('tagAbvIDMin').remove();
            let abvSliderA = document.getElementById('abvSliderA');
            abvSliderA.value = '0';
            return wipeMenu(); 
        } else if (e.target.parentNode.id == 'tagAbvIDMax') {
            // when abv tag is deleted, revert to default ABV  
            document.getElementById('tagAbvIDMax').remove();
            let abvSliderBMax = document.getElementById('abvSliderB');
            abvSliderBMax.value = '18.5';
            return wipeMenu(); 
        } else if (e.target.parentNode.id == 'tagIbuIDMin') {
            // when ibu tag is deleted, revert to default IBU  
            document.getElementById('tagIbuIDMin').remove();
            let ibuSliderA = document.getElementById('ibuSliderA');
            ibuSliderA.value = '0';
            return wipeMenu();; 
        } else if (e.target.parentNode.id == 'tagIbuIDMax') {
            // when ibu tag is deleted, revert to default IBU  
            document.getElementById('tagIbuIDMax').remove();
            let ibuSliderB = document.getElementById('ibuSliderB');
            ibuSliderB.value = '255';
            return wipeMenu(); 
        } else e.target.remove();

        
}