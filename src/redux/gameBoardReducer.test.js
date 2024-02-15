import { gameBoardReducer, initialState } from "./gameBoardReducer";
import {
  setCards,
  setIsDisabled,
  setFirstSelection,
  setGridSize,
  setMatchedCards,
  setScore,
  setSecondSelection,
  startTimer,
  stopTimer,
  resetTimer,
  setTimer,
  setNumberOfMoves,
} from "./actions";
import shuffledCards from "../utils/shuffledCards";

describe("Game board reducer", () => {
  test("should handle first selection", () => {
    const card = {
      src: "/img/red.png",
      matched: false,
      alt: "card front",
    };
    const updatedState = gameBoardReducer(
      initialState,
      setFirstSelection(card)
    );
    expect(updatedState.firstSelection).toBe(card);
  });

  test("should handle second selection", () => {
    const card = {
      src: "/img/red.png",
      matched: false,
      alt: "card front",
    };
    const updatedState = gameBoardReducer(
      initialState,
      setSecondSelection(card)
    );
    expect(updatedState.secondSelection).toBe(card);
  });

  test("should handle game cards", () => {
    const cards = shuffledCards(12);
    const updatedState = gameBoardReducer(initialState, setCards(cards));
    expect(updatedState.cards).toBe(cards);
  });

  test("should handle  gridSize", () => {
    const gridSize = 6;
    const updatedState = gameBoardReducer(initialState, setGridSize(gridSize));
    expect(updatedState.gridSize).toBe(gridSize);
  });

  test("should handle game score", () => {
    const score = 6;
    const updatedState = gameBoardReducer(initialState, setScore(score));
    expect(updatedState.score).toBe(score);
  });

  test("should handle is disabled", () => {
    const isDisabled = true;
    const updatedState = gameBoardReducer(
      initialState,
      setIsDisabled(isDisabled)
    );
    expect(updatedState.isDisabled).toBe(isDisabled);
  });

  test("should handle matched cards", () => {
    const cards = [
      { src: "/img/red.png", matched: false },
      { src: "/img/roblox.png", matched: false },
    ];
    let updatedState = gameBoardReducer(initialState, setCards(cards));

    expect(updatedState.cards[0].matched).toBe(false);
    expect(updatedState.cards[1].matched).toBe(false);

    updatedState = gameBoardReducer(updatedState, setFirstSelection(cards[0]));
    updatedState = gameBoardReducer(updatedState, setMatchedCards());

    expect(updatedState.cards[0].matched).toBe(true);
    expect(updatedState.cards[1].matched).toBe(false);
  });

  test("should handle start timer", () => {
    const updatedState = gameBoardReducer(initialState, startTimer());
    expect(updatedState.timer.isRunning).toBe(true);
  });

  test("should handle stop timer", () => {
    const updatedState = gameBoardReducer(initialState, stopTimer());
    expect(updatedState.timer.isRunning).toBe(false);
  });

  test("should handle reset timer", () => {
    const updatedState = gameBoardReducer(initialState, resetTimer());
    expect(updatedState.timer).toStrictEqual(initialState.timer);
  });

  test("should handle set timer", () => {
    const timer = { hours: 0, minutes: 0, seconds: 10, isRunning: true };
    const updatedState = gameBoardReducer(initialState, setTimer(timer));
    expect(updatedState.timer).toBe(timer);
  });
  
  test("should handle set number of moves", () => {
    const numberOfMoves = 1;
    const updatedState = gameBoardReducer(
      initialState,
      setNumberOfMoves(numberOfMoves)
    );
    expect(updatedState.numberOfMoves).toBe(numberOfMoves);
  });
});
