var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');


var apik = "20608b4a489f6d8a17f3becae8064162";

function conversion(val) {
    return (val - 273.15).toFixed(2); // Convert Kelvin to Celsius
}

btn.addEventListener('click', function() {
    var cityName = inputvalue.value.trim(); 

    if (!cityName) {
        alert("Please enter a valid city name.");
        return;
    }

    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apik}`;

    fetch(apiURL)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);

            var nameval = data.name;
            var descriptionval = data.weather[0].description;
            var tempature = data.main.temp;
            var wndspeed = data.wind.speed;

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(tempature)} °C</span>`;
            description.innerHTML = `Sky Conditions: <span>${descriptionval}</span>`;
            wind.innerHTML = `Wind Speed: <span>${wndspeed} km/h</span>`;
        })
        .catch(err => {
            console.error("Error fetching the API:", err);
            alert("City not found or there is an issue with the API.");
        });
});
