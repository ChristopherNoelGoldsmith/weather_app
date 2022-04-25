import * as monthDay from './month_day.js';

//parses the data attribute of the API and parses all values used in cards then places them in an array of arrays
//for each day.
export const parseData = (data) => {
  data = data.data.map((el) => {
    let {
      datetime,
      high_temp,
      low_temp,
      pop,
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
    low_temp = Math.round(low_temp);
    high_temp = Math.round(high_temp);
    dewpt = Math.round(dewpt);
    wind_spd = Math.round(wind_spd);

    //converts the datetime to a day of the week, date, month ex: Monday, the first, April
    const regExpForMonthAndDay = /(?<=-)(\d\d){1}/g;
    let monthAndDay = datetime.match(regExpForMonthAndDay);
    const month = monthDay.getMonthString(monthAndDay[0]);
    const day = monthAndDay[1];
    let dayOfWeek = monthDay.createCalWeek(month, day);
    dayOfWeek = monthDay.dayOfWeek(day);
    //
    return {
      dayOfWeek, //1
      day, //2
      month, //3
      high_temp, //4
      low_temp, //5
      pop, //6
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

export const getMonth = function (data) {
  data = data.data.map((date) => {
    date = date.datetime.match(/-\d\d-/)[0];
    date = date.match(/\d\d/)[0];
    date = monthDay.getMonthString(date);

    return el;
  });
  return data;
};
