//** Selectors **/
const inputLocation = document.getElementById("input-Location")
const btnSubmit = document.getElementById("btn-Submit")
const txtTemperature = document.getElementById("current-temperature")
const txtLocation = document.getElementById("location")
const description = document.getElementById("description")
const loading = document.getElementById("loading")
const error = document.getElementById("error")


//** Functions **/

async function getWeather() {
    const location = inputLocation.value
    try {
        loading.classList.remove("hidden")
        error.classList.add("hidden")
        const response = await (fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=ae0173f6906e929683f3853dc7b07a98`, { mode: 'cors' }))
        const responseData = await response.json()
        const lat = responseData[0].lat;
        const lon = responseData[0].lon;
        const weather = await (fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ae0173f6906e929683f3853dc7b07a98`, { mode: 'cors' }))
        const weatherData = await weather.json()
        loading.classList.add("hidden")
        const weatherDescription = weatherData.list[0].weather[0].description
        let currentTemp = weatherData.list[0].main.temp
        const temperature = currentTemp - 273.15;
        let temperatureText = temperature.toFixed(2)
        txtTemperature.innerText = temperatureText
        txtLocation.innerText = location
        description.innerText = weatherDescription

    } catch {
        loading.classList.add("hidden");
        error.classList.remove("hidden")
    }
}

//** Buttons **/
btnSubmit.addEventListener('click', function () {
    getWeather()
})
