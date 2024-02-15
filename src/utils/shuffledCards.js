import cardImages from "./cardImages";

const shuffledCards = (gridSize) => {
  const images = cardImages.slice(0, parseInt(gridSize) / 2);
  return [...images, ...images]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card }));
};

export default shuffledCards;
