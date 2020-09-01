'use strict';

document.addEventListener("DOMContentLoaded", constructFilter);

document.getElementById("beerMe").addEventListener("click", wipeMenu);
document.getElementById("beerMe").addEventListener("click", deleteTag);
document.getElementById("beerMe").addEventListener("click", resetSliders);
document.getElementById("beerMe").addEventListener("click", abvOutput);
document.getElementById("beerMe").addEventListener("click", ibuOutput);

document.getElementById("random").addEventListener("click", wipeMenu);
document.getElementById("random").addEventListener("click", deleteTag);
document.getElementById("random").addEventListener("click", wipeMenu);
document.getElementById("random").addEventListener("click", abvOutput);
document.getElementById("random").addEventListener("click", ibuOutput);

document.getElementById("random-icon").addEventListener("click", wipeMenu);
document.getElementById("random-icon").addEventListener("click", deleteTag);
document.getElementById("random-icon").addEventListener("click", resetSliders);
document.getElementById("random-icon").addEventListener("click", abvOutput);
document.getElementById("random-icon").addEventListener("click", ibuOutput);



let abvSliderA = document.getElementById("abvSliderA");
let abvSliderB = document.getElementById("abvSliderB");
abvSliderA.addEventListener("mouseup",wipeMenu);
abvSliderA.addEventListener("mouseup",abvOutput);
abvSliderA.addEventListener("mouseup",ibuOutput);

abvSliderB.addEventListener("mouseup",wipeMenu);
abvSliderB.addEventListener("mouseup",abvOutput);
abvSliderB.addEventListener("mouseup",ibuOutput);

let ibuSliderA = document.getElementById("ibuSliderA")
let ibuSliderB = document.getElementById("ibuSliderB")
ibuSliderA.addEventListener("mouseup",wipeMenu);
ibuSliderA.addEventListener("mouseup",ibuOutput);
ibuSliderA.addEventListener("mouseup",abvOutput);

ibuSliderB.addEventListener("mouseup",wipeMenu);
ibuSliderB.addEventListener("mouseup",ibuOutput);
ibuSliderB.addEventListener("mouseup",abvOutput);

let beerFilters = document.getElementsByClassName("beerStyles");

for(let filter of beerFilters)  {
    document.getElementById(filter.id).addEventListener("click", wipeMenu);
    document.getElementById(filter.id).addEventListener("click", abvOutput);
    document.getElementById(filter.id).addEventListener("click", ibuOutput);
}




function abvOutput() {
    document.getElementById('abvOutput').textContent = `${Number(abvSliderA.value)}%  —  ${Number(abvSliderB.value)}%` ;
}

function ibuOutput() {
    document.getElementById('ibuOutput').textContent = `${Number(ibuSliderA.value) + 1} — ${Number(ibuSliderB.value)} IBUs` ;
}

let xhr;

function wipeMenu(e) {
    
    let root = document.getElementById("root");
    while (root.hasChildNodes()) {
        root.removeChild(root.firstChild) 
        // console.log("cleared!");
    }
    constructFilter(e)
}

function constructFilter(e) {
    let baseURL = `https://api.punkapi.com/v2/beers?&per_page=80`;
    let randomURL = `https://api.punkapi.com/v2/beers/random`
    // console.log(e.target.id, "CHECK TARGET ID");
    if (e == undefined) {
        return checkBeerStyle();
    } else if (e.target.id == 'random') {
        makeRequest(randomURL);
        return;
    } else if (e.target.id == 'random-icon') {
        makeRequest(randomURL);
        return;
    } else if (e.target.id == 'beerMe') {
        makeRequest(baseURL);
        // checkBeerStyle();
        return;
    } else {
        checkBeerStyle();
        // checkSliderStates();
    }
}

function checkBeerStyle() {
    let beerstyle;
    let style;
    let beerStyles = document.getElementsByClassName('beerStyles');

    let keys = Object.keys(beerStyles); 
        keys.forEach(key => {
            if (beerStyles[key].checked == true) {
                style = beerStyles[key].id;
                // return beerstyle;
            } 
        });

    if (style == 'all') {
        beerstyle = '';
        return constructMultiFilter(beerstyle);
    } else {
        beerstyle = `&beer_name=` + style;
        return constructMultiFilter(beerstyle);
    }
    
}

function constructMultiFilter(beerstyle) {
    let baseURL = `https://api.punkapi.com/v2/beers?&per_page=80`;
    let abv_min = `&abv_gt=` + document.getElementById('abvSliderA').value;
    let abv_max = `&abv_lt=` + document.getElementById('abvSliderB').value;
    let ibu_min = `&ibu_gt=` + document.getElementById('ibuSliderA').value;
    let ibu_max = `&ibu_lt=` + document.getElementById('ibuSliderB').value;
    
    let abv_ibu = abv_min + abv_max + ibu_min + ibu_max;
    let fetchURL = baseURL + beerstyle + abv_ibu;
    buildStyleTag();
    makeRequest(fetchURL);
}

function makeRequest(fetchURL) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", progressBar);
    xhr.addEventListener("error", requestError);
    xhr.open("GET", fetchURL);
    // console.log(xhr.status);
	// console.log("sent request!");
    xhr.addEventListener("load", loadRequest)

    function loadRequest() {
        // console.log("response received!");
        // console.log(xhr.status);
        if (xhr.status === 200) {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                
                const data = JSON.parse(this.response); 
                buildMenu(data);
               
            } 
            else console.log(`error:` + `${xhr.status}`); 
        } 
        // console.log("request fulfilled!");
    } 
    xhr.send();
} 

function progressBar(e) {
    if (e.target.id == e.target.id) {
        console.log(`Loaded ${e.loaded} of ${e.total}`);
    } else {
        ("Size unknown. Your data is loading.");
    }
}

function requestError(e) {
    console.log("An error occurred processing your request. Check the code!");
}


function resetSliders() {
    abvSliderA.value = 0;
    abvSliderB.value = 18.5;

    ibuSliderA.value = 0;
    ibuSliderB.value = 255;

    // abvOutput();
    // ibuOutput();
}

function buildStyleTag() {

   let tagWrapper = document.getElementById('tagWrapper');

   if (!tagWrapper.hasChildNodes == false) {
    tagWrapper.innerHTML = 
    `<p class="tag " id="tagStyleID">× <span class="tag-text" id="tag-style"></span></p>
    
    `
   }  

    let tags = document.getElementsByClassName('tag');
        tags[0].addEventListener('click', deleteTag);
    
    updateTag();
}

function updateTag() {
    let tagStyle = document.getElementsByName('filter');
    let styleTag = document.getElementById('tag-style');
    
    for(let style of tagStyle) {
        style.checked ? styleTag.textContent =  style.previousElementSibling.textContent : false;
    }

    if (styleTag.textContent == "ALL BEERS") {
        let allTag = document.getElementById('tagStyleID');
        allTag.classList.add('hidden');
    }
}

   
function deleteTag(e) {
    // when tags are deleted, filters revert to defaults. No tags for defaults.
        if (e.target.parentNode.id == 'tagStyleID') {
            // when style tag is deleted, 'all styles' is checked  
            document.getElementById('tagStyleID').remove();
            let beerStyle = document.getElementById('all');
            beerStyle.checked = true;

            return wipeMenu(e); 
        } else if (e.target.id == 'beerMe') {
            // if the 'all' tag is being hidden, that means the classList is >1.
            // and so there's no need to delete the tag
            if (document.getElementById('tagStyleID').classList.length > 1) {
                return;
            }
            
            let beerStyle = document.getElementById('all');
            beerStyle.checked = true;
            updateTag();
            wipeMenu(e); 
        } else if (e.target.id == 'random') {
            if (document.getElementById('tagStyleID').classList.length > 1) {
                return;
            }
            let beerStyle = document.getElementById('all');
            beerStyle.checked = true;
            updateTag();
            wipeMenu(e); 
        } else if (e.target.id == 'random-icon') {

            if (document.getElementById('tagStyleID').classList.length > 1) {
                return;
            }
            let beerStyle = document.getElementById('all');
            beerStyle.checked = true;
            updateTag();
            wipeMenu(e); 
        } else { e.target.remove();
        let beerStyle = document.getElementById('all');
            beerStyle.checked = true;

            wipeMenu(e); 
        }

        
}



function updateResults(data) {
    let resultsCount = document.getElementById('resultID');
    resultsCount.textContent = `${data.length}`;
}


function buildMenu(data) {
    
    updateResults(data);
    let app = document.getElementById('root');   

            let beerMenu = document.createElement('div');
            beerMenu.setAttribute('class', 'beerMenu');
            beerMenu.setAttribute('id', 'beerMenuID');
            app.appendChild(beerMenu);

            
    data.forEach((beer) => { 

            let card = document.createElement('div');
            card.setAttribute('class', 'card');
            beerMenu.appendChild(card);
        
            let h2 = document.createElement('h1');
            h2.setAttribute('class','beer_name');
            h2.textContent = beer.name;
            card.appendChild(h2);
        
            let h4 = document.createElement('p');
            h4.setAttribute('class','beer_tagline');

            // remove period at the end of taglines
            if (beer.tagline.endsWith('.') == true) {
                beer.tagline = beer.tagline.slice(0,beer.tagline.length-1);
            } else {
                beer.tagline = beer.tagline.substring(0,beer.tagline.length);
            }
            h4.textContent = `"${beer.tagline}"`;
            card.appendChild(h4);
            
            // const separator = document.createElement('hr');
            // separator.setAttribute('class','line');
            // card.appendChild(separator);

            const pDesc = document.createElement('button');
            const pDescDet = document.createElement('p');
            pDesc.setAttribute('class', 'desc hidden');
            pDescDet.setAttribute('class', ' details hidden ');
            beer.description = beer.description.substring(0,10);
            pDesc.textContent = `Read More`;
            beer.description = beer.description.substring(0, 5);
            pDescDet.textContent = `${beer.description}...`;
            pDesc.appendChild(pDescDet);
            card.appendChild(pDesc);

            const numdata = document.createElement('ul');
            numdata.setAttribute('class','beer_data');
            
            const pABV = document.createElement('li');
            pABV.setAttribute('class', 'abv');
            pABV.textContent = `${beer.abv} %`;
            numdata.appendChild(pABV);
            const pIBU = document.createElement('li');
            pIBU.setAttribute('class', 'ibu');
            pIBU.textContent = `${beer.ibu} ibu`;
            numdata.appendChild(pIBU);
            const hue = document.createElement('li');
            hue.setAttribute('class','ebc');
            hue.textContent = `\u2B24`;
            hue.style.color = `${calcBeerHue()}`;
            numdata.appendChild(hue);
            card.appendChild(numdata);
          

        function calcBeerHue() {
            if (beer.ebc < 7) {
                hue.style.color = "#f8eba7"; // l.blonde
            } else if (beer.ebc < 13 ) {
                hue.style.color = "#ffe041"; // blonde
            } else if (beer.ebc < 21 ) {
                hue.style.color = "#cc8800 "; // gold
            } else if (beer.ebc < 31 ) {
                hue.style.color = "#b34a00"; // red
            } else if (beer.ebc < 46 ) {
                hue.style.color = "#80000b"; // copper
            } else if (beer.ebc < 76 ) {
                hue.style.color = "#7c4e20"; // brown
            } else if (beer.ebc < 76 ) {
                hue.style.color = "#341500"; // d.brown
            } else {
                hue.style.color = "#000"; // black
            }
        } 

        });

        return;

}


window.addEventListener('scroll', buildScrollUp);

function buildScrollUp() {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 300 ) {
        
        let upArrow = document.getElementById('up');
        upArrow.classList.remove('hidden');
        

    } else if (scrollPosition < 300) {
        let upArrowRemove = document.getElementById('up');
        upArrowRemove.classList.add('hidden');
        
    }
}




