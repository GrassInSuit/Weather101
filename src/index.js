import { apiKey , fixedURL , month} from "./cte.js";
import { fetchWeather , textContent } from "./methods.js";


//fetchs weather data from the API

const fetchList = document.getElementById('inputList');
const textHandler = new textContent();
const fetchHandler = new fetchWeather();
let activeData;  
//get's user's current location and automatically fetches the weather data there (requires access to location)

navigator.geolocation.getCurrentPosition(async position => {
    const unitGroup = fetchList.querySelector('select').value;
    const unit = unitGroup == "metric" ? "C" : "F";
    const Latitude = position.coords.latitude.toFixed(2);
    const Longitude = position.coords.longitude.toFixed(2);
    fetchHandler.useCoords(Latitude,Longitude,unitGroup).then(data => {
        fetchHandler.getLocationName(Latitude,Longitude).then(name => {
            activeData = Object.assign({locationName:name, unitGroup, unit},data);
            const localHour = parseInt(activeData.currentConditions.datetime.split(":")[0]);
            console.log(activeData);
            displayCurrentWeather(localHour,0);
        })

})})
    //fetchs weather data from the API and returns the active data if already fetched
console.log(fetchList);
    fetchList.addEventListener('submit',event => {
const cityName = fetchList.querySelector('input[name="city"]').value;
const unitGroup = fetchList.querySelector('select').value;
        event.preventDefault();
        fetchHandler.useName(cityName,unitGroup).then(data => {
        const   unit = unitGroup == "metric" ? "C" : "F";
    activeData = Object.assign({unitGroup, unit},data);
    console.log(activeData);
        const localHour = parseInt(activeData.currentConditions.datetime.split(":")[0]);
    displayCurrentWeather(localHour,0);
        })
.catch(error => {
    console.error('Error fetching weather data:', error);
    textHandler.createText(`Error ${error.status} : ${error.message}`,errorHandler);
});

});
   const selectedWeather = document.querySelector('.selectedWeather');

async function displayCurrentWeather(selectedHour,selectedDay){
    if (activeData){
        const dataPath = activeData.days[selectedDay].hours[selectedHour];
        const Date = activeData.days[selectedDay].datetime.split("-")[2] + " " + month[parseInt(activeData.days[selectedDay].datetime.split("-")[1]) - 1];
        const [year, monthNum, day] = activeData.days[selectedDay].datetime.split("-");
        const formattedHour = selectedHour.toString().padStart(2, '0'); // Ensures "09" instead of "9"
        const date = `${day} ${month[parseInt(monthNum) - 1]} | ${formattedHour}:00`
        const windUnit = activeData.unitGroup === "metric" ? "kph" : "mph";
        let location = activeData.locationName || activeData.resolvedAddress || "Unknown Location";
        console.log(location);
        if (location.length > 20){
            location = location.slice(0,10)+"...";
        }
        const weatherObject = {
            Location : location,
            Timezone: activeData.timezone,
            Temp : dataPath.temp + "°" + activeData.unit,
            fTemp: dataPath.feelslike + "°" + activeData.unit,
            stats : [dataPath.humidity + "%",dataPath.dew + "°"+ activeData.unit,dataPath.windspeed + windUnit,activeData.days[selectedDay].uvindex],
            Icon : dataPath.icon,
            Date : Date,
            hours: activeData.currentConditions.datetime.split(":")[0] + ":" + activeData.currentConditions.datetime.split(":")[1],
            desc: activeData.description
        }
        
        console.log(date);
        textHandler.removeText(errorHandler);
        textHandler.createText(weatherObject.Temp,document.querySelector('.Temp'));
        textHandler.createText("feels like: " + weatherObject.fTemp,document.querySelector('.fTemp'))
        textHandler.createText(weatherObject.Location,document.querySelector('.city'));
        textHandler.createText(weatherObject.Timezone,document.querySelector('.Timezone'));
        textHandler.createText(weatherObject.stats[0],document.getElementById('Humidity'));
        textHandler.createText(weatherObject.stats[1],document.getElementById('Dew'));
        textHandler.createText(weatherObject.stats[2],document.getElementById('Wind'));
        textHandler.createText(weatherObject.stats[3],document.getElementById('UV-index'));
        textHandler.createText(date,document.querySelector('.hourDisplay'));
        
        const weatherIcon = document.querySelector('.Icon');
             const navbar = document.getElementById('days-Slider');       
        weatherIcon.setAttribute('src', `assets/${weatherObject.Icon}.png`);
        //days forcast slider:
        //first this line ensures that the silder is empty
        navbar.innerHTML = '';
        //this block will fill the slider with the next 15 days of weather

        for(let i = 0;i<15;i++){
            const dayElement = document.createElement('div');
            dayElement.setAttribute('class','Day');
            //adding a diffrent id for each day-element to be able to target them later if needed
            dayElement.setAttribute('id','D'+i);
            if (i == selectedDay){
                dayElement.style.backgroundColor = "#37353E";
                dayElement.style.color = "#37353E";
                dayElement.style.boxShadow = "";
                dayElement.style.backdropFilter = "blur(5px)";
                //dayElement.style.transition = "0.3s ease-in-out";
            };

            const dateElement = document.createElement('div');
            dateElement.setAttribute('class','date');
            dateElement.textContent=`${Date}`;

            const dayIcon = document.createElement('img');
            dayIcon.setAttribute('class','Days')
            dayIcon.setAttribute('src', `assets/${activeData.days[i].icon}.png`);

            const dayTemp = document.createElement('div');
            dayTemp.setAttribute('class','temp');
            dayTemp.textContent=`${activeData.days[i].temp}°${activeData.unit}/${activeData.days[i].feelslike}°${activeData.unit}`;
            dayElement.appendChild(dateElement);
            dayElement.appendChild(dayIcon);
            dayElement.appendChild(dayTemp);
            navbar.appendChild(dayElement);
        }
        console.log
            const scrollBar = document.querySelector('.cardWrapper');
            scrollBar.innerHTML = '';
        //this block will fill the slider with the next 24 hours of weather
        for(let i=0;i<24;i++){
            console.log(i);

            const hourElement = document.createElement('div');
            hourElement.setAttribute('class','Hour');
            //adding a diffrent id for each hour-element to be able to target them later if needed
            hourElement.setAttribute('id','H'+i);
                        if (i == selectedHour){
                hourElement.style.backgroundColor = "#A4C4CA";
                hourElement.style.color = "#37353E";

            }
            const hour = document.createElement('div');
            hour.setAttribute('class','hour');
            hour.textContent = `${i}:00`;
            
            const hourIcon = document.createElement('img');
            hourIcon.setAttribute('class','hourIcon');

            hourIcon.setAttribute('src', `assets/${activeData.days[selectedDay].hours[i].icon}.png`);
            hourElement.appendChild(hour);

            const hourTemp = document.createElement('div');
            hourTemp.setAttribute('class','temp');
            hourTemp.textContent = `${activeData.days[selectedDay].hours[i].temp}°${activeData.unit}`;

            hourElement.appendChild(hourIcon);
            hourElement.appendChild(hourTemp);
            scrollBar.appendChild(hourElement);

        }

        //this block will add event listeners to the hour and day elements so that when they are clicked the weather data will be updated to the selected hour and day
    const  hourElements = document.querySelectorAll('.Hour');
    hourElements.forEach(hourElement => {
        hourElement.addEventListener('click',() => {
            const hourId = hourElement.getAttribute('id');
            const hourIndex = parseInt(hourId.substring(1));
            displayCurrentWeather(hourIndex,selectedDay);
        });})
    const dayElements = document.querySelectorAll('.Day');
    dayElements.forEach(dayElement => {
        dayElement.addEventListener('click',() => {
            const dayId = dayElement.getAttribute('id');
            const dayIndex = parseInt(dayId.substring(1));
            displayCurrentWeather(selectedHour,dayIndex);
            
        });});
    }else{
        textHandler.createText("Loading...",errorHandler);
    }}



