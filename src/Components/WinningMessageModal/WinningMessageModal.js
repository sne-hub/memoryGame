import { useDispatch } from "react-redux";
import "./WinningMessageModal.css";
import { useEffect } from "react";
import { stopTimer } from "../../redux/actions";
import winningMessageFormatter from "../../utils/winningMessageFormatter";

const WinningMessageModal = ({ timer, numberOfMoves }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopTimer());
  }, [dispatch]);

  return (
    <div className="game-over">
      <h3 data-testid="winning-message-id">
       {winningMessageFormatter(timer, numberOfMoves)} 
      </h3>
    </div>
  );
};

export default WinningMessageModal;
