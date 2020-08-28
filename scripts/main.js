'use strict';


//  IPA API

//    API source: https://punkapi.com/

//



let xhr = new XMLHttpRequest();


// document.getElementById("beerMe").addEventListener("click", makeRequest);
// document.getElementById("ipa").addEventListener("click", makeRequest);
document.getElementById("bartender").addEventListener("click", wipeMenu);



// xhr.addEventListener("progress", progressBar);
// xhr.addEventListener("error", requestError);
// xhr.addEventListener("abort", requestTerminated);
// console.log(xhr);

// function progressBar(e) {
// 	if (e.target.id == e.target.id) {
// 		console.log(`Loaded ${e.loaded} of ${e.total}`);
// 	} else {
//         ("Size unknown. Your data is loading.");
// 	}
// }

// function requestError(e) {
// 	console.log("An error occurred processing your request. Check the code!");
// }

function wipeMenu(e) {
    // console.log(xhr.status);
    let root = document.getElementById("root");
    while (root.hasChildNodes()) {
        root.removeChild(root.firstChild) 
        // console.log("cleared!");
    }
  
    let constructURL = "https://api.punkapi.com/v2/beers/random";
    if (e.target.id == "ipa") {
        constructURL = "https://api.punkapi.com/v2/beers&beer_name=ipa";
    } else if (e.target.id == "bartender") {
        constructURL = "https://api.punkapi.com/v2/beers/random";
    } 
    
    makeRequest();
}

// function clearCache(e) {
//     cache.delete(request).then(function() {
//         console.log("your cache entry has been deleted if found");
//         makeRequest(e);
//       }); 
//       console.log("your cache entry has NOT been deleted");
// }

 
// let arr = [];
// let data;
function makeRequest() {
	xhr.open("GET", "https://api.punkapi.com/v2/beers/random");
	// console.log(`${e.target.id} sending request!`);
	// console.log("sent request!");
    xhr.addEventListener("load", loadRequest)

    function loadRequest() {
        // count each request
        // let i = 0; console.log(i++);
        // console.log("response received!");
        // console.log("HOWDY");
        // console.log(xhr.status);
        if (xhr.status === 200) {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // console.log(i++);
                // console.log(this.response);
                const data = JSON.parse(this.response); 
                console.log(data);
                buildMenu(data);

            } 
            // buildMenu(data);
            else console.log(`error:` + `${xhr.status}`); 
        } 
 

        // console.log("request fulfilled!");
        // console.log(xhr);
    } 
   
    xhr.send();
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



