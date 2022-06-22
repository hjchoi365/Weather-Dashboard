//Global variables
var cities = [];
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search");
var citiesEl = document.querySelector(".cities-list");
var searchbtnEl = document.querySelector("#searchbtn");
var GUVIndex = 0;
var uvbodyEl = document.createElement("div");
var weather5El = document.querySelector(".weather5");
var citieslistEl = document.getElementsByTagName("li");
var weatherrowEl = document.querySelector(".weather-row");
var forecastEl = document.querySelector(".forecast-row");



//function to get UV Index
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



//function to get 5 days forecast
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


//Add entry to local storage
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


//Display todays weather data
function displayWeather(data, cityname) {
  // check if api returned any city
  if (data.length === 0) {
    weatherrowEl.textContent = "No data found for city: " + cityname;
    return;
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

  //create card for weather data           

  var weathercardEl = document.createElement("div");
  weathercardEl.classList = "col-md-12 card weather-card";
  weatherrowEl.appendChild(weathercardEl);
  //create card body div
  var cardbodyEl = document.createElement("div");
  cardbodyEl.classList = "card-body";
  weathercardEl.appendChild(cardbodyEl);
  //add body contents
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
  //get UV index

  getUVI(latvar, lonvar, dateString);

  //add 5 days forecast header and data
  cardbodyEl.appendChild(uvbodyEl);
  weather5El.innerHTML = "5-Day Forecast:";
  getfivedayWeatherDetails(cityname);

  //Add to local repo
  addTorepository(cityname);
};


//function to get todays temperature
var gettodayWeatherDetails = function (cityname) {

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=eb88f60513f97685d54ad8308a28db93&units=imperial";


  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data, cityname);
      });
    }
    else {
      weatherrowEl.textContent = "Error: " + cityname + " city " + response.statusText
    }
  })
    .catch(function (error) {
      weatherrowEl.textContent = "Unable to connect";
    });
};

//function to clear nodes for next data
function clearNodes() {
  if (weatherrowEl.hasChildNodes()) {
    while (weatherrowEl.hasChildNodes()) {
      weatherrowEl.removeChild(weatherrowEl.firstChild);
    }
  }

  weather5El.textContent = "";
  weatherrowEl.textContent = "";

  if (forecastEl.hasChildNodes()) {
    while (forecastEl.hasChildNodes()) {
      forecastEl.removeChild(forecastEl.firstChild);
    }
  }
};


//function to display weather data on click of links
function dynamicEvent() {
  var city = this.textContent.trim();
  clearNodes();
  gettodayWeatherDetails(city);
};


//Search city
var searchCity = function (event) {
  event.preventDefault();

  var cityName = nameInputEl.value.trim();
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  clearNodes();

  if (cityName) {
    gettodayWeatherDetails(cityName);
    nameInputEl.value = "";
  }
  else {
    alert("Please enter a City name");
  }
};

//load cities from local storage
var loadCities = function () {
  var getCities = localStorage.getItem("cities");
  if (getCities !== null) {
    getCities = JSON.parse(getCities);
    for (var i = 0; i < getCities.length; i++) {
      // create a span element to hold city name
      cities.push(getCities[i]);
      var titleEl = document.createElement("li");
      titleEl.className = "cities-name";
      titleEl.textContent = getCities[i];
      citiesEl.appendChild(titleEl);
      titleEl.onclick = dynamicEvent;
    }
  }
};

//load cities from local storage on page load
loadCities();
userFormEl.addEventListener("submit", searchCity);