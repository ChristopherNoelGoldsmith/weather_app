import { errorMessage } from './error_msg.js';

//uses the openweathermap api to reverse geocode a location entered into the searchbar in the DOM
//needs the api key hidden as it is currently exposed.
//only city is NEEDED to get a response but the state and country peramiters will give
//the reverseGeocode function more accuracy
export const reverseGeocode = async (city, state = '', country = '') => {
  const limit = 3;
  const key = 'fc5bef22a20647438f60b2a29a04d8b5';
  console.log(city, state, country);

  const options = {
    method: 'GET',
    headers: {
      'Content-Security-Policy': 'upgrade-insecure-request;',
    },
  };
  const data = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${key}`
  );

  const json = await data.json();
  console.log(json);
  return json;
};

//gets lat and long
export function getLatLon() {
  // mutate position depending on requirements to give proper city
  try {
    return new Promise((res, rej) => {
      return navigator.geolocation['getCurrentPosition'](function (
        position,
        err
      ) {
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

//obtains data from the weatherbit apit utilizing lat and long obtained from
//either the js geolocation api or the reverseGeocode (openweathermapapi) function
//has option to add unit to change to metric. Default is imperial.
//
export const getData = async function (lat, long, unit) {
  try {
    const key = 'a609c15503594caf96b28d360952f491';
    const data = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${lat}&lon=${long}&units=${unit}`
    );

    const json = await data.json();
    return json;
  } catch (err) {
    errorMessage('getData', err);
  }
};
