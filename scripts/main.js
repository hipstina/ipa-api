'use strict';

//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //   

//  IPA API

//    API source: https://punkapi.com/

//    To do:

//    + ..pull data            
//    + filter data by querying description    
//    + search by tags
//    + dropdown search bar in naviation??  
//    + add total # of results string                              
//    + convert IBU & ABV values to icon elements     
//
//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  


let xhr = new XMLHttpRequest();
document.getElementById("beerMe").addEventListener("click", makeRequest);

xhr.addEventListener("progress", progressBar);
xhr.addEventListener("error", requestError);
// xhr.addEventListener("abort", requestTerminated);
// console.log(xhr);

// not sure what's wrong here
function progressBar(e) {
	if (e.lengthCommputable) {
		let percentComplete = (e.loaded / e.total) * 100;
		console.log(percentComplete);
	} else {
		("Size unknown. Your data is loading.");
	}
}

function requestError(e) {
	console.log("An error occurred processing your request. Check the code!");
}

function makeRequest() {
	xhr.open(
		"GET",
		"https://api.punkapi.com/v2/beers?page=1&per_page=80 "
	);
	// console.log("sending request!");
	// console.log("sent request!");
	xhr.addEventListener("load", function () {
		console.log("response received!");
		if (xhr.status === 200) {
			if (xhr.readyState === XMLHttpRequest.DONE) {
                let data = JSON.parse(this.response);
                
                let app = document.getElementById('root');
                    let resultsCount = document.createElement('h4');
                    resultsCount.setAttribute('class','resultsCount');
                    resultsCount.textContent = `Total beers found: ${data.length}`;
                    app.appendChild(resultsCount);        

                        let beerMenu = document.createElement('div');
                        beerMenu.setAttribute('class', 'beerMenu');
                        app.appendChild(beerMenu);

                        
				data.forEach((beer) => { 

                    
                        const card = document.createElement('div');
                        card.setAttribute('class', 'card');
                        beerMenu.appendChild(card);
                    
                        const h2 = document.createElement('h2');
                        h2.textContent = beer.name;
                        card.appendChild(h2);
                    
                        const h4 = document.createElement('h4');

                        // remove period at the end of taglines
                        if (beer.tagline.endsWith('.') == true) {
                            beer.tagline = beer.tagline.slice(0,beer.tagline.length-1);
                        } else {
                            beer.tagline = beer.tagline.substring(0,beer.tagline.length);
                        }
                        h4.textContent = `${beer.tagline}`;
                        card.appendChild(h4);
                    
                        const pABV = document.createElement('p');
                        pABV.setAttribute('class', 'abv');
                        pABV.textContent = `ABV: ${beer.abv}`;
                        card.appendChild(pABV);
                        const pIBU = document.createElement('p');
                        pIBU.setAttribute('class', 'ibu');
                        pIBU.textContent = `IBU: ${beer.ibu}`;
                        card.appendChild(pIBU);
                        const pDesc = document.createElement('details');
                        pDesc.setAttribute('class', 'desc');
                        // beer.description = beer.description.substring(0,160);
                        pDesc.textContent = `Details...${beer.description}`;
                        card.appendChild(pDesc);
                    
                        
                    
                    
                    ;});
			} else {    console.log(`error:` + `${xhr.status}`);    }
		}
        // console.log("request fulfilled!");
        console.log(xhr);
	});
    xhr.send();
}


