
const day1Forecastaccu = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day';
const searchlocationKey = 'http://dataservice.accuweather.com/locations/v1/cities/search?';
const accuWeatherApi = 'vVENYm2IAsACwGXUxCAegpCW5LtGKtDI'
const day5Forecastaccu = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/202190?apikey=vVENYm2IAsACwGXUxCAegpCW5LtGKtDI';
const dayopenMeteoForecasat = 'https://api.open-meteo.com/v1/forecast?latitude=20.2724&longitude=85.8338&current=is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=GMT';
const accugeolocationforecast ='http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
// &q=17.4397909%2C78.447667'
var locationKey;


// const x = document.getElementById("demo");

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude +
//   "<br>Longitude: " + position.coords.longitude;
//   console.log(position.coords.latitude)
//   autoWeather(position.coords.latitude,position.coords.longitude);
// }
// // fetchWeatherForecast();
// getLocation();


// function autoWeather(La,Lo){
//     console.log('log'+La,Lo);
//     const httpRequest = new XMLHttpRequest();
//     httpRequest.onreadystatechange = function () {
//         if (httpRequest.readyState === 4 && httpRequest.status === 200) {
//             const forecast = JSON.parse(httpRequest.responseText);

//             document.querySelector(".max-temp").innerHTML = `<h3>Max Temp</h3><h4 class="text-danger" id="max-temp-text">${(forecast.DailyForecasts[0].Temperature.Maximum.Value).toFixed()}&deg Celcius</h4>`;
//             document.querySelector(".min-temp").innerHTML = `<h3>Min Temp</h3><h4 class="text-success" id="min-temp-text">${(forecast.DailyForecasts[0].Temperature.Minimum.Value).toFixed()}&deg Celcius</h4>`;
//         }
//         // console.log(locationKey+'we')
//     }
//     httpRequest.open('GET', accugeolocationforecast +'?apikey='+accuWeatherApi +'&q='+La+'%2C'+Lo);
//     httpRequest.send();
// }

function getLocationkey(locationinput) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            const location = JSON.parse(httpRequest.responseText);

            console.log(location);
            document.querySelector(".location").innerHTML = `
            <h3>Location</h3>
            <h4 class="text-primary">${location[0].EnglishName},${location[0].AdministrativeArea.EnglishName},${location[0].Country.EnglishName}</h4>`;
            fetchWeatherForecast(location[0].Key);
            locationKey = `${location[0].Key}`;
            console.log(locationKey,'lol')
            return locationKey
        }
    }
    httpRequest.open('GET', searchlocationKey+`apikey=${accuWeatherApi}` +`&q=${locationinput}`);
    httpRequest.send();
}

function fetchWeatherForecast(locationKey) {
    console.log('log'+locationKey);
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            const forecast = JSON.parse(httpRequest.responseText);

            document.querySelector(".max-temp").innerHTML = `<h3>Max Temp</h3><h4 class="text-danger" id="max-temp-text">${((((forecast.DailyForecasts[0].Temperature.Maximum.Value)-32)*5)/9).toFixed()}&deg Cel</h4>`;
            document.querySelector(".min-temp").innerHTML = `<h3>Min Temp</h3><h4 class="text-success" id="min-temp-text">${((((forecast.DailyForecasts[0].Temperature.Minimum.Value)-32)*5)/9).toFixed()}&deg Cel</h4>`;
        }
    }
    httpRequest.open('GET', day1Forecastaccu +'/'+locationKey+'?'+'apikey='+accuWeatherApi);
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


