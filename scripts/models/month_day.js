export const createCalWeek = function (month, day) {
  let date = new Date();

  const year = date.getFullYear();
  //const month = date.getMonth() + 1;
  //Passees values to get the 0-6 numberical value of the day of the week this specified date is on.
  date = new Date(`${month} ${day}, ${year} 07:00:00`);
  date = date.getDay();
  return date;
};

export const dayOfWeek = (day) => {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day] ?? 'Sun';
};

export const getMonthString = (month) => {
  month = month * 1;

  switch (month) {
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
