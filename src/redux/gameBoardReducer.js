import gameBoardTypes from "./types";
import matchCard from "../utils/matchCards";

const initialState = {
  firstSelection: null,
  secondSelection: null,
  isDisabled: false,
  cards: [],
  score: 0,
  gridSize: 0,
  timer: { hours: 0, minutes: 0, seconds: 0, isRunning: false },
  numberOfMoves:0
};

const gameBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameBoardTypes.SET_FIRST_SELECTION:
      return {
        ...state,
        firstSelection: action.payload,
      };

    case gameBoardTypes.SET_SECOND_SELECTION:
      return {
        ...state,
        secondSelection: action.payload,
      };

    case gameBoardTypes.SET_CARDS:
      return { ...state, cards: action.payload };

    case gameBoardTypes.SET_IS_DISABLED:
      return {
        ...state,
        isDisabled: action.payload,
      };

    case gameBoardTypes.SET_SCORE:
      return {
        ...state,
        score: action.payload,
      };

    case gameBoardTypes.SET_GRID_SIZE:
      return {
        ...state,
        gridSize: action.payload,
      };

    case gameBoardTypes.SET_MATCHED_CARDS:
      const matchedCards = matchCard(state.cards, state.firstSelection);
      return {
        ...state,
        cards: matchedCards,
      };

    case gameBoardTypes.START_TIMER:
      return {
        ...state,
        timer: { ...state.timer, isRunning: true },
      };

    case gameBoardTypes.STOP_TIMER:
      return {
        ...state,
        timer: { ...state.timer, isRunning: false },
      };

    case gameBoardTypes.RESET_TIMER:
      return {
        ...state,
        timer: { ...initialState.timer },
      };

    case gameBoardTypes.SET_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    case gameBoardTypes.SET_NUMBER_OF_MOVES:
      return {
        ...state,
        numberOfMoves: action.payload,
      };

    default:
      return state;
  }
};

export { gameBoardReducer, initialState };
