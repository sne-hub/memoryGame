import { startTimer } from "../../redux/actions";
import { useDispatch } from "react-redux";

import "./Card.css";

const Card = ({ card, handleChoice, flipped, isDisabled, isRunning }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isDisabled) {
      handleChoice(card);
    }
  };

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => {
        if (!isRunning) {
          dispatch(startTimer());
        }
        handleClick();
      }}
      data-testid="single-card-id">
      <img className="front" src={card.src} alt="card front" />
      <img className="back" src="/img/logo.png" alt="cover" />
    </div>
  );
};

export default Card;
