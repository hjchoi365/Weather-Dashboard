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
