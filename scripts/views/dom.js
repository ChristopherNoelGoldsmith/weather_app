import * as weatherCall from '../models/get_data.js';
import { getValue } from './search_bar.js';
import { toggleUnits } from './C_F_btn.js';

export const dom = {
  cfBtn: '#C-F',
  leftBtn: '#left',
  rightBtn: '#right',
  searchBtn: '#search-btn',
  locationName: '#location-name',
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
  const data = await weatherCall.reverseGeocode(...loc);
  const { lat, lon } = data[0];
  return [{ lat, long: lon }, changeMeasurement];
};

//event tied to the search button in the dom
export const searchclick = async () => {
  let val = getValue();
  val = val.split(',');
  const data = await weatherCall.reverseGeocode(...val);
  const { lat, lon } = data[0];
  return [{ lat, long: lon }, toggleUnits()];
};
