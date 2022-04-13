import { errorMessage } from './error_msg.js';
import * as monthDay from './month_day.js';

//parses the data attribute of the API and parses all values used in cards then places them in an array of arrays
//for each day.
export const parseData = (data) => {
  data = data.data.map((el) => {
    let {
      datetime,
      high_temp,
      low_temp,
      precip,
      pres,
      rh,
      weather,
      wind_spd,
      wind_cdir,
      dewpt,
      vis,
      uv,
    } = el;
    let { icon, description } = weather;

    //rounds some values returned from api to avoid decimals;
    precip = Math.round(precip * 100);
    low_temp = Math.round(low_temp);
    high_temp = Math.round(high_temp);
    dewpt = Math.round(dewpt);
    wind_spd = Math.round(wind_spd);

    //converts the datetime to a day of the week, date, month ex: Monday, the first, April
    let month = /-\d\d-/.exec(datetime);
    month = /\d\d/.exec(month)[0];
    month = monthDay.getMonthString(month);

    let day = /\d\d$/.exec(datetime)[0];
    datetime = monthDay.createCalWeek(day);
    datetime = monthDay.dayOfWeek(datetime);

    //
    return {
      datetime, //1
      day, //2
      month, //3
      high_temp, //4
      low_temp, //5
      precip, //6
      pres, //7
      rh, //8
      wind_spd, //9
      wind_cdir, //10
      dewpt, //11
      vis, //12
      uv, //13
      icon, //14
      description, //15
    };
  });

  return data;
};

export const getThisPlace = (data) => {
  const { state_code, city_name, country_code } = data;

  return {
    city_name,
    state_code,
    country_code,
  };
};

export const getMonth = function (data, string = false) {
  try {
    data = data.data.map((el) => {
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
