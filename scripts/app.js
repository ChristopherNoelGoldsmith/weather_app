import * as weatherCall from './models/weatherCall.js';
import * as parseInfo from './models/parseInfo.js';
import * as createCard from './models/createCard.js';
import { createMainCards } from './views/main_card.js';
import { getValue } from './views/search_bar.js';

//connects to the api, retrives the data then parses it.
const locationController = async (latLong) => {
  //targets a location with lat and long to obtain weather data from the api
  if (!latLong) latLong = await weatherCall.getLatLon();
  const { lat, long } = latLong;

  //returns json from the weather api using lat and long as its target
  const data = await weatherCall.getData(lat, long);
  //Interacts with title card and changes the text to the current location
  //obtains the location name
  const thisPlace = parseInfo.getThisPlace(data);
  //
  //obtains all values held in the cards which will be appended to the dom
  const weatherData = parseInfo.parseData(data);

  return {
    thisPlace,
    weatherData,
  };
};

//plugs data into cards then creates and appends them to the DOM
const cardController = (data) => {
  const { thisPlace, weatherData } = data;
  //is what creates cards
  //can use array.split() to reduce the number of cards returned
  const cards = weatherData.map((el) => {
    return createMainCards(el);
  });
  createCard.changeTitle(thisPlace);
  createCard.createCard(cards, 'main');
};

//initiates the api and cards
const activate = async (latLong) => {
  const data = await locationController(latLong);
  cardController(data);
};

//Uses on click to identify the ID of an element and activate the search bar.
$(document).on('click', async (target) => {
  if ((target.id = 'search-btn')) {
    let val = getValue();
    val = val.split(',');
    const data = await weatherCall.reverseGeocode(...val);
    const { lat, lon } = data[0];
    return activate({ lat, long: lon });
  }
});

activate();
