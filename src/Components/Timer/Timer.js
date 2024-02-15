import "./Timer.css";
import timeFormatter from "../../utils/timeFormatter";

const Timer = ({ timer }) => {
  return (
    <div data-testid="timer-id">
      <h3 className="timer">Timer: {timeFormatter(timer)}</h3>
    </div>
  );
};

export default Timer;
