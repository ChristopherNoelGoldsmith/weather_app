import { errorMessage } from './error_msg.js';

export function reverseGeocode() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com',
      'X-RapidAPI-Key': 'ea37a54435msh562d33296e554cbp1cc1c2jsn71e346517fec',
    },
  };

  fetch(
    'https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=164%20Townsend%20St.%2C%20San%20Francisco%2C%20CA&language=en',
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export function getLatLon(position = 'getCurrentPosition') {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
      'X-RapidAPI-Key': 'ea37a54435msh562d33296e554cbp1cc1c2jsn71e346517fec',
    },
  };
  // mutate position depending on requirements to give proper city
  try {
    return new Promise((res, rej) => {
      return navigator.geolocation[position](function (position, err) {
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
    //$('body').text(json.data);
    console.log(json);
    return json;
  } catch (err) {
    errorMessage('getData', err);
  }
};
