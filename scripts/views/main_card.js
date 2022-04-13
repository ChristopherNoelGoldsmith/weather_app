export const createMainCards = (data) => {
  const {
    datetime,
    day,
    month,
    high_temp,
    low_temp,
    precip,
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

  template = template.replace(/%TODAY%/g, datetime);
  template = template.replace(/%DAY%/g, day);
  template = template.replace(/%MONTH%/g, month);
  template = template.replace(/%HIGH%/g, high_temp);
  template = template.replace(/%LOW%/g, low_temp);
  template = template.replace(/%PRECIP%/g, precip);
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
