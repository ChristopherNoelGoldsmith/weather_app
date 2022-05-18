export const changeArrows = (dir) => {
  //!!!!NOTE:$()Jquery not working with the below command, look into why
  let cards = $("#container").children();
  //spread used to convert NodeList into an Array;
  cards = [...cards];

  const cardVisabilityToggle = () => {
    cards.map((node, index) => {
      if (index < 5) return node.classList.add("visable");
      if (index >= 5) return node.classList.remove("visable");
    });
  };

  if (dir == "right") {
    cards.push(cards[0]);
    cards.shift();
    cardVisabilityToggle();
  }
  if (dir == "left") {
    cards.unshift(cards[cards.length - 1]);
    cards.pop();
    cardVisabilityToggle();
  }
  return cards;
};
