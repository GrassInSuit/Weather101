import dmsConverter, { apiKey , fixedURL , textContent} from "./cte.js";
const dms = new dmsConverter();
const userCurrentPosition = navigator.geolocation.getCurrentPosition(position => {
    const positionData = JSON.stringify(position);
    console.log(`User's current position longitude: ${position.coords.longitude}, latitude: ${position.coords.latitude}`); 
})
console.log(userCurrentPosition);

//fetchs weather data from the API

const fetchList = document.getElementById('inputList');
const textHandler = new textContent();

let activeData;

    //fetchs weather data from the API and returns the active data if already fetched

    fetchList.addEventListener('submit',event => fetchWeather(event,false));    
        async function fetchWeather(event , isFetched) {
        const cityInput = fetchList.querySelector('input').value;
        const unitGroup = fetchList.querySelector('select').value;
        const errorHandler = document.getElementById('errorHandler');

        //stops fetching existing data if already fetched

                if (isFetched){
                    return activeData;
        }
            //prevents the default form submission behavior, which would cause a page reload
            
            event.preventDefault();
        
            //fetches data from the API
                textHandler.createText("fetching data...",errorHandler);
                const response = await fetch(`${fixedURL}${cityInput}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`);
                //handling errors if fetching was unsuccessful, displays the error status and message in the errorHandler section

                if (!response.ok){
                    textHandler.createText(`Error ${response.status} : ${response.statusText}`,errorHandler);
                return;
            }           
                //if fetching was successful, store the data in activeData as a JSON object
        
                textHandler.removeText(errorHandler);
                console.log("fetching done " ,response.status);
                activeData = await response.json();
                
        }
       const debugButton = document.getElementById('debug');

const currentWeather = document.getElementById('currentWeather');

        async function updateWeather(event){
            let isFetched = true;
            event.preventDefault();
            if (!activeData){
                isFetched = false;
            }
            await fetchWeather(event,isFetched);
            
        }


        //debugging button for temporary testing purposes, will be removed in the future

        debugButton.addEventListener('click',(event) =>{
        updateWeather(event);    
        });