'use strict';


//  IPA API

//    API source: https://punkapi.com/

//




let beerFilters = document.getElementsByClassName("submitTag");

document.getElementById("beerMe").addEventListener("click", wipeMenu);
document.getElementById("bartender").addEventListener("click", wipeMenu);

for(let filter of beerFilters)  {
    document.getElementById(filter.id).addEventListener("click", wipeMenu);
}

// beerFilters[0].addEventListener("click", wipeMenu);



let xhr;


function wipeMenu(e) {
     
    // console.log(xhr.status);
    let root = document.getElementById("root");
    while (root.hasChildNodes()) {
        root.removeChild(root.firstChild) 
        // console.log("cleared!");
    }
    let constructURL;
    if (e.target.id == "bartender") {
        constructURL = "https://api.punkapi.com/v2/beers/random";
    } else if (e.target.id == "beerMe") {
        constructURL = `https://api.punkapi.com/v2/beers?pages=1&per_page=80`;
    } else if (e.target.id == "citrusy") {
        constructURL = `https://api.punkapi.com/v2/beers?ids=89|142|233|237|256|262|310`;
    } else if (e.target.id == "seasonal") {
        constructURL = `https://api.punkapi.com/v2/beers?ids=98|130|156`;
    } else if (e.target.id == "tartfunky") {
        constructURL = `https://api.punkapi.com/v2/beers?ids=3|19|35|94|143|151|160|169|193|299`;
    } else if (e.target.id == "experimental") {
        constructURL = `https://api.punkapi.com/v2/beers?ids=166|182|229|235|266`;
    } else constructURL = `https://api.punkapi.com/v2/beers?pages=1&per_page=80` + `&beer_name=` + `${e.target.id}`;
    makeRequest(constructURL);
}

function makeRequest(constructURL) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", progressBar);
    xhr.addEventListener("error", requestError);
	xhr.open("GET", constructURL);
	// console.log("sent request!");
    xhr.addEventListener("load", loadRequest)

    function loadRequest() {
        // console.log("response received!");
        // console.log(xhr.status);
        if (xhr.status === 200) {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const data = JSON.parse(this.response); 
                console.log(data);
                buildMenu(data);
            } 
            else console.log(`error:` + `${xhr.status}`); 
        } 
        // console.log("request fulfilled!");
        // console.log(xhr);
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

    function buildMenu(data) {
        // console.log(arr.length - 1);
        // console.log(arr[arr.length-1])
        // newData = arr[2];
        // if ((arr.length - 1) >= 0) {
        //     console.log(arr[arr.length-1]);
        // }
                    
        let app = document.getElementById('root');
            // if (app.hasChildNodes) {console.log (app.childNodes)};
            let resultsCount = document.createElement('h4');
            resultsCount.setAttribute('class','resultsCount');
            resultsCount.textContent = `Total beers on tap: ${data.length}`;
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



