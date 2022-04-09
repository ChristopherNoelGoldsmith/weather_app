import * as weatherCall from './models/weatherCall.js';
import * as parseInfo from './models/parseInfo.js';
import { createCard } from './models/createCard.js';
import { MainCard } from './views/main_card.js';

//controller
const init = async () => {
  const latLong = await weatherCall.getLatLon();

  const { lat, long } = latLong;

  //returns json from the weather api using lat and long as its target
  const data = await weatherCall.getData(lat, long);

  //
  const thisWeek = parseInfo.parseDataThisWeek(data);

  //Returns time in an array [day of the month, hour 24 time]
  const dateHour = parseInfo.parseDataTimeAndDay(thisWeek);
  const temp = parseInfo.parseTemp(thisWeek);

  return {
    dateHour,
    temp,
  };
};

//scartch
const cardController = (data) => {
  const info = new MainCard();
  const newCard = info.getTemplate();
  console.log(newCard);
  const cards = [newCard, newCard, newCard, newCard];

  const card = createCard(cards, 'main');
};

const activate = async () => {
  const data = await init();
  cardController(data);
};

activate();
