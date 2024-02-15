import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import GameBoard from "./GameBoard";
import {
  resetTimer,
  setCards,
  setGridSize,
  setNumberOfMoves,
  setScore,
  startTimer,
} from "../../redux/actions";
import shuffledCards from "../../utils/shuffledCards";
import store from "../../redux/store";

const setUp = () => {
  render(
    <Provider store={store}>
      <GameBoard />
    </Provider>
  );
};

describe("GameBoard Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    store.dispatch(setGridSize(12));
    setUp();
  });

  test("should randomize cards if reset game button is clicked", () => {
    act(() => {
      store.dispatch(setScore(2));
    });

    const button = screen.getByRole("button");
    const gameBoard = screen.getAllByTestId("game-board");

    fireEvent.click(button);
    expect(screen.getAllByTestId("game-board")).not.toBe(gameBoard);
  });

  test("should add flipped class to a clicked card", () => {
    act(() => {
      store.dispatch(setCards(shuffledCards(12)));
    });

    const card = screen.getAllByTestId("single-card-id")[0];

    fireEvent.click(card);
    expect(card).toHaveClass("flipped");
  });

  test("should remove flipped class on clicked cards if they do not match", () => {
    const differingCards = [
      { src: "/img/roblox.png", matched: false },
      { src: "/img/avatar.png", matched: false },
    ];

    act(() => {
      store.dispatch(setCards(differingCards));
    });

    const card1 = screen.getAllByTestId("single-card-id")[0];
    const card2 = screen.getAllByTestId("single-card-id")[1];

    fireEvent.click(card1);
    expect(card1).toHaveClass("flipped");

    fireEvent.click(card2);
    expect(card2).toHaveClass("flipped");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(card1).not.toHaveClass("flipped");
    expect(card2).not.toHaveClass("flipped");
  });

  test("should not remove flipped class if clicked cards match", () => {
    const matchingCards = [
      { src: "/img/roblox.png", matched: false },
      { src: "/img/roblox.png", matched: false },
    ];

    act(() => {
      store.dispatch(setCards(matchingCards));
    });

    const card1 = screen.getAllByTestId("single-card-id")[0];
    const card2 = screen.getAllByTestId("single-card-id")[1];

    fireEvent.click(card1);
    expect(card1).toHaveClass("flipped");

    fireEvent.click(card2);
    expect(card1).toHaveClass("flipped");
    expect(card2).toHaveClass("flipped");
  });

  test("should start the timer when the first card is clicked", () => {
    act(() => {
      store.dispatch(resetTimer());
    });

    const card = screen.getAllByTestId("single-card-id")[0];

    fireEvent.click(card);

    const timerSpan = screen.getByTestId("timer-id");
    expect(timerSpan.textContent).toBe("Timer: 00:00:00");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(timerSpan.textContent).toBe("Timer: 00:00:01");
  });

  test("should reset the timer when the reset game button is clicked", () => {
    act(() => {
      store.dispatch(startTimer());
    });

    act(() => {
      jest.advanceTimersByTime(1000);
      store.dispatch(setScore(2));
    });

    const timerSpan = screen.getByTestId("timer-id");
    expect(timerSpan.textContent).toBe("Timer: 00:00:01");

    fireEvent.click(screen.getByRole("button"));
    expect(timerSpan).not.toBeVisible();
  });

  test("should increase the number of moves when a card is clicked", () => {
    const cards = screen.getAllByTestId("single-card-id");
    expect(store.getState().numberOfMoves).toBe(0);

    fireEvent.click(cards[0]);
    expect(store.getState().numberOfMoves).toBe(1);
    
    fireEvent.click(cards[1]);
    expect(store.getState().numberOfMoves).toBe(2);
  });

  test("should stop the timer and display the winning message when the game is over and all cards are matched", () => {
    act(() => {
      store.dispatch(startTimer());
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const timerSpan = screen.getByTestId("timer-id");
    expect(timerSpan.textContent).toBe("Timer: 00:00:01");

    const cards = [...shuffledCards(+store.getState().gridSize)].map((card) => {
      return { ...card, matched: true };
    });

    act(() => {
      store.dispatch(setCards(cards));
      store.dispatch(setScore(cards.length));
      store.dispatch(setNumberOfMoves(6));
    });

    expect(screen.getByTestId("winning-message-id").textContent).toBe(
      "congrats! you won in 1 second with 6 moves"
    );
  });
});
