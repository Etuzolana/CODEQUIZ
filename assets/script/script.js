var APIKey = "abd45b38f7da0ad105ca4d1eb6716a60";

document.querySelector("#city-form").addEventListener("submit", function(event) {
  //stop the default form submit
  event.preventDefault();

  // get the user input
  var cityName = document.querySelector("#city-name").value;

  // show the current weather
  currentWeather(cityName);

  //show the fiveDayForecast[i].
  forecast(cityName);

  //make weather button[y8]
  createButton(cityName);
});

var createButton = function(cityName) {
  var btn = document.createElement('button');
  btn.textContent = cityName;
  btn.addEventListener("click", function() {
      // show the current weather
      currentWeather(cityName);

      //show the fiveDayForecast[i].
      forecast(cityName);
  });
  document.querySelector("#city-btn-container").append(btn);
}

var currentWeather = function(cityName) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;
  fetch(queryURL).then(function(res) {
    return res.json();
  }).then(function(data) {
    console.log(data);

    const template = `
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">Temp: ${data.main.temp}</p>
          <p class="card-text">Humidity: ${data.main.humidity}</p>
          <p class="card-text">Wind Speed: ${data.wind.speed}</p>
        </div>
      </div>
    `;

    document.querySelector("#current-weather").innerHTML = template;;
  });
}

var forecast = function(cityName) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
  fetch(queryURL).then(function(res) {
    return res.json();
  }).then(function(data) {
    console.log(data);

    var list = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

    let template = "";
    
    list.forEach((item) => {
      template += `
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="weather icon">
          <div class="card-body">
            <h5 class="card-title">${item.dt_txt}</h5>
            <p class="card-text">Temp: ${item.main.temp}</p>
            <p class="card-text">Humidity: ${item.main.humidity}</p>
            <p class="card-text">Wind Speed: ${item.wind.speed}</p>
          </div>
        </div>
      `;
    });

    document.querySelector("#forecast-weather").innerHTML = template;;
  });
}
