'use strict';


document.getElementById("beerMe").addEventListener("click", wipeMenu);
// document.getElementById("beerMe").addEventListener("click", abvOutput);
// document.getElementById("beerMe").addEventListener("click", ibuOutput);
document.getElementById("random").addEventListener("click", wipeMenu);
document.getElementById("random-icon").addEventListener("click", wipeMenu);
// document.getElementById("random").addEventListener("click", abvOutput);
// document.getElementById("random").addEventListener("click", ibuOutput);



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
        console.log(baseURL,'this is the random fetchURL');
        makeRequest(randomURL);
        return;
    } else if (e.target.id == 'random-icon') {
        console.log(baseURL,'this is the random fetchURL');
        makeRequest(randomURL);
        return;
    } else if (e.target.id == 'beerMe') {
        console.log(baseURL,'this is the default fetchURL');
        makeRequest(baseURL);
        return;
    } else {
        checkBeerStyle();
        // checkSliderStates();
    }
}

function checkBeerStyle() {
    let beerstyle;
    let beerStyles = document.getElementsByClassName('beerStyles');
    
    for(let style of beerStyles) { 
        if (style.checked) {
            if (style.id == 'all');
            beerstyle = '';
            console.log(beerstyle,'this is the allbeers fetchURL');
            return constructMultiFilter(beerstyle);
        } else { 
            beerstyle = `&beer_name=` + style.id;
            console.log(beerstyle,'this is the filtered beers fetchURL');
            return constructMultiFilter(beerstyle);
         }
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
    console.log(fetchURL,'this is the multiFilter fetchURL');
    buildTag();
    makeRequest(fetchURL);
}

// function checkSliderStates() {
//     let abv_min = `&abv_gt=` + document.getElementById('abvSliderA.value');
//     let abv_max = `&abv_lt=` + document.getElementById('abvSliderB.value');
//     let ibu_min = `&ibu_gt=` + document.getElementById('ibuSliderA.value');
//     let ibu_max = `&ibu_lt=` + document.getElementById('ibuSliderB.value');
    
//     let abv_ibu = abv_min + abv_max + ibu_min + ibu_max;
//     return constructMultiFilter(abv_ibu);
// }


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



function updateResults(data) {
    let resultsCount = document.getElementById('resultID');
    resultsCount.textContent = `${data.length}`;
}


function buildMenu(data) {
    // buildTag();
    
    updateResults(data);
    buildScrollUp();
    let app = document.getElementById('root');
        if (app.hasChildNodes) {console.log (app.childNodes)};
        // let resultsCount = document.createElement('h4');
        // resultsCount.setAttribute('class','resultsCount');
        // resultsCount.textContent = `Total beers that match your criteria: `;
        // let result = document.createElement('span');
        // result.setAttribute('class','result');
        // result.textContent = `${data.length}`;
        // resultsCount.appendChild(result);
        // app.appendChild(resultsCount);        

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


    // upArrow.addEventListener('click', buildScrollUp);

function buildScrollUp() {
    let upArrow = document.getElementById('up');
    upArrow.innerHTML = `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;

    console.log(`${window.location}` + `#top`);
}




