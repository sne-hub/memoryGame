import "./ResetGameButton.css";
const ResetGameButton = ({ handleResetGameClick }) => {
  return (
    <button type="button" onClick={handleResetGameClick}>
      Reset Game
    </button>
  );
};

export default ResetGameButton;
