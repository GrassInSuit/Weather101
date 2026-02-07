import { apiKey , fixedURL } from "./cte.js";
import { fetchWeather , textContent } from "./methods.js";


//fetchs weather data from the API

const fetchList = document.getElementById('inputList');
const textHandler = new textContent();
const fetchHandler = new fetchWeather();
let activeData;
const cityName = fetchList.querySelector('input[name="city"]').value;
const unitGroup = fetchList.querySelector('select').value;

navigator.geolocation.getCurrentPosition(async position => {
    const Latitude = position.coords.latitude.toFixed(2);
    const Longitude = position.coords.longitude.toFixed(2);
    fetchHandler.useCoords(Latitude,Longitude,unitGroup).then(data => {
        fetchHandler.getLocationName(Latitude,Longitude).then(name => {
            activeData = Object.assign({locationName:name},data);
            console.log(activeData);
        })

})})
    //fetchs weather data from the API and returns the active data if already fetched

    fetchList.addEventListener('submit',event => {
        event.preventDefault();
        fetchHandler.useName(cityName,unitGroup).then(data => {
    activeData = data;
    console.log(activeData);
})
.catch(error => {
    console.error('Error fetching weather data:', error);
    textHandler.createText(`Error ${error.status} : ${error.message}`,errorHandler);
});

    });
       const debugButton = document.getElementById('debug');

const currentWeather = document.getElementById('currentWeather');

        async function updateWeather(event){
            let isFetched = true;
            event.preventDefault();
            if (!activeData){
                isFetched = false;
            }

            
        }


        //debugging button for temporary testing purposes, will be removed in the future

        debugButton.addEventListener('click',(event) =>{
        console.log(activeData);    
        });