const mainframe = document.querySelector('.main-frame');
const searchbox = document.querySelector('.search-txt');
const searchbutton = document.querySelector('.search-btn');
const frame = document.querySelector('.frame');
const detailweather = document.querySelector('.detail-weather');
const errorNotFound = document.querySelector('.error-frame');
const cityhide = document.querySelector('.city-hide');

//  code cap nhat them 
// const searchBtn = document.querySelector('.search-btn');
// const searchTxt = document.querySelector('.search-txt');
// const cityHide = document.querySelector('.city-hide');
// const temperature = document.querySelector('.temperature');
// const description = document.querySelector('.description');
// const humidity = document.querySelector('.humidity span');
// const wind = document.querySelector('.wind span');

searchbutton.addEventListener('click', (e) => {
    e.preventDefault(); // Ngăn trang load lại khi nhấp vào nút
    
    const APIKey = '94bbb580915699227e7efeba71e56524';
    const city = searchbox.value.trim();

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                cityhide.textContent = city;
                mainframe.style.height = '400px';
                frame.classList.remove('active');
                detailweather.classList.remove('active');
                errorNotFound.classList.add('active');
                return;
            }
            
            mainframe.style.height = '450px';
            mainframe.classList.add('active');
            frame.classList.add('active');
            detailweather.classList.add('active');
            errorNotFound.classList.remove('active');

            const image = document.querySelector('.main-frame img');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');
            const humidity = document.querySelector('.humidity span');
            const wind = document.querySelector('.wind span');

            if (cityhide.textContent == city ) {
                return;
            }
            else {
                cityhide.textContent = city;
    
                mainframe.style.height = '450px';
                frame.classList.add('active');
                detailweather.classList.add('active');
                errorNotFound.classList.remove('active');    
            }
            
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/icons8-sunny-100.png';
                    break;
                case 'Rain':
                    image.src = 'images/icons8-lightning-bolt-100.png';
                    break;
                case 'Snow':
                    image.src = 'images/icons8-snow-100.png';
                    break;
                case 'Haze':
                    image.src = 'images/icons8-haze-100.png';
                    break;
                default:
                    image.src = 'images/icons8-cloud-100.png';
                    break;
            }

            // Hiển thị thông tin thời tiết
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        })
        .catch(err => console.error('Error fetching weather data:', err));
});