//creates cards that append to the dom
export const createCard = (cards, type, clear = true) => {
  $('main').children().remove();
  cards.forEach((el) => {
    $(type).append(el);
  });
};

//changes text in navbar upon a search request
export const changeTitle = (data) => {
  const { state_code, city_name, country_code } = data;
  const text = `${city_name}, ${state_code} - ${country_code}`;
  return $('#location-name').text(text);
};
