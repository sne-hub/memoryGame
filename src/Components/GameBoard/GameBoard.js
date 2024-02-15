import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import ResetGameButton from "../ResetGameButton/ResetGameButton";
import "./GameBoard.css";
import WinningMessageModal from "../WinningMessageModal/WinningMessageModal";
import shuffledCards from "../../utils/shuffledCards";
import {
  setCards,
  setScore,
  setIsDisabled,
  setFirstSelection,
  setSecondSelection,
  setMatchedCards,
  setTimer,
  resetTimer,
  setNumberOfMoves,
} from "../../redux/actions";
import SelectGridSize from "../SelectGridSize/SelectGridSize";
import Timer from "../Timer/Timer";
import newTimer from "../../utils/setNewTimer";

let interval;

const GameBoard = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const score = useSelector((state) => state.score);
  const firstSelection = useSelector((state) => state.firstSelection);
  const secondSelection = useSelector((state) => state.secondSelection);
  const isDisabled = useSelector((state) => state.isDisabled);
  const gridSize = useSelector((state) => state.gridSize);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const timer = useSelector((state) => state.timer);
  const numberOfMoves = useSelector((state) => state.numberOfMoves);

  const shuffleCards = useCallback(() => {
    dispatch(setCards(shuffledCards(gridSize)));
  }, [dispatch, gridSize]);

  const resetTurns = useCallback(() => {
    dispatch(setFirstSelection(null));
    dispatch(setSecondSelection(null));
    dispatch(setIsDisabled(false));
  }, [dispatch]);

  useEffect(() => {
    shuffleCards();
    resetTurns();
  }, [resetTurns, shuffleCards]);

  function handleChoice(card) {
    dispatch(setNumberOfMoves(numberOfMoves + 1));

    firstSelection
      ? dispatch(setSecondSelection(card))
      : dispatch(setFirstSelection(card));
  }

  useEffect(() => {
    if (firstSelection && secondSelection) {
      dispatch(setIsDisabled(true));
      if (firstSelection.src === secondSelection.src) {
        dispatch(setMatchedCards());
        dispatch(setScore(score + 2));
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [cards, score, dispatch, firstSelection, resetTurns, secondSelection]);

  function handleResetGameClick() {
    resetTurns();
    shuffleCards();
    dispatch(setScore(0));
    dispatch(resetTimer());
    dispatch(setNumberOfMoves(0));
  }

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(setTimer(newTimer(timer)));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, isRunning, timer]);

  useEffect(() => {
    resetTurns();
    shuffleCards();
    dispatch(setScore(0));
    dispatch(resetTimer());
    dispatch(setNumberOfMoves(0));
  }, [dispatch, gridSize, resetTurns, shuffleCards]);

  return (
    <div className="App" data-testid="game-board-id">
      <SelectGridSize />
      {score >= 2 && (
        <ResetGameButton handleResetGameClick={handleResetGameClick} />
      )}
      {isRunning && <Timer isRunning={isRunning} timer={timer} />}
      {score === cards.length && score !== 0 && (
        <WinningMessageModal timer={timer} numberOfMoves={numberOfMoves} />
      )}
      {cards.length > 0 && (
        <div
          className="card-grid"
          data-testid="game-board"
          style={{
            gridTemplateColumns:
              gridSize > 6
                ? `repeat(${gridSize / 3}, 8rem)`
                : `repeat(${gridSize / 2}, 8rem)`,
          }}>
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              handleChoice={handleChoice}
              flipped={
                card === firstSelection ||
                card === secondSelection ||
                card.matched
              }
              isDisabled={isDisabled}
              isRunning={isRunning}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
