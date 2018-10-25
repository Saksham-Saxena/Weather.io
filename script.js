const appKey = "e155ea300568ee763bc82aaff403826d";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let pressure = document.getElementById("atm");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let maxtemp = document.getElementById("tmpmax");
let mintemp = document.getElementById("tmpmin");
let windspeed = document.getElementById("speed");
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (searchInput.value === "") {
  
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
   httpRequestAsync(searchLink, theResponse);
  }
 }

function theResponse(response) {

  let jsonObject = JSON.parse(response);
  if (jsonObject.cod == 404){
   alert("Invalid City Name!");
  }
  if(jsonObject.sys.cod = 200 ){
  cityName.innerHTML = jsonObject.name +" , "+jsonObject.sys.country ;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = "<p>Temprature: "+ parseInt(jsonObject.main.temp - 273) + "°C</p>";
  humidity.innerHTML ="<p>Humidity: "+ jsonObject.main.humidity + "%</p>";
  pressure.innerHTML ="<p>Pressure : "+ jsonObject.main.pressure + "hPa</p>";
   maxtemp.innerHTML ="<p>Max. Temprature: "+ parseInt(jsonObject.main.temp_max - 273) + "°C</p>";
    mintemp.innerHTML ="<p>Min. Temprature: "+ parseInt(jsonObject.main.temp_min - 273) + "°C</p>";
     windspeed.innerHTML = "<p>Wind : "+ jsonObject.wind.speed + "Km <br/>  Direction : " + jsonObject.wind.deg + "°</p>" ;
  }else{
   alert("Sorry , An error was encountered!Please try after some time.");
  }

}

function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}