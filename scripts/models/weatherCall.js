import { errorMessage } from './error_msg.js';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
    'X-RapidAPI-Key': 'ea37a54435msh562d33296e554cbp1cc1c2jsn71e346517fec',
  },
};

export function getLatLon() {
  try {
    return new Promise((res, rej) => {
      return navigator.geolocation.getCurrentPosition(function (position, err) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        res({
          lat: lat,
          long: long,
        });
      });
    });
  } catch (err) {
    errorMessage('getLatLon', err);
  }
}

export const getData = async function (lat, long) {
  try {
    const data = await fetch(
      `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${long}`,
      options
    );

    const json = await data.json();
    //const { state_code, timezone, country_code, city_name } = json;

    //$('body').text(json.data);
    return json;
  } catch (err) {
    errorMessage('getData', err);
  }
};
