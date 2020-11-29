require('dotenv').config()

const API_KEY = process.env.openWeatherAPI_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&"
const moment = require('moment');
const fetch = require("node-fetch");


const isPostalCode = (postalCode) => {
    const regex = /.*\d+.*/g
    return regex.test(postalCode);
}

const getWeatherByPostalCode = postalCode => {
    const encodedPostalCode  = encodeURIComponent(postalCode);

    fetch(`${BASE_URL}zip=${encodedPostalCode}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        if(data.cod== 200){
            console.log(formatWeatherData(data));
        }else {
            console.error(data.message)
        }
    })
    .catch(e => console.error(e))

}
const getWeatherByCityName = cityName => {
    const encodedCityName  = encodeURIComponent(cityName);

    fetch(`${BASE_URL}q=${encodedCityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        if(data.cod == 200){
            console.log(formatWeatherData(data))
        }else {
            console.error(data.message)
        }
    })
    .catch(e => console.error(e))

}

const formatWeatherData = (data) => {
    return {
        weather : data.weather[0].main,
        description : data.weather[0].description,
        temperature : data.main.temp + ' °C',
        humidity : data.main.humidity + " %",
        visibility: data.visibility + " m",
        country : data.sys.country,
        city: data.name,
        time : moment().add(data.timezone, "seconds").format('LLL')
    }
}


const getWeather = (citesString) => {

    let cities = [];
    if(citesString.includes(",")){
        cities = citesString.split(",")
    }else {
        cities.push(citesString)

    }

cities.forEach( city => {
    if(!city || 0 === city.length){
        console.error("Invalid city name / postal code passed")
    }else if (isPostalCode(city)){
        getWeatherByPostalCode(city)
    }else {
        getWeatherByCityName(city)
    }
})
}

getWeather(process.argv[2])

module.exports =  {
    isPostalCode : isPostalCode,
    getWeatherByPostalCode: getWeatherByPostalCode,
    getWeatherByCityName : getWeatherByCityName,

};