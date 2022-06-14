//uses the openweathermap api to reverse geocode a location entered into the searchbar in the DOM
//needs the api key hidden as it is currently exposed.
//only city is NEEDED to get a response but the state and country peramiters will give
//the reverseGeocode function more accuracy
export const reverseGeocode = async (city, state = "", country = "") => {
  const limit = 5;
  const key = process.env.REVGEO_API_KEY;
  //error handling for certain countries that do not return positive on search due to the api's data;
  //looking for bet[ter fix;
  if (/\d\d/.test(state)) state = "";
  console.log(`City:${city}`, `State:${state}`, `Country:${country}`);
  const options = {
    method: "GET",
    headers: {
      "Content-Security-Policy": "upgrade-insecure-request;",
    },
  };
  const data = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${key}`
  );

  const json = await data.json();
  console.log(json);
  const { lat, lon } = json[0];
  return { lat, long: lon };
};

//gets lat and long
export function getCurrentLatLon() {
  // mutate position depending on requirements to give proper city
  try {
    return new Promise((res, rej) => {
      return navigator.geolocation["getCurrentPosition"](function (
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
    errorMessage("getLatLon", err);
  }
}

//!!obtains data from the weatherbit apit utilizing lat and long obtained from
//!!ither the js geolocation api or the reverseGeocode (openweathermapapi) function
//!!has option to add unit to change to metric. Default is imperial.
//
export const getData = async function (lat, long, unit) {
  try {
    console.log(lat, long);
    const key = process.env.WEATHER_API_KEY;
    const data = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${lat}&lon=${long}&units=${unit}&days=14`
    );

    const json = await data.json();
    //console.log(json);
    return json;
  } catch (err) {
    errorMessage("getData", err);
  }
};

const errorMessage = (fnName, err) => {
  console.log(`error in "${fnName}" function\b
        ERROR: ${err}`);
};
