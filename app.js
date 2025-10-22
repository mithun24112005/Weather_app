const inputbox = document.querySelector('.input-box');
const searchbtn = document.querySelector('.search-btn');
const weatherimg = document.querySelector('.weather-img');
const temp = document.querySelector('.temperature');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind-speed');
const weather_des = document.querySelector('.weather-discription');
const weather_not_found = document.querySelector('.weather-not');
const container_bg = document.querySelector('.container');

const get_data = async function getdata(url) {
    try {
        console.log("Getting data...");
        let response = await fetch(url);
        let data = await response.json();
        console.log(response)
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

function checkWeather(city) {
    const api_key = process.env.OPENWEATHER_API_KEY || '2817f07653293c4b754ef29e35506f4b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    get_data(url).then(data => {
        if (data.cod === 200) {
            console.log(data);
            weather_not_found.innerHTML = "";

            temp.innerHTML = `${data.main.temp}°C`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed} Km/H`;
            weather_des.innerHTML = `${data.weather[0].description}`;

            const weatherCondition = data.weather[0].main.toLowerCase();
            if (weatherCondition.includes("cloud")) {
                weatherimg.src = "cloud.png";
                container_bg.style.backgroundImage = "url('cloud_bg.jpg')";
            } else if (weatherCondition.includes("rain")) {
                weatherimg.src = "rain.png";
                container_bg.style.backgroundImage = "url('rain_bg.jpg')";
            } else if (weatherCondition.includes("clear")) {
                weatherimg.src = "clear.png";
                container_bg.style.backgroundImage = "url('clear_bg.jpg')";
            } else if (weatherCondition.includes("mist")) {
                weatherimg.src = "mist.png";
                container_bg.style.backgroundImage = "url('mist_bg.jpg')";
            } else if (weatherCondition.includes("snow")) {
                weatherimg.src = "snow.png";
                container_bg.style.backgroundImage = "url('snow_bg.jpg')";
            } else {
                weatherimg.src = "404.png";
                container_bg.style.backgroundImage = "url('default_bg.jpeg')";
            }
        } else {
            weather_not_found.innerHTML = "Sorry, location not found";
            
            temp.innerHTML = "--°C";
            humidity.innerHTML = "--%";
            wind.innerHTML = "--Km/H";
            weather_des.innerHTML = "-----";
            weatherimg.src = "404.png";
            container_bg.style.backgroundImage = "url('default_bg.jpeg')";
        }
    }).catch(error => {
        console.error("Error fetching weather data:", error);
        weather_not_found.innerHTML = "Sorry, location not found";
        
        temp.innerHTML = "--°C";
        humidity.innerHTML = "--%";
        wind.innerHTML = "--Km/H";
        weather_des.innerHTML = "-----";
        weatherimg.src = "404.png";
        container_bg.style.backgroundImage = "url('default_bg.jpeg')";
    });
}

searchbtn.addEventListener('click', () => {
    const city = inputbox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

