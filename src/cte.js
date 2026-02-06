export const fixedURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
export const apiKey = '4FH9BFL8Z7EUBPPJYA3WEBRBC';

//function constructor for text content manipulation
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
};
export function dmsConverter(){
    this.convertToDMS = function(coordinate, type){
        const absolute = Math.abs(coordinate);
        const degrees = Math.floor(absolute);
        const minutesNotTruncated = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesNotTruncated);
        const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
        return `${degrees}°${minutes}'${seconds}" ${type === 'lat' ? (coordinate >= 0 ? 'N' : 'S') : (coordinate >= 0 ? 'E' : 'W')}`;
    }
}