import { dom } from './dom.js';
import { reverseGeocode } from '../models/get_data.js';

//returns searchbar value
const getValue = () => {
  const data = $('.search').val();
  return data;
};

//checks the current status of the DOM's measurement button. If toggle is true it changes C - F;
//if it is false it returns the current value of the button. C or F;
const toggleUnits = (toggle) => {
  const celc = document.querySelector('#C-F-btn').classList.contains('C');
  const far = document.querySelector('#C-F-btn').classList.contains('F');
  const btn = document.querySelector('#C-F-btn');

  if (!toggle) {
    if (celc) return 'C';
    if (far) return 'F';
  }

  //if toggle is true, C and F are toggled below and the appropriate value is returned.
  btn.classList.toggle('C');
  btn.classList.toggle('F');
  if (celc) return 'F';
  if (far) return 'C';
};

//event tied to the C/F button in the dom to change temp measurements
export const cFClick = async () => {
  const changeMeasurement = toggleUnits(true);
  let loc = $(dom.locationName).text();
  //regexp parses the location string given by the api to seperate city, state, country into an array;
  const regExpForLoc = /(\w+(\s\w+)?)/gi;
  loc = loc.match(regExpForLoc);
  //this returns your current location if the searchbar has an empty address
  if (!loc || loc[0] == '') {
    return [false, changeMeasurement];
  }
  //if a valid address is in the searchbar
  const data = await reverseGeocode(...loc);
  const { lat, lon } = data[0];
  return [{ lat, long: lon }, changeMeasurement];
};

//event tied to the search button in the dom
export const searchclick = async () => {
  let val = getValue();
  val = val.split(',');
  const data = await reverseGeocode(...val);
  const { lat, lon } = data[0];
  return [{ lat, long: lon }, toggleUnits()];
};
