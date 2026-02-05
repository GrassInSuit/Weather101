export const fixedURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
export const apiKey = '4FH9BFL8Z7EUBPPJYA3WEBRBC';
//error handling
export  function textCreator(message,section){
            const paragraph = document.createElement('p');
            const content = document.createTextNode(message);
            paragraph.appendChild(content);
            section.appendChild(paragraph);
        }

