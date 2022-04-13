import * as weatherCall from './models/get_data.js';
import * as parseInfo from './models/parse_Info.js';
import * as createCard from './views/create_card.js';
import { createMainCards } from './views/main_card.js';
import { getValue } from './views/search_bar.js';
import { changeArrows } from './views/side_arrows.js';
import { metric } from './views/C_F_btn.js';

//connects to the api, retrives the data then parses it.
const locationController = async (latLong, metric) => {
  //targets a location with lat and long to obtain weather data from the api
  if (!latLong) latLong = await weatherCall.getLatLon();
  const { lat, long } = latLong;

  //returns json from the weather api using lat and long as its target
  const data = await weatherCall.getData(lat, long, metric);
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
const cardController = (data, metric) => {
  const { thisPlace, weatherData } = data;
  //is what creates cards
  //can use array.split() to reduce the number of cards returned
  const cards = weatherData.map((el) => {
    return (el = createMainCards(el, metric));
  });
  //TO DO!
  //take cards wanted as visable and append them to the main container
  //take cards not-wanted and make them invisable.
  //have scrolling effect before the visability change.
  createCard.changeTitle(thisPlace);
  createCard.createCard(cards, 'main');
};

//initiates the api and cards
const activate = async (latLong, metric = 'I') => {
  console.log(latLong);
  const data = await locationController(latLong, metric);
  cardController(data, metric);
};

//Uses on click to identify the ID of an element and activate the search bar.
$(document).on('click', async (el) => {
  const target = el.target.id;
  let val = getValue();
  val = val.split(',');
  if (target === 'search-btn') {
    const data = await weatherCall.reverseGeocode(...val);
    const { lat, lon } = data[0];
    return activate({ lat, long: lon }, metric());
  }
  if (target === 'left' || target === 'right') {
    const page = changeArrows(target);
    return createCard.createCard(page, 'main', false);
  }
  if (target === 'C-F') {
    const changeMeasurement = metric(true);
    if (!val || val[0] == '') {
      return activate(false, changeMeasurement);
    }
    const data = await weatherCall.reverseGeocode(...val);
    const { lat, lon } = data[0];
    return activate({ lat, long: lon }, changeMeasurement);
  }
});

activate();
