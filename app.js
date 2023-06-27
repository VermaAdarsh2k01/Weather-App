const apiKey = "d925f616009d403c7bf25be562416b47" ;


const weatherDataEl = document.getElementById("weather-data");


const cityInputEl = document.getElementById("cityInput") 

const formEl = document.querySelector("form")

formEl.addEventListener("submit" ,(event)=>{
    event.preventDefault();

    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);

});

async function getWeatherData( cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("Newtork respons was not ok")
        }

        const data = await response.json()
        console.log(data)

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description
        
        const icon = data.weather[0].icon

        const details = [
            `Feels like : ${Math.round(data.main.feels_like)}°C`,
            `humidity: ${data.main.humidity}% `,
            `Wind speed : ${data.wind.speed}m/s`,
        ] 

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`
        weatherDataEl.querySelector(".temp").textContent = `${temperature}° C`
        weatherDataEl.querySelector(".description").textContent = `${description}`
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>
            `<div>${detail}</div>`
        ).join("");
    
    }catch (error){

    }
};