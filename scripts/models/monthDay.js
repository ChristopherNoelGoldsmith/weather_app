export const createCalWeek = function (day) {
  let date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  console.log(day);
  date = new Date(`${month} ${day}, ${year} 07:00:00`);
  date = date.getDay();
  console.log(date);

  return date;
};

export const dayOfWeek = (el) => {
  el = el * 1;

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
