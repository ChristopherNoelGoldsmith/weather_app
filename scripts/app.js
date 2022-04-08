//models

function errorMessage(fnName, err) {
  console.log(`error in "${fnName}" function\b
    ERROR: ${err}`);
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
    'X-RapidAPI-Key': 'ea37a54435msh562d33296e554cbp1cc1c2jsn71e346517fec',
  },
};

function getLatLon() {
  try {
    return new Promise((res, rej) => {
      return navigator.geolocation.getCurrentPosition(function (position, err) {
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

const getData = async function () {
  try {
    const { lat, long } = await getLatLon();

    const data = await fetch(
      `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${long}`,
      options
    );

    const json = await data.json();

    const { state_code, timezone, country_code, city_name } = json;

    //$('body').text(json.data);
    return json;
  } catch (err) {
    errorMessage('getData', err);
  }
};

const parseDataThisWeek = async function (apiData) {
  try {
    apiData = await apiData;
    //obtains current day and hour to parse the data within the JSON paseed through this function
    //const currentTime = new Date();
    //const day = currentTime.getDate();
    //const hour = currentTime.getHours();
    const next24Hours = apiData.data.splice(0, 8);
    console.log(next24Hours);
    return next24Hours;
    //console.log(next24Hours);
  } catch (err) {
    errorMessage('parseDataThisWeek', err);
  }
};

//pass the result of parseDataThisWeek through the functions below
const parseDataTimeAndDay = function (data) {
  //parses the data of an array of the Weatherbit API's object
  try {
    data = data.map((el) => {
      el = el.datetime.match(/..:../)[0].split(':');
      [date, hour] = el;
      el = {
        date,
        hour,
      };
      return el;
    });
    //console.log(data);
    return data;
  } catch (err) {
    errorMessage('parseDataTimeAndDay', err);
  }
};

const parseTemp = function (data) {
  //parses the data of an array of the Weatherbit API's object
  try {
    data = data.map((el) => {
      el = el.temp;
      el = celToFh(el);
      el = Math.round(el);
      return el;
    });
    console.log(data);
    return data;
  } catch (err) {
    errorMessage('parseDataTimeAndDay', err);
  }
};
//
//C to F
const celToFh = (temp) => {
  temp = (temp * 9) / 5 + 32;
  console.log(temp);
  return temp;
};

//views
const makeCard = function (time, today, month, day, temp) {
  const template = `
  <div class="widget">
  <div class="inner-widget">
    <div class="time">${time}:00</div>
    <div class="day">
      <span class="weekday">${today}</span>
      <span class="date">${month}/${day}</span>
    </div>
    <i class="fa-solid fa-cloud-bolt"></i>
    <div class="temp">
      <span class="high">${temp} Degrees</span>
      
    </div>
  </div>
  </div>`;

  return template;
};

const addCard = function (card) {
  card.forEach((el) => {
    $('main').append(el);
  });
};

const dayOfWeek = (el) => {
  switch (el) {
    case 0:
      return 'Sunday';
      break;
    case 1:
      return 'Monday';
      break;
    case 2:
      return 'Tuesday';
      break;
    case 3:
      return 'Wednesday';
      break;
    case 4:
      return 'Thursday';
      break;
    case 5:
      return 'Friday';
      break;
    case 6:
      return 'Saturday';
      break;
    default:
      return 'Sunday?';
      break;
  }
};

const getMonth = (el) => {
  switch (el) {
    case 1:
      return 'Janurary';
      break;
    case 2:
      return 'Feburary';
      break;
    case 3:
      return 'March';
      break;
    case 4:
      return 'April';
      break;
    case 5:
      return 'May';
      break;
    case 6:
      return 'June';
      break;
    case 7:
      return 'July';
      break;
    case 8:
      return 'August';
      break;
    case 9:
      return 'September';
      break;
    case 10:
      return 'October';
      break;
    case 11:
      return 'November';
      break;
    default:
      return 'December';
      break;
  }
};

//controller
const init = async function () {
  const data = await getData();
  const thisWeek = await parseDataThisWeek(data);
  const d = parseDataTimeAndDay(thisWeek);
  const t = parseTemp(thisWeek);
  console.log(d);
};

//init();
