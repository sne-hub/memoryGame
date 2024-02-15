import gameBoardTypes, { RESET_TIMER, SET_NUMBER_OF_MOVES, SET_TIMER, START_TIMER, STOP_TIMER } from "./types";

const setScore = (payload) => ({
  type: gameBoardTypes.SET_SCORE,
  payload: payload,
});

const setCards = (payload) => ({
  type: gameBoardTypes.SET_CARDS,
  payload: payload,
});

const setIsDisabled = (payload) => ({
  type: gameBoardTypes.SET_IS_DISABLED,
  payload: payload,
});

const setFirstSelection = (payload) => ({
  type: gameBoardTypes.SET_FIRST_SELECTION,
  payload: payload,
});

const setSecondSelection = (payload) => ({
  type: gameBoardTypes.SET_SECOND_SELECTION,
  payload: payload,
});

const setGridSize = (payload) => ({
  type: gameBoardTypes.SET_GRID_SIZE,
  payload: payload,
});

const setMatchedCards = () => ({
  type: gameBoardTypes.SET_MATCHED_CARDS,
});

const startTimer = () => ({
  type: START_TIMER,
});

const stopTimer = () => ({
  type: STOP_TIMER,
});

const resetTimer = () => ({
  type: RESET_TIMER,
});

const setTimer = (payload) => ({
  type: SET_TIMER,
  payload: payload,
});

const setNumberOfMoves = (payload) => ({
  type: SET_NUMBER_OF_MOVES,
  payload: payload,
});

export {
  setCards,
  setIsDisabled,
  setFirstSelection,
  setSecondSelection,
  setScore,
  setGridSize,
  setMatchedCards,
  startTimer,
  stopTimer,
  resetTimer,
  setTimer,
  setNumberOfMoves
};
