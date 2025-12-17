let id = 'a4212028811a3536c627a9e80133c4b5';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector('form');
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('.error-dis');
let errorTimeout = null;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (valueSearch.value != '') {
        searchWeather();
    }
})

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200){
                if (errorTimeout) { clearTimeout(errorTimeout); errorTimeout = null; }
                main.style.display = 'none';
                main.innerHTML = '';
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;
                
                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else{
                main.innerHTML = 'City not found';
                main.style.display = 'block';
                main.style.color = 'red';
                main.style.fontSize = '15px';
                if (errorTimeout) clearTimeout(errorTimeout);
                errorTimeout = setTimeout(() => {
                    main.style.display = 'none';
                    main.innerHTML = '';
                    errorTimeout = null;
                }, 3000);
            }
            valueSearch.value = '';
        })
}

//search default 
const iniApp = () => {
    valueSearch.value = 'portugal';
    searchWeather();
}
iniApp();