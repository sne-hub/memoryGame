import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Timer from "./Timer";
import store from "../../redux/store";

describe("timer component", () => {
  const timer = { hours: 0, minutes: 0, seconds: 0, isRunning: false };

  test("should render the timer component successfully", () => {
    render(
      <Provider store={store}>
        <Timer timer={timer}/>
      </Provider>
    );
    const timerSpan = screen.getByTestId("timer-id");
    expect(timerSpan).toBeInTheDocument();
  });
});
