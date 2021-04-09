// 35.280100
// -120.653500

function getWeather() {
   let lat = 35.280100;
   let long = -120.653500;

   $.get({
      url : `https://api.weather.gov/points/${lat},${long}`,
      success : (data) => {
         forecast(data.properties.forecast)
      }
   })
}

function forecast(forecastUrl) {
   $.get({
      url : forecastUrl,
      success : (data) => {
         setDisplayInfo(data.properties.periods[0])
      }
   })
}

function setDisplayInfo(currentForecast) {
   console.log('currentForecast', currentForecast)

   let temp = document.getElementById("temp");
   temp.innerHTML = currentForecast.temperature + "&deg;"

   let loading = document.getElementById("loading");
   loading.style.display = "none";

   let mainBox = document.getElementById("mainBox");
   mainBox.style.display = "inline-block";
}


getWeather();