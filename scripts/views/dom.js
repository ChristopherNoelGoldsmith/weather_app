import * as weatherCall from '../models/get_data.js';
import { getValue } from './search_bar.js';
import { metric } from './C_F_btn.js';

export const dom = {
  cfBtn: '#C-F',
  leftBtn: '#left',
  rightBtn: '#right',
  searchBtn: '#search-btn',
  locationName: '#location-name',
};

//event tied to the C/F button in the dom to change temp measurements
export const cFClick = async () => {
  const changeMeasurement = metric(true);
  let val = $(dom.locationName).text();
  val = val.split(',');
  val[1] = val[1].split('-');
  val = [val[0], '', val[1][1]];
  val;
  console.log(val);
  //this returns your current location if the searchbar has an empty address
  if (!val || val[0] == '') {
    return [false, changeMeasurement];
  }
  //if a valid address is in the searchbar
  const data = await weatherCall.reverseGeocode(...val);
  console.log(data);
  const { lat, lon } = data[0];
  return [{ lat, long: lon }, changeMeasurement];
};

//event tied to the search button in the dom
export const searchclick = async () => {
  let val = getValue();
  console.log(val);
  val = val.split(',');
  const data = await weatherCall.reverseGeocode(...val);
  const { lat, lon } = data[0];
  return [{ lat, long: lon }, metric()];
};
