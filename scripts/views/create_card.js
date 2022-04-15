//creates cards that append to the dom
export const createCard = (cards, type) => {
  $('main').children().remove();
  cards.forEach((el) => {
    $(type).append(el);
  });
};

//changes text in navbar upon a search request
export const changeTitle = (state, city, country) => {
  const text = `${city}, ${state} - ${country}`;
  return $('#location-name').text(text);
};
