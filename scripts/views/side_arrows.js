export const changeArrows = (dir) => {
  //!!!!NOTE:$()Jquery not working with the below command, look into why
  let cards = $('main').children();
  //spread used to convert NodeList into an Array;
  cards = [...cards];
  if (dir == 'right') {
    cards.push(cards[0]);
    cards.shift();
  }
  if (dir == 'left') {
    cards.unshift(cards[cards.length - 1]);
    cards.pop();
  }
  return cards;
};
