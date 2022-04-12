import * as weatherCall from './models/weatherCall.js';
import * as parseInfo from './models/parseInfo.js';
import * as createCard from './models/createCard.js';
import { MainCard } from './views/main_card.js';
import { getValue } from './views/search_bar.js';

//controller
const init = async (latLong) => {
  if (!latLong) latLong = await weatherCall.getLatLon();
  console.log(latLong);
  const { lat, long } = latLong;

  //returns json from the weather api using lat and long as its target
  const data = await weatherCall.getData(lat, long);

  //Interacts with title card and changes the text to the current location
  const thisPlace = parseInfo.getThisPlace(data);

  const thisWeek = parseInfo.parseDataThisWeek(data, 'week');

  const thisMonth = parseInfo.getMonth(thisWeek);

  //Returns time in an array [day of the month, hour 24 time]
  const dateHour = parseInfo.parseDataTimeAndDay(thisWeek);
  const temp = parseInfo.parseTemp(thisWeek);
  const descIcon = parseInfo.getDescIcon(thisWeek);
  const miscStats = parseInfo.getMiscStats(thisWeek);
  const dayOfWeek = parseInfo.getToday(dateHour);

  return {
    thisPlace,
    dateHour,
    temp,
    thisMonth,
    dayOfWeek,
    descIcon,
    miscStats,
  };
};

//scartch
const cardController = (data) => {
  const {
    thisPlace,
    dateHour,
    temp,
    thisMonth,
    dayOfWeek,
    descIcon,
    miscStats,
  } = data;
  const cards = [];
  //console.log(dateHour[1].date);
  for (let i = 0; dateHour.length > i; i++) {
    const { icon, description } = descIcon[i];
    const { date, hour } = dateHour[i];
    let today;
    const misc = miscStats[i];
    const tempurature = temp[i];
    const month = thisMonth[i];
    dateHour[i].hour == '00' && i > 1
      ? (today = dayOfWeek[1])
      : (today = dayOfWeek[0]);
    data = new MainCard(
      hour,
      today,
      month,
      date,
      tempurature,
      description,
      icon,
      ...misc,
      'vis'
    );
    data.getLow();
    if (i > 4) data.notVis();
    const newCard = data.getTemplate();
    cards.push(newCard);
  }
  createCard.changeTitle(thisPlace);
  createCard.createCard(cards, 'main');
};

const activate = async (latLong) => {
  const data = await init(latLong);
  cardController(data);
};

//parseInfo.getToday(9);

//activate();

$(document).on('click', async (target) => {
  console.log(target);
  if ((target.id = 'search-btn')) {
    let val = getValue();
    val = val.split(',');
    console.log(val);
    const data = await weatherCall.reverseGeocode.apply(null, val);
    const { lat, lon } = data[0];
    return activate({ lat, long: lon });
  }
});

activate();
