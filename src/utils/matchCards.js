const matchCard = (cards, firstSelection) => {
  return cards.map((card) => {
    if (card.src === firstSelection.src) {
      return { ...card, matched: true };
    } else {
      return card;
    }
  });
};

export default matchCard;
