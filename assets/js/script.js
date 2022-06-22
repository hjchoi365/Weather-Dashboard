var cities = [];
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search");
var cityEl = document.querySelector(".city-list");
var searchbtnEl = document.querySelector("#searchbtn");
var GUVIndex = 0;
var uvbodyEl = document.createElement("div");
var weather5El = document.querySelector(".weather5");
var citylistEl = document.getElementsByTagName("li");
var weatherrowEl = document.querySelector(".weather-row");
var forecastEl = document.querySelector(".forecast-row");


function sendUVI(UVIndex) {

    GUVIndex = UVIndex;
    uvbodyEl.classList = "card-text";
    if (GUVIndex >= 0 && GUVIndex <= 2.99) {
        uvbodyEl.innerHTML = "UV Index: <span class='greenuvIndex'>" + GUVIndex + "</span>";
    }
    else if (GUVIndex >= 3 && GUVIndex <= 5.99) {
        uvbodyEl.innerHTML = "UV Index: <span class='yellowuvIndex'>" + GUVIndex + "</span>";
    }
    else if (GUVIndex >= 6 && GUVIndex <= 7.99) {
        uvbodyEl.innerHTML = "UV Index: <span class='orangeuvIndex'>" + GUVIndex + "</span>";
    }
    else if (GUVIndex >= 8 && GUVIndex <= 10.99) {
        uvbodyEl.innerHTML = "UV Index: <span class='reduvIndex'>" + GUVIndex + "</span>";
    }
    else if (GUVIndex >= 11) {
        uvbodyEl.innerHTML = "UV Index: <span class='violetuvIndex'>" + GUVIndex + "</span>";
    }
};

function getUVI(lat, lon, date) {
    var uvivar = 0;
    var apiUrluvi = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + lat + "&lon=" + lon + "&dt=" + date + "&appid=eb88f60513f97685d54ad8308a28db93&units=imperial"
    fetch(apiUrluvi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                uvivar = data.current.uvi;
                UVIndex = uvivar;
                console.log("inside get" + UVIndex);
                sendUVI(UVIndex);
            });
        }
        else {
            alert("Error: " + response.statusText);
        }
    })
        .catch(function (error) {
            weatherrowEl.textContent = "Error: " + cityname + " city " + response.statusText
        });
};


var getfivedayWeatherDetails = function (cityname) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=eb88f60513f97685d54ad8308a28db93&units=imperial";
    var datevar = 0;
    var tempvar = 0;
    var humidityvar = 0;
    var iconvar = "";
    var iconurl = "";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for (var i = 0; i < data.list.length; i++) {
                    var dateString = data.list[i].dt_txt;
                    if (dateString.indexOf("15:00:00") !== -1) {
                        datevar = dateString.substring(0, 10);
                        datevar = moment(datevar, "YYYY-MM-DD");
                        datevar = datevar.format('MM/DD/YYYY');
                        tempvar = data.list[i].main.temp;
                        humidityvar = data.list[i].main.humidity;
                        iconvar = data.list[i].weather[0].icon;
                        iconurl = "https:///openweathermap.org/img/w/" + iconvar + ".png";

                        var cardEl = document.createElement("div");
                        cardEl.classList = "card col-md-2 d-flex flex-column forecast-card";
                        forecastEl.appendChild(cardEl);

                        var cardbodyEl = document.createElement("div");
                        cardbodyEl.classList = "card-body";
                        cardEl.appendChild(cardbodyEl);

                        var cardtitleEl = document.createElement("h3");
                        cardtitleEl.classList = "card-title forecast-title";
                        cardtitleEl.innerHTML = datevar;
                        cardbodyEl.appendChild(cardtitleEl);

                        var imgvar = document.createElement("img");
                        imgvar.classList = "card-text";
                        imgvar.setAttribute("src", iconurl);
                        cardbodyEl.appendChild(imgvar);

                        var tempbodyEl = document.createElement("div");
                        tempbodyEl.classList = "card-text forecast-text";
                        tempbodyEl.innerHTML = "Temp: " + tempvar + "&#8457";
                        cardbodyEl.appendChild(tempbodyEl);

                        var humiditybodyEl = document.createElement("div");
                        humiditybodyEl.classList = "card-text forecast-text";
                        humiditybodyEl.innerHTML = "Humidity: " + humidityvar + "%";
                        cardbodyEl.appendChild(humiditybodyEl);
                    }
                }
            });
        }
        else {
            forecastEl.textContent = "Error: " + response.statusText;
        }
    })
        .catch(function (error) {
            forecastEl.textContent = "Unable to connect";
        });
};

function addTorepository(cityName) {
    var flag = false;
    //add entry to local repository
    for (var i = 0; i < cities.length; i++) {
        if (cityName.toLowerCase() === cities[i].toLowerCase()) {
            flag = true;
            break;
        }
    }
    if (flag === false) {
        // create a span element to hold city name
        var titleEl = document.createElement("li");
        titleEl.className = "cities-name";
        titleEl.textContent = cityName;
        citiesEl.appendChild(titleEl);
        titleEl.onclick = dynamicEvent;
        cities.push(cityName);
        localStorage.setItem("cities", JSON.stringify(cities));
    }
};

function displayWeather(data, cityname) {
    if (data.lenth === 0) {
        weatherrowEl.textContent = "No data found for this city: " + cityname;
        return;
    }
}


var latvar = 0;
var lonvar = 0;
var tempvar = 0;
var humidityvar = 0;
var windvar = 0;
var datevar = 0;
var iconvar = "";
var iconurl = "";
var uvvar = 0;
var uppercity = "";
var dateString = "";

latvar = data.coord.lat;
lonvar = data.coord.lon;
tempvar = data.main.temp;
humidityvar = data.main.humidity;
windvar = data.wind.speed;
iconvar = data.weather[0].icon;
iconurl = "https:///openweathermap.org/img/w/" + iconvar + ".png";
dateString = data.dt;
datevar = moment.unix(dateString).format("MM/DD/YYYY");
uppercity = cityname.charAt(0).toUpperCase() + cityname.slice(1);

latvar = data.coord.lat;
lonvar = data.coord.lon;
tempvar = data.main.temp;
humidityvar = data.main.humidity;
windvar = data.wind.speed;
iconvar = data.weather[0].icon;
iconurl = "https:///openweathermap.org/img/w/" + iconvar + ".png";
dateString = data.dt;
datevar = moment.unix(dateString).format("MM/DD/YYYY");
uppercity = cityname.charAt(0).toUpperCase() + cityname.slice(1);

var weathercardEl = document.createElement("div");
weathercardEl.classList = "col-md-12 card weather-card";
weatherrowEl.appendChild(weathercardEl);
var cardbodyEl = document.createElement("div");
cardbodyEl.classList = "card-body";
weathercardEl.appendChild(cardbodyEl);
var cardtitleEl = document.createElement("h3");
cardtitleEl.classList = "card-title";
cardtitleEl.innerHTML = uppercity + " " + datevar;

var imgvar = document.createElement("img");
imgvar.classList = "card-title";
imgvar.setAttribute("src", iconurl);
cardtitleEl.appendChild(imgvar);
cardbodyEl.appendChild(cardtitleEl);

var tempbodyEl = document.createElement("div");
tempbodyEl.classList = "card-text";
tempbodyEl.innerHTML = "Temperature: " + tempvar + "&#8457";
cardbodyEl.appendChild(tempbodyEl);

var humiditybodyEl = document.createElement("div");
humiditybodyEl.classList = "card-text";
humiditybodyEl.innerHTML = "Humidity: " + humidityvar + "%";
cardbodyEl.appendChild(humiditybodyEl);

var windbodyEl = document.createElement("div");
windbodyEl.classList = "card-text";
windbodyEl.innerHTML = "Wind Speed: " + windvar + " MPH";
cardbodyEl.appendChild(windbodyEl);