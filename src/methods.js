import { apiKey , fixedURL} from "./cte.js";
export function textContent(){
    this.createText = function(text,element){
        this.removeText(element);
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    this.removeText = function(element){
        element.innerHTML = '';
    }
    this.updateText = function(text,element){
        this.removeText(element);
        this.createText(text,element);
    }
}

export function fetchWeather() {
        this.getLocationName = async function(Latitude,Longitude){
    try {
       const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${Latitude}&lon=${Longitude}&limit=5&appid=${apiKey.geolocation}`);
         if (!response.ok){
            throw new Error(`Error ${response.status} : ${response.statusText}`);
        }
        const data = await response.json();
        return data[0].name;
    }
        catch (error){
            console.error('Error fetching geolocation data:', error);
        }};
    this.useName = async function(name,unitGroup){        
            //fetches data from the API
                const response = await fetch(`${fixedURL}${name}?unitGroup=${unitGroup}&key=${apiKey.weather}&contentType=json`);
                //handling errors if fetching was unsuccessful, displays the error status and message in the errorHandler section

                if (!response.ok){
                    throw new Error(`Error ftahcing by name ${response.status} : ${response.statusText}`);
            }           
                //if fetching was successful, store the data in activeData as a JSON object
                console.log("fetching done by name! " ,response.status);
                return await response.json();
}
    this.useCoords = async function(Latitude,Longitude,unitGroup){
        //fetches data from the API
            const response = await fetch(`${fixedURL}${Latitude},${Longitude}?unitGroup=${unitGroup}&key=${apiKey.weather}&contentType=json`); 
            if (!response.ok){
                throw new Error(`Error fetching by coords ${response.status} : ${response.statusText}`);
        }
                //if fetching was successful, return the fetched data as a JSON object
                console.log("fetching done by coods! " ,response.status);
                return await response.json();  
         }}
