import { domInfoText } from "./dom.js";

export const createMainCards = (data, mes, cardArrIndex) => {
  const {
    dayOfWeek,
    day,
    month,
    high_temp,
    low_temp,
    pop,
    pres,
    rh,
    wind_spd,
    wind_cdir,
    dewpt,
    vis,
    uv,
    icon,
    description,
  } = data;
  let template = $('#main-card-template').html();
  //MEASUREMENT REPLACEMENT
  const imperial = {
    temp: 'F',
    wind: 'Mph',
    dewpt: 'F',
    vis: 'Mi',
  };

  const metric = {
    temp: 'C',
    wind: 'Ms',
    dewpt: 'C',
    vis: 'Km',
  };

  const replacer = (mi) => {
    template = template.replace(/%TEMPMES%/g, mi.temp);
    template = template.replace(/%WINDMES%/g, mi.wind);
    template = template.replace(/%DEWPOINTMES%/g, mi.dewpt);
    template = template.replace(/%VISMES%/g, mi.vis);
  };
  if (mes === 'C' || mes === 'M' || mes == false) replacer(metric);
  if (mes === 'F' || mes === 'I') replacer(imperial);
  //

  cardArrIndex <= 4
    ? template = template.replace(/%VISABILITYCLASS%/g, 'visable') :
    template = template.replace(/%VISABILITYCLASS%/g, '');

  template = template.replace(/%DAYOFWEEK%/g, dayOfWeek);
  template = template.replace(/%DAY%/g, day);
  template = template.replace(/%MONTH%/g, month);
  template = template.replace(/%HIGH%/g, high_temp);
  template = template.replace(/%LOW%/g, low_temp);
  template = template.replace(/%PRECIP%/g, pop);
  template = template.replace(/%PRESSURE%/g, pres);
  template = template.replace(/%HUMIDITY%/g, rh);
  template = template.replace(/%WIND_SPD%/g, wind_spd);
  template = template.replace(/%WIND_DIR%/g, wind_cdir);
  template = template.replace(/%DEWPOINT%/g, dewpt);
  template = template.replace(/%VISABILITY%/, vis);
  template = template.replace(/%UV%/g, uv);
  template = template.replace(/%ICON%/g, icon);
  template = template.replace(/%DESC%/g, description);

  return template;
};

export const createInfoCard = (type = null) => {
  //targets the info square and its child to inject the appropriate text from the dom views file.
  const containerOfTemplate = document.getElementById('info-square');
  //line below used for values other than the list items to close the box
  console.log(type);
  if (type == null) return containerOfTemplate.classList.remove('vis');
  const template = document.getElementById('info-square-text');
  const text = domInfoText[type];

  if (text != template.innerText) containerOfTemplate.classList.remove('vis');

  template.innerText = text;
  if (!containerOfTemplate.classList.contains('vis')) return containerOfTemplate.classList.add('vis');
  return containerOfTemplate.classList.remove('vis');

}

//creates cards that append to the dom
export const createCard = (cards, type) => {
  $(type).children().remove();
  if (typeof (cards) != Array) return $(type).append(cards);
  cards.forEach((el) => {
    $(type).append(el);
  });
};

//changes text in navbar upon a search request
export const changeTitle = (state, city, country) => {
  const text = `${city}, ${state} - ${country}`;
  return $('#location-name').text(text);
};
