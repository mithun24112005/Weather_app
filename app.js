const inputbox = document.querySelector('.input-box');
const searchbtn = document.querySelector('.search-btn');
const weatherimg = document.querySelector('.weather-img');
const temp = document.querySelector('.temperature');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind-speed');
const weather_des = document.querySelector('.weather-discription');
const weather_not_found = document.querySelector('.weather-not');
const bg_video_container = document.querySelector('.background-video');

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

async function bg_videos(video) {
    // Remove any existing video elements
    while (bg_video_container.firstChild) {
        bg_video_container.removeChild(bg_video_container.firstChild);
    }
    
    // Create new video element
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;
    videoElement.classList.add('bg-video');
    const sourceElement = document.createElement('source');
    sourceElement.src = video;
    videoElement.appendChild(sourceElement);
    bg_video_container.appendChild(videoElement);
}

function checkWeather(city) {
    const api_key = '2817f07653293c4b754ef29e35506f4b';
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
                bg_videos('cloud_vid.mp4');
            } else if (weatherCondition.includes("rain")) {
                weatherimg.src = "rain.png";
                bg_videos('rain_vid.mp4');
            } else if (weatherCondition.includes("clear")) {
                weatherimg.src = "clear.png";
                bg_videos('clear_vid.mp4');
            } else if (weatherCondition.includes("mist")) {
                weatherimg.src = "mist.png";
                bg_videos('mist_vid.mp4');
            } else if (weatherCondition.includes("snow")) {
                weatherimg.src = "snow.png";
                bg_videos('snow_vid.mp4');
            } else {
                weatherimg.src = "404.png";
            }

        } else {
            weather_not_found.innerHTML = "Sorry, location not found";

            temp.innerHTML = "--°C";
            humidity.innerHTML = "--%";
            wind.innerHTML = "--Km/H";
            weather_des.innerHTML = "-----";
            weatherimg.src = "404.png";
            bg_videos('default_bg_vid.mp4');
        }
    }).catch(error => {
        console.error("Error fetching weather data:", error);
        weather_not_found.innerHTML = "Sorry, location not found";

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

