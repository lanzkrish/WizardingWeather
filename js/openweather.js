const apikey = 'b4bb96c03175e0fbef52ca0685ef51c1';
const apikey2 = '5cfbdb59221422f1ee85548790bcbc61';
const GeofiApi = '35786225f19b4821b36337399bf836ca';

const openApiCall='https://api.openweathermap.org/data/3.0/onecall';
const reverseGeoCoding ='https://api.geoapify.com/v1/geocode/reverse';
const searchLocation = 'http://api.openweathermap.org/geo/1.0/direct'

const weathericons = 'https://openweathermap.org/img/wn/'

var Latitude;
var Longitude;

const x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    Latitude = position.coords.latitude ;
    Longitude = position.coords.longitude;
    // x.innerHTML = "Latitude: " + Latitude + "<br>Longitude: " + Longitude;
    fetchlocation(reverseGeoCoding+`?lat=${Latitude}&lon=${Longitude}%20&apiKey=${GeofiApi}`);
    fetchWeatherForecastOpenWeather(openApiCall+`?lat=${Latitude}&lon=${Longitude}&appid=${apikey}`);
    

   
  }

// console.log(Math.floor(new Date().getTime()/1000.0))

function fetchlocation(apicall){
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            const location = JSON.parse(httpRequest.responseText);

            document.querySelector(".current-location").innerHTML = `<h3>Locaiton</h3><h4 class="text-success" id="max-temp-text">${location.features[0].properties.address_line1}, ${location.features[0].properties.city}, ${location.features[0].properties.country}</h4>`;
            // console.log(location , 'reverse Geocoding');
        }
    }
    httpRequest.open('GET', apicall);
    httpRequest.send();

}


// function for7timer() {
//     // console.log('log'+locationKey);
//     const httpRequest = new XMLHttpRequest();
//     httpRequest.onreadystatechange = function () {
//         if (httpRequest.readyState === 4 && httpRequest.status === 200) {
//             const forecast = JSON.parse(httpRequest.responseText);

//             // document.querySelector(".max-temp").innerHTML = `<h3>Current Temp</h3><h4 class="text-danger" id="max-temp-text">${(forecast.current.temp - 273).toFixed()}</h4>`;
//             // document.querySelector(".min-temp").innerHTML = `<h3>Min Temp</h3><h4 class="text-success" id="min-temp-text">${forecast.DailyForecasts[0].Temperature.Minimum.Value}</h4>`;

//             // document.querySelector(".max-temp").innerHTML = `<h3>Max Temp</h3><h4 class="text-danger" id="max-temp-text">${forecast.DailyForecasts[0].Temperature.Maximum.Value}</h4>`;
//             // document.querySelector(".min-temp").innerHTML = `<h3>Min Temp</h3><h4 class="text-success" id="min-temp-text">${forecast.DailyForecasts[0].Temperature.Minimum.Value}</h4>`;
//             console.log(forecast);
//         }
//     }
//     httpRequest.open('GET', 'https://www.7timer.info/bin/astro.php?lon=78.4476343&lat=17.4398688&ac=0&unit=metric&output=json&tzshift=0');
//     httpRequest.send();
// }
// for7timer();





function fetchWeatherForecastOpenWeather(apiCall) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            const forecast = JSON.parse(httpRequest.responseText);

            document.querySelector(".current-temp").innerHTML = `<h3 class="col-sm-12">Current Temp</h3><h4 class="text-danger" id="current-temp-text">${(forecast.current.temp - 273.15).toFixed()}&deg Celcius</h4>`;
            document.querySelector(".current-temp-feels").innerHTML = `<h4>Current Temp</h4><h5 class="text-warning" id="current-temp-feels-text">${(forecast.current.feels_like - 273.15).toFixed()}&deg Celcius</h5>`;
            document.querySelector(".current-max-temp").innerHTML = `<h4>Max Temp</h4><h5 class="text-danger" id="Max-temp-text">${(forecast.daily[0].temp.max - 273.15).toFixed()}&deg Celcius</h4>`;
            document.querySelector(".current-min-temp").innerHTML = `<h4>Min Temp</h4><h5 class="text-warning" id="Min-temp-text">${(forecast.daily[0].temp.min - 273.15).toFixed()}&deg Celcius</h4>`;
            document.querySelector(".icon").innerHTML = `<img src="${weathericons}${forecast.current.weather[0].icon}@2x.png" alt="Weather Icon">`;
            document.querySelector(".currentweatherdescription").innerHTML = `<p class="text-white"> ${forecast.current.weather[0].description} <p>`;

            var myDate = new Date( forecast.hourly[0].dt*1000);
            console.log(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
            console.log('forecast Open Weather',forecast);
            console.log(`${weathericons}${forecast.current.weather[0].icon}@2x.png`);
        }
    }
    httpRequest.open('GET', apiCall);
    httpRequest.send();
}




function required() {
    var locationinput = document.getElementById('inputLocation').value;
    console.log(locationinput);
    if (locationinput == "") {
        alert("Please input a Value");
        return false;
    }
    else {
        getLocationkey(locationinput);
        return true;
    }
}



function getLocationkey(locationinput) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            const location = JSON.parse(httpRequest.responseText);

            console.log(location);
            console.log(location.length)
            let str='';
            for (let i =0;i<location.length;i++){
            
             str+=`
            <option value="${location[i].lat},${location[i].lon}">${location[i].name},${location[i].state},${location[i].country}</option>
            `
            }
            document.querySelector(".locationSelect").innerHTML = '<option selected>Open this select menu</option>'+str;
            document.querySelector(".locationSelect").removeAttribute('disabled');
            // fetchWeatherForecast(location[0].Key);
            // locationKey = `${location[0].Key}`;
            // console.log(locationKey,'lol')
            // return locationKey
        }
    }
    httpRequest.open('GET', searchLocation+`?q=${locationinput}&limit=2&`+`appid=${apikey2}` );
    httpRequest.send();
}




function newrequired() {
    var locationinput = document.querySelector(".locationSelect").value;
    if (locationinput == "") {
        alert("Please input a Value");
        return false;
    }
    else {
        var aray = (locationinput).split(',')
        Latitude = aray[0]
        Longitude = aray[1]
        fetchWeatherForecast(openApiCall+`?lat=${Latitude}&lon=${Longitude}&appid=${apikey}`);
        return true;
    }
}


function fetchWeatherForecast(apicall) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            const forecast = JSON.parse(httpRequest.responseText);

            document.querySelector(".max-temp").innerHTML = `<h3>Max Temp</h3><h4 class="text-danger" id="max-temp-text">${(forecast.current.temp - 273.15).toFixed()}&deg Celcius</h4>`;
            document.querySelector(".feels-temp").innerHTML = `<h3>Feels Like</h3><h4 class="text-warning" id="min-temp-text">${(forecast.current.feels_like - 273.15).toFixed()}&deg Celcius</h4>`;
            document.querySelector(".weathericon").innerHTML = `<img src="${weathericons}${forecast.current.weather[0].icon}@2x.png" alt="Weather Icon">`;
            document.querySelector(".weatherdescription").innerHTML = `<p class="text-success"> ${forecast.current.weather[0].description} <p>`;
        }
    }
    httpRequest.open('GET', apicall);
    httpRequest.send();
}