const inputbox = document.querySelector('.input-box');
const searchbtn = document.querySelector('.search-btn');
const weatherimg = document.querySelector('.weather-img');
const temp = document.querySelector('.temperature');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind-speed');
const weather_des = document.querySelector('.weather-discription');
const weather_not_found = document.querySelector('.weather-not');
const bg_video = document.querySelector('#vid-here');

const get_data = async function getdata(url) {
    try {
        console.log("Getting data...");
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

async function bg_videos(video) {
    try {
        bg_video.querySelector('source').src = video;
        await bg_video.load();
        await bg_video.play();
    } catch (error) {
        console.error("Error playing background video:", error);
    }
}

function checkWeather(city) {
    const api_key = '2817f07653293c4b754ef29e35506f4b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`; // Added `&units=metric` for Celsius
    get_data(url).then(data => {
        if (data.cod === 200) { // Check if the response is successful
            // Clear the "location not found" message
            console.log(data);
            weather_not_found.innerHTML = "";

            // Update the UI with weather data
            temp.innerHTML = `${data.main.temp}°C`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed} Km/H`;
            weather_des.innerHTML = `${data.weather[0].description}`;

            // Update the weather image and background video based on the weather condition
            const weatherCondition = data.weather[0].main.toLowerCase();
            if (weatherCondition.includes("cloud")) {
                weatherimg.src = "cloud.png";
                bg_videos('cloud_vid.mp4')
            } else if (weatherCondition.includes("rain")) {
                weatherimg.src = "rain.png";
                bg_videos('rain_vid.mp4')
            } else if (weatherCondition.includes("clear")) {
                weatherimg.src = "clear.png";
                bg_videos('clear_vid.mp4')
            } else if (weatherCondition.includes("mist")) {
                weatherimg.src = "mist.png";
                bg_videos('mist_vid.mp4')
                // bg_video.querySelector('source').src = "mist_vid.mp4";
            } else {
                weatherimg.src = "404.png";
            }

        } else {
            // Display "location not found" message
            weather_not_found.innerHTML = "Sorry, location not found";

            // Clear other weather details
            temp.innerHTML = "--°C";
            humidity.innerHTML = "--%";
            wind.innerHTML = "--Km/H";
            weather_des.innerHTML = "-----";
            weatherimg.src = "404.png";
        }
    }).catch(error => {
        console.error("Error fetching weather data:", error);
        weather_not_found.innerHTML = "Sorry, location not found";

        // Clear other weather details
        temp.innerHTML = "--°C";
        humidity.innerHTML = "--%";
        wind.innerHTML = "--Km/H";
        weather_des.innerHTML = "-----";
        weatherimg.src = "404.png";
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