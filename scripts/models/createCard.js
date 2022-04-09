export const createCard = (cards, type) => {
  cards.forEach((el) => {
    $(type).append(el);
  });
};
