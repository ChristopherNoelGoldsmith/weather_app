import { errorMessage } from './error_msg.js';
//import { getData, getLatLon } from './Weather_Call';

export const parseDataThisWeek = function (apiData) {
  try {
    apiData = apiData.data;
    //obtains current day and hour to parse the data within the JSON paseed through this function
    //const currentTime = new Date();
    //const day = currentTime.getDate();
    //const hour = currentTime.getHours();
    const next24Hours = apiData.splice(0, 8);

    return next24Hours;
  } catch (err) {
    errorMessage('parseDataThisWeek', err);
  }
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
  try {
    data = data.map((el) => {
      el = el.temp;
      el = celToFh(el);
      el = Math.round(el);
      return el;
    });
    return data;
  } catch (err) {
    errorMessage('parseDataTimeAndDay', err);
  }
};
//
//C to F
const celToFh = (temp) => {
  temp = (temp * 9) / 5 + 32;
  return temp;
};
