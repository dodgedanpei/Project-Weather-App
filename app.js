var key = config.SECRET_API_KEY;


//** Selectors **/
const inputForm = document.getElementById('input-form')
const inputLocation = document.getElementById("input-Location")
const btnSubmit = document.getElementById("btn-Submit")
const txtTemperature = document.getElementById("current-temperature")
const txtLocation = document.getElementById("location")
const description = document.getElementById("description")
const loading = document.getElementById("loading")
const error = document.getElementById("error")
const currentHeading = document.getElementById('current-heading')
const descriptionHeading = document.getElementById('description-heading')

const cloudsImg = document.getElementById("cloudsImg")
const rainImg = document.getElementById("rainImg")
const sunnyImg = document.getElementById("sunnyImg")

//** Functions **/
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function checkWeather(description) {
    if (description.includes('cloud')) {
        cloudsImg.classList.remove('hidden')
    } else if (description.includes('rain')) {
        rainImg.classList.remove('hidden')
    } else {
        sunnyImg.classList.remove('hidden')
    }
}

function hideImages() {
    cloudsImg.classList.add('hidden')
    rainImg.classList.add('hidden')
    sunnyImg.classList.add('hidden')
}


async function getWeather() {
    hideImages()
    const location = inputLocation.value
    inputLocation.value = ""
    try {
        loading.classList.remove("hidden")
        error.classList.add("hidden")
        const response = await (fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${key}`, { mode: 'cors' }))
        const responseData = await response.json()
        const lat = responseData[0].lat;
        const lon = responseData[0].lon;
        const weather = await (fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`, { mode: 'cors' }))
        const weatherData = await weather.json()
        loading.classList.add("hidden")
        const weatherDescription = weatherData.list[0].weather[0].description
        checkWeather(weatherDescription)
        let currentTemp = weatherData.list[0].main.temp
        const temperature = currentTemp - 273.15;
        let temperatureText = temperature.toFixed(0)
        txtTemperature.innerText = temperatureText
        txtLocation.innerText = capitaliseFirstLetter(location)
        description.innerText = capitaliseFirstLetter(weatherDescription)
        currentHeading.classList.remove("hidden")
        descriptionHeading.classList.remove("hidden")

    } catch {
        loading.classList.add("hidden");
        error.classList.remove("hidden")
    }
}

//** Buttons **/
btnSubmit.addEventListener('click', function () {
    getWeather()
})

inputLocation.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather()
    }
});
