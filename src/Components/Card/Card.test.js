import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";
import { Provider } from "react-redux";
import store from "../../redux/store";

let handleChoice;

const setUp = () => {
  const card = {
    src: "/img/red.png",
    matched: false,
    alt: "card front",
  };

  render(
    <Provider store={store}>
      <Card
        card={card}
        handleChoice={handleChoice}
        flipped={false}
        isDisabled={false}
      />
    </Provider>
  );
};

describe("Single card component", () => {
  beforeEach(() => {
    handleChoice = jest.fn();
    setUp();
  });

  test("should render a single card", () => {
    const cardData = screen.getAllByTestId("single-card-id");
    expect(cardData.length).toBe(1);
    expect(cardData[0]).toBeInTheDocument();
  });

  test("should call handle choice function if the clicked card is not disabled", () => {
    const card = screen.getByTestId("single-card-id");

    fireEvent.click(card);
    expect(handleChoice).toBeCalledTimes(1);
  });
});
