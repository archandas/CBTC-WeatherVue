const temperature = document.querySelector("#temp");
const locate = document.querySelector("#loc");
const date = document.querySelector("#date-time");
const con = document.querySelector("#condition");
const sky = document.querySelector(".skyImg");
const windSpeed = document.querySelector("#speed");
const humidity = document.querySelector("#humidity-rate");
const pressure = document.querySelector("#pressure-rate");
const cloud = document.querySelector("#cloud-rate");
const leftPart = document.querySelector(".left-part");
const searchForm = document.querySelector("#search");
const search = document.querySelector("#query");
const searchBtn = document.querySelector(".search-icon");
const liveBtn = document.querySelector(".live-loc");
let currentCity;


function getDateTime(){
    let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

    // let days = [
    //     "Sun",
    //     "Mon",
    //     "Tue",
    //     "Wed",
    //     "Thu",
    //     "Fri",
    //     "Sat"
    // ];

hour = hour % 12;
if(hour < 10){
    hour = "0" + hour;
}
if(minute < 10){
    minute = "0" + minute;
}

//let dayString = days[now.getDay()];
// return `${hour}:${minute},${now.toDateString()}`;
return `${hour}:${minute},${now.toDateString()}`;
}

date.innerText = getDateTime();
setInterval(()=>{
    date.innerText = getDateTime();
},1000);



function getPublicIp(){
   
    fetch("https://geolocation-db.com/json/",{
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        currentCity = data.city;
        locate.innerText = currentCity;
        getWeatherData(currentCity);
       
    
    });
}
getPublicIp();

function getWeatherData(city){
    const apiKey = "f1914063df13975e8fc8a851b230bd66";
    fetch(
       ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
       {
        method: "GET",
       }
    )
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        let today = data.main;
    
        temperature.innerText = `${(today.temp-273.15).toFixed(0)}\u00B0`;


        let skyCondition = data.clouds.all;
        if(data.weather[0].main == "Rain"){
            con.innerText = "It's Raining";
            sky.style.backgroundImage = "url(rain.png)";
            sky.style.marginLeft = "12vmin";
            leftPart.style.backgroundImage = "url(rainy-day.jpg)";
        }
        else if(data.weather[0].main == "Snow"){
            con.innerText = "Snowfall";
            sky.style.backgroundImage = "url(snow.png)";
            sky.style.marginLeft = "11vmin";
            leftPart.style.backgroundImage = "url(snowday.jpg)";
        }
        else if(skyCondition <= 10){
            con.innerText = "Clear";
            sky.style.backgroundImage = "url(clear.png)";
            sky.style.marginLeft = "10vmin";
            leftPart.style.backgroundImage = "url(clear-sky.jpg)";
        }
        else if(skyCondition>10 && skyCondition<=20){
            con.innerText = "Mostly Clear";
            sky.style.backgroundImage = "url(mostly-clear.png)";
            leftPart.style.backgroundImage = "url(mostly-clear-sky.jpg)";
            sky.style.marginLeft = "11vmin";
        }
        else if(skyCondition>20 && skyCondition<=50){
            con.innerText = "Partly Cloudy";
            sky.style.backgroundImage = "url(partly-cloudy.png)";
            leftPart.style.backgroundImage = "url(partly-cloudy-sky.jpg)";
            sky.style.marginLeft = "11vmin";
        }
        else if(skyCondition>50 && skyCondition<=80){
            con.innerText = "Cloudy";
            sky.style.backgroundImage = "url(mostly-cloudy.png)";
            leftPart.style.backgroundImage = "url(mostly-cloudy-sky.jpg)";
            sky.style.marginLeft = "12vmin";
        }
        else{
            con.innerText = "Overcast";
            sky.style.backgroundImage = "url(overcast.png)";
            leftPart.style.backgroundImage = "url(overcast-sky.jpg)";
            sky.style.marginLeft = "12vmin";
        }

        let speed = data.wind.speed;
        windSpeed.innerHTML = `${speed}<small>kmph<small>`;

        let humidityPercent = data.main.humidity;
        humidity.innerHTML = `${humidityPercent}<small>%<small>`;

        let pressureRate = data.main.pressure;
        pressure.innerHTML = `${pressureRate}<small>HPa<small>`;

        let cloudPercent = data.clouds.all;
        cloud.innerHTML = `${cloudPercent}<small>%<small>`;
    });
}


searchBtn.addEventListener("click",(e) => {
    e.preventDefault();
    let location = search.value;
    if(location == ""){
        alert("Enter a city name to search.");
    }
    if (location) {
        currentCity = location;
        getWeatherData(currentCity);
        locate.innerText = currentCity;
    }
   
});

document.addEventListener('DOMContentLoaded', () => {
search.addEventListener('keydown', (event)=>{
   
    if (event.keyCode === 13) {
        event.preventDefault();
        if(search.value == ""){
            alert("Enter a city name to search.");
        }
       
        let location = search.value;
        if (location) {
            currentCity = location;
            getWeatherData(currentCity);
            locate.innerText = currentCity;
        }
    }
    });
});
liveBtn.addEventListener("click",()=>{
    getPublicIp(); 
    search.value ="";
})