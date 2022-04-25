import * as weatherCall from './models/get_data.js';
import * as parseInfo from './models/parse_Info.js';
import * as mainCard from './views/main_card.js';
import { toggleCelcFaren } from './views/C_F_btn_views.js'
import { searchClick, cFClick } from './models/C_F_btn_model.js';
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
  const cards = weatherData.map((measurments, index) => {
    return mainCard.createMainCards(measurments, mesType, index);
  });
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
    const latLon = await searchClick();
    const mesToggle = toggleCelcFaren();
    return activate(latLon, mesToggle);
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
  document.querySelector('#C-F-btn').addEventListener('click', async () => {
    const latLon = await cFClick();
    const mesToggle = toggleCelcFaren(true);
    return activate(latLon, mesToggle);
  });
  //info-cards in menu
  const sideBarInfoList = ['humidity-info', "pressure-info", "dewpoint-info", "visability-info", "uv-info"];
  sideBarInfoList.forEach(element => {
    return document.getElementById(element).addEventListener('click', () => mainCard.createInfoCard(element));
  });
  //To close leftover elements of the sidebar
  document.querySelector('.toggler').addEventListener('click', () => mainCard.createInfoCard());

};

addEventListeners();
activate();
