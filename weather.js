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
         setMingoSpawnner(data.properties.periods[0])
         spawnMingo()
      }
   })
}

function setDisplayInfo(currentForecast) {
   console.log('currentForecast', currentForecast)

   let temp = document.getElementById("temp");
   temp.innerHTML = currentForecast.temperature + "&deg;"

   let cloudForecast = document.getElementById("cloudForecast");
   cloudForecast.innerHTML = currentForecast.shortForecast;

   let windForecast = document.getElementById("windForecast");
   windForecast.innerHTML = currentForecast.windSpeed;

   let loading = document.getElementById("loading");
   loading.classList.add('loadingOut')
}

function setMingoSpawnner(currentForecast) {
   // class ColdFlamingo extends Flamingo {
      // class WetFlamingo extends Flamingo {
         // class HotFlamingo extends Flamingo {
            // class MimosaFlamingo extends Flamingo {

   mingoSpawnner = (x, y) => {
      if (currentForecast.temperature < 50)
         return new ColdFlamingo(x, y);
      if (currentForecast.temperature > 80)
         return new HotFlamingo(x, y);
      if (currentForecast.shortForecast.toLowerCase().includes('rain'))
         return new WetFlamingo(x, y);

      var date = new Date(currentForecast.startTime)
      if ((date.getDay() == 0 || date.getDay() == 6) && date.getHours() < 13)
         return new MimosaFlamingo(x, y);

      return new Flamingo(x, y);
   }
 
   // type = HotFlamingo.
   // console.log('currentForecast', currentForecast)
   // mingoSpawnner = (x, y) => new MimosaFlamingo(x, y)
}

// console.log(mingos)
getWeather();