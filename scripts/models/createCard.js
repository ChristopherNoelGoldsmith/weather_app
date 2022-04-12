export const createCard = (cards, type) => {
  $('main').children().remove();
  cards.forEach((el) => {
    $(type).append(el);
  });
};

export const changeTitle = (data) => {
  const { state_code, city_name, country_code } = data;
  const text = `${city_name}, ${state_code} - ${country_code}`;
  return $('#location-name').text(text);
};
