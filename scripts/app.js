import * as weatherCall from './models/get_data.js';
import * as parseInfo from './models/parse_Info.js';
import * as mainCard from './views/main_card.js';
import * as cfBtn from './views/C_F_btn.js';
import { changeArrows } from './views/side_arrows.js';
import { dom } from './views/dom.js';

//connects to the api, retrives the data then parses it.
const locationController = async (latLong, mesType) => {
  //targets a location with lat and long to obtain weather data from the api
  if (!latLong) latLong = await weatherCall.getLatLon();
  const { lat, long } = latLong;

  //returns json from the weather api using lat and long as its target
  const data = await weatherCall.getData(lat, long, mesType);
  //obtains all values held in the cards which will be appended to the dom
  const weatherData = parseInfo.parseData(data);

  return {
    data,
    weatherData,
  };
};

//plugs data into cards then creates and appends them to the DOM
const cardController = (data, mesType) => {
  const { weatherData } = data;
  const { state_code, city_name, country_code } = data.data;
  //is what creates cards
  //can use array.split() to reduce the number of cards returned
  const cards = weatherData.map((measurments) => {
    return mainCard.createMainCards(measurments, mesType);
  });
  //TO DO!
  //take cards wanted as visable and append them to the main container
  //take cards not-wanted and make them invisable.
  //have scrolling effect before the visability change.
  mainCard.changeTitle(state_code, city_name, country_code);
  mainCard.createCard(cards, 'main');
};

//initiates the api and cards //the default value of mesType = 'I' is to default it to imperial measurements
const activate = async (latLong, mesType = 'I') => {
  const data = await locationController(latLong, mesType);
  cardController(data, mesType);
};

const addEventListeners = () => {
  //search button
  $(dom.searchBtn).on('click', async () => {
    const val = await cfBtn.searchclick();
    return activate(...val);
  });
  //page left
  $(dom.leftBtn).on('click', () => {
    const page = changeArrows('left');
    return mainCard.createCard(page, 'main', false);
  });
  //page right
  $(dom.rightBtn).on('click', () => {
    const page = changeArrows('right');
    return mainCard.createCard(page, 'main', false);
  });
  //C - F toggle NEEDS TO BE FIXED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  document.querySelector('#C-F-btn').addEventListener('click', async () => {
    const val = await cfBtn.cFClick();
    return activate(...val);
  });
};

addEventListeners();
activate();
