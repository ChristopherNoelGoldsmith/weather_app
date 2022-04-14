import * as weatherCall from './models/get_data.js';
import * as parseInfo from './models/parse_Info.js';
import * as createCard from './views/create_card.js';
import { createMainCards } from './views/main_card.js';
import { getValue } from './views/search_bar.js';
import { changeArrows } from './views/side_arrows.js';
import { metric } from './views/C_F_btn.js';
import * as DOM from './views/dom.js';

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
  const data = await locationController(latLong, metric);
  cardController(data, metric);
};

const addEventListeners = () => {
  //search button
  $(DOM.dom.searchBtn).on('click', async () => {
    const val = await DOM.searchclick();
    console.log(val);
    return activate(...val);
  });
  //page left
  $(DOM.dom.leftBtn).on('click', () => {
    const page = changeArrows('left');
    return createCard.createCard(page, 'main', false);
  });
  //page right
  $(DOM.dom.rightBtn).on('click', () => {
    const page = changeArrows('right');
    return createCard.createCard(page, 'main', false);
  });
  //C - F toggle
  $(DOM.dom.cfBtn).on('click', async () => {
    const val = await DOM.cFClick();
    console.log(val);
    return activate(...val);
  });
};

addEventListeners();
activate();
