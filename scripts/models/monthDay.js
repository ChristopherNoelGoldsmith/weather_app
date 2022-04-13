export const createCalWeek = function (day) {
  let date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  //Passees values to get the 0-6 numberical value of the day of the week this specified date is on.
  date = new Date(`${month + 1} ${day}, ${year} 07:00:00`);
  date = date.getDay();
  return date;
};

export const dayOfWeek = (el) => {
  el = el * 1;

  switch (el) {
    case 0:
      return 'Sun';
      break;
    case 1:
      return 'Mon';
      break;
    case 2:
      return 'Tue';
      break;
    case 3:
      return 'Wed';
      break;
    case 4:
      return 'Thu';
      break;
    case 5:
      return 'Fri';
      break;
    case 6:
      return 'Sat';
      break;
    default:
      return 'Sun?';
      break;
  }
};

export const getMonthString = (el) => {
  el = el * 1;

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
