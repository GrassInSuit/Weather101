import { apiKey, fixedURL , textCreator} from "./cte.js";

//fetchs weather data from the API
const fetchList = document.getElementById('inputList');

fetchList.addEventListener('submit',event => fetchWeather(event,false));
//fetchs weather data from the API and returns the active data if already fetched
async function fetchWeather(event , isFetched) {
const cityInput = fetchList.querySelector('input').value;
const unitGroup = fetchList.querySelector('select').value;
const errorHandler = document.getElementById('errorHandler');
let activeData;
//stops fetching existing data if already fetched
    if (isFetched)
        return activeData;
//fetches data from the API
    event.preventDefault();
        const response = await fetch(`${fixedURL}${cityInput}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`);
          if (!response.ok){
        textCreator("City not found, please try again",errorHandler);
        return;
    }
        //if fetching was successful, store the data in activeData as a JSON object
        activeData = await response.json();
        console.log("fetching done " ,response.status);
        textCreator("",errorHandler);
        //debugging button for temporary testing purposes, will be removed in the future
        const debugButton = document.getElementById('debug');
        debugButton.addEventListener('click',() => console.log(response.body.getReader()));
}

async function updateWeather(){
    const activeData = await fetchWeather(undefined,false);
}

