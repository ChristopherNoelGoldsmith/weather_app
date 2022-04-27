import { reverseGeocode } from "./get_forcast.js";

/*export const searchClick = async () => {
    let val = document.querySelector('.search').value;
    val = val.split(',');
    const data = await reverseGeocode(...val);
    return data;
};
*/
//event tied to the C/F button in the dom to change temp measurements
/*export const cFClick = async () => {
    //const changeMeasurement = toggleCelcFaren(true);
    let loc = $('#location-name').text();
    //regexp parses the location string given by the api to seperate city, state, country into an array;
    const regExpForLoc = /(\w+(\s\w+)?)/gi;
    loc = loc.match(regExpForLoc);
    //this returns your current location if the searchbar has an empty address
    if (!loc || loc[0] === '' || loc[0] == null) {
        return false;
    }
    //if a valid address is in the searchbar
    const data = await reverseGeocode(...loc);
    return data;
};*/