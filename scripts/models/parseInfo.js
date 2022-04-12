import { errorMessage } from './error_msg.js';
import * as monthDay from './monthDay.js';
//import { getData, getLatLon } from './Weather_Call';

export const parseDataThisWeek = function (apiData, timeframe = 'week') {
  console.log(apiData);
  apiData = apiData.data;
  //obtains current day and hour to parse the data within the JSON paseed through this function
  if ((timeframe = 'week')) {
    const thisWeek = apiData.filter((el) => {
      el = el.datetime.match(/:00/);
      return el;
    });

    return thisWeek;
  }
};

export const getMiscStats = (data) => {
  data = data.map((el) => {
    const { wind_spd, pres, rh, dewpt, vis, uv, precip } = el;
    return [wind_spd, pres, rh, dewpt, vis, uv, precip];
  });
  return data;
};

//pass the result of parseDataThisWeek through the functions below
export const parseDataTimeAndDay = function (data) {
  //parses the data of an array of the Weatherbit API's object
  try {
    data = data.map((el) => {
      el = el.datetime.match(/..:../)[0].split(':');
      const [date, hour] = el;
      el = {
        date,
        hour,
      };
      return el;
    });
    return data;
  } catch (err) {
    errorMessage('parseDataTimeAndDay', err);
  }
};

export const parseTemp = function (data) {
  //parses the data of an array of the Weatherbit API's object
  data = data.map((el) => {
    el = el.temp;
    console.log(el);
    el = celToFh(el);
    el = Math.round(el);
    console.log(el);
    return el;
  });
  return data;
};
//

export const getMonth = function (data, string = false) {
  try {
    data = data.map((el) => {
      el = el.datetime.match(/-\d\d-/)[0];
      el = el.match(/\d\d/)[0];

      if ((string = 'string')) el = monthDay.getMonthString(el);

      return el;
    });
    return data;
  } catch (err) {
    errorMessage('getMonth', err);
  }
};

//converts the js date object to an array with the desired dumber of named days of the week in order
//ex if today is tuesday and you need today and the next three days pass 3 as param and it will return
//[Tuesday, Wednesday, Thursday]
//it has a default of 8 to return today and tomorrow;
export const getToday = function (num) {
  const days = num.map((el) => {
    el = el.date;
    el = monthDay.createCalWeek(el);
    return (el = monthDay.dayOfWeek(el));
  });
  return days;
};

export const getDescIcon = function (data) {
  data = data.map((el) => {
    return el.weather;
  });
  return data;
};

//Utility Functions
//C to F
const celToFh = (temp) => {
  temp = (temp * 9) / 5 + 32;
  return temp;
};

//
