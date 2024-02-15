import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WinningMessageModal from "./WinningMessageModal";
import { Provider } from "react-redux";
import store from "../../redux/store";

describe("WinningMessageModal component", () => {
  const timer = { hours: 0, minutes: 0, seconds: 1, isRunning: false };
  const numberOfMoves = 6;
  test("should render the winning message modal", () => {
    render(
      <Provider store={store}>
        <WinningMessageModal timer={timer} numberOfMoves={numberOfMoves} />
      </Provider>
    );
    expect(screen.getByTestId("winning-message-id")).toBeVisible();
  });
});
