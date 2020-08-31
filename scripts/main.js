'use strict';


document.getElementById("beerMe").addEventListener("click", wipeMenu);
document.getElementById("beerMe").addEventListener("click", abvOutput);
document.getElementById("beerMe").addEventListener("click", ibuOutput);
document.getElementById("bartender").addEventListener("click", wipeMenu);
document.getElementById("bartender").addEventListener("click", abvOutput);
document.getElementById("bartender").addEventListener("click", ibuOutput);

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

let beerFilters = document.getElementsByClassName("submitTag");

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



let foodLabel = document.getElementsByClassName('food');
for(let food of foodLabel) {
    food.addEventListener('mouseover',foodOutput);
}

    // foodLabel.forEach(food => console.log(food))

    function foodOutput(e) {
    console.log(e.target.id)
    
    };


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
    let fetchURL = 'https://api.punkapi.com/v2/beers?page=1&per_page=80';
    let beerStyle = '';
    let abvURL = `&abv_gt=` + `${Number(abvSliderA.value)}` + `&abv_lt=` + `${Number(abvSliderB.value)}`
    let ibuURL =  `&ibu_gt=` + `${Number(ibuSliderA.value)}` + `&ibu_lt=` + `${Number(ibuSliderB.value) }`;

    if (e.target.id == "bartender") {
        fetchURL = "https://api.punkapi.com/v2/beers/random";
        return makeRequest(fetchURL);
    }  

    if (e.target.id == 'abvSliderA' || e.target.id == 'abvSliderB' ||
        e.target.id == 'ibuSliderA' || e.target.id == 'ibuSliderB') {
            let beerfilter = document.getElementsByName('filter');
            // find which beerStyle is checked everytime slider is changed
            beerfilter.forEach(fil => {
                if (fil.checked == true && fil.id != 'all') {
                    beerStyle = `&beer_name=` + `${fil.id}`;
                } 
            });
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
        e.target.id == 'space' ) {
            beerStyle +=  `&beer_name=` + `${e.target.id}`;
        }

    console.log( `${fetchURL}` + `${abvURL}` + `${ibuURL}` + `${beerStyle}`, "end of fn" );
    fetchURL = `${fetchURL}` + `${abvURL}` + `${ibuURL}` + `${beerStyle}`;

    return makeRequest(fetchURL);

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
                console.log(data);
                // calcTotalResults(data);
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


// function calcTotalResults(data) {
//     // let app = document.getElementById('root');
//         // if (app.hasChildNodes) {console.log (app.childNodes)};
//         let resultsCount = document.createElement('h4');
//         resultsCount.setAttribute('class','resultsCount');
//         resultsCount.textContent = `Total beers that match your criteria: `;
//         let result = document.createElement('span');
//         result.setAttribute('class','result');
//         result.textContent = `${data.length}`;
//         resultsCount.appendChild(result);
//         app.appendChild(resultsCount);        
// }




function buildMenu(data) {
    
    let app = document.getElementById('root');
        if (app.hasChildNodes) {console.log (app.childNodes)};
        let resultsCount = document.createElement('h4');
        resultsCount.setAttribute('class','resultsCount');
        resultsCount.textContent = `Total beers that match your criteria: `;
        let result = document.createElement('span');
        result.setAttribute('class','result');
        result.textContent = `${data.length}`;
        resultsCount.appendChild(result);
        app.appendChild(resultsCount);        

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
            const pDesc = document.createElement('p');
            const pDescDet = document.createElement('p');
            pDesc.setAttribute('class', 'desc hidden');
            pDescDet.setAttribute('class', 'desc details');
            beer.description = beer.description.substring(0,45);
            pDesc.textContent = `${beer.description}...`;
            beer.description += beer.description.substring(100,300);
            
            // card.appendChild(pDesc);
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






