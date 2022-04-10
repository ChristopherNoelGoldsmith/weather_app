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
  const thisWeek = parseInfo.parseDataThisWeek(data, 30, 5);

  const thisMonth = parseInfo.getMonth(thisWeek);

  //Returns time in an array [day of the month, hour 24 time]
  const dateHour = parseInfo.parseDataTimeAndDay(thisWeek);
  const temp = parseInfo.parseTemp(thisWeek);
  const descIcon = parseInfo.getDescIcon(thisWeek);
  const dayOfWeek = parseInfo.getToday(dateHour);

  console.log(dateHour, thisMonth);

  return {
    dateHour,
    temp,
    thisMonth,
    dayOfWeek,
    descIcon,
  };
};

//scartch
const cardController = (data) => {
  const { dateHour, temp, thisMonth, dayOfWeek, descIcon } = data;
  const cards = [];
  //console.log(dateHour[1].date);
  for (let i = 0; dateHour.length > i; i++) {
    const { icon, description } = descIcon[i];
    const { date, hour } = dateHour[i];

    let today;

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
      icon
    );
    const newCard = data.getTemplate();
    cards.push(newCard);
  }
  createCard(cards, 'main');
};

const activate = async () => {
  const data = await init();
  cardController(data);
};

//parseInfo.getToday(9);

activate();
