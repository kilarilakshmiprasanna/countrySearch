let searchInputEl = document.getElementById("searchInput");
let resultCountriesEL = document.getElementById("resultCountries");
let spinnerElement = document.getElementById("spinner");
let countryList;
spinnerElement.classList.remove("d-none");

function createAndAppendCountries(object) {
    let {
        flag,
        name,
        population
    } = object;

    let eachObjContainer = document.createElement("div");
    eachObjContainer.classList.add("col-12", "col-md-5", "ml-auto", "mr-auto", "country-card", "d-flex", "flex-row");

    let imgEl = document.createElement("img");
    imgEl.classList.add("country-flag");
    imgEl.src = flag;
    eachObjContainer.appendChild(imgEl);

    let namePopulationContainer = document.createElement("div");
    namePopulationContainer.classList.add("ml-3");

    let countryNameEl = document.createElement("h1");
    countryNameEl.classList.add("country-name");
    countryNameEl.textContent = name;
    namePopulationContainer.appendChild(countryNameEl);

    let populationEl = document.createElement("p");
    populationEl.textContent = population;
    populationEl.classList.add("country-population");
    namePopulationContainer.appendChild(populationEl);

    eachObjContainer.appendChild(namePopulationContainer);
    resultCountriesEL.appendChild(eachObjContainer);
}

function httpRequestAllCountries() {

    let url = "https://apis.ccbp.in/countries-data";


    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerElement.classList.add("d-none");
            countryList = jsonData;
            for (let eachCountry of countryList) {
                createAndAppendCountries(eachCountry);
            }

        });
}

httpRequestAllCountries();

function fetchUserSpecifiedCountries() {
    let userInput = searchInputEl.value;
    spinnerElement.classList.add("d-none");

    for (let eachCountry of countryList) {
        let countryName = eachCountry.name;
        if (countryName.toUpperCase().includes(userInput.toUpperCase())) {
            createAndAppendCountries(eachCountry);
        }
    }
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        resultCountriesEL.textContent = "";
        spinnerElement.classList.remove("d-none");
        fetchUserSpecifiedCountries();
    }
});