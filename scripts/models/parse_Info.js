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
    const month = getMonthString(monthAndDay[0]);
    const day = monthAndDay[1];
    let weekday = createCalWeek(month, day);
    weekday = dayOfWeek(weekday);
    //
    return {
      weekday, //1
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
    date = getMonthString(date);

    return el;
  });
  return data;
};

//Favorites Funtions
export const getFavoritesLocationFromText = (favorite) => {
  return $(favorite).text();
}

//Utility Functions
const createCalWeek = function (month, day) {
  let date = new Date();

  const year = date.getFullYear();
  //const month = date.getMonth() + 1;
  //Passees values to get the 0-6 numberical value of the day of the week this specified date is on.
  date = new Date(`${month} ${day}, ${year} 07:00:00`);
  date = date.getDay();
  return date;
};

const dayOfWeek = (day) => {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day] ?? 'Sun';
};

const getMonthString = (month) => {
  month = (month * 1) - 1;
  const months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
  return months[month];
};

export const convertToUsableDataForReverseGeoCoding = (loc) => {
  //regexp parses the location string given by the api to seperate city, state, country into an array;
  const regExpForLoc = /(\w+(\W\w+)?(\W\w+)?|(\w+(\s\w+)?(\s\w+)?))/gi;
  loc = loc.match(regExpForLoc);
  //this returns your current location if the searchbar has an empty address
  if (!loc || loc[0] === '' || loc[0] == null) {
    return false;
  }
  return loc;
};