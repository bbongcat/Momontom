const weather = document.querySelector('.js-weather');
const COORDS = "coords";
const API_KEY = "8f381e08d9bd137d665ba5de5b65884b";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&cnt=1`)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
        const temperature = json.list[0].main.temp;
        const place = json.list[0].name;
        weather.textContent = `${temperature}˚C @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    } // JS에서는 key와 value의 이름이 같을 경우 위처럼 생략 가능하다
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        // console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();