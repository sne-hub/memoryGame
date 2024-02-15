import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/redux/store";

let appComponent;

describe("App tests", () => {
  appComponent = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  test("should render game board component successfully", () => {
    render(appComponent);
    expect(screen.getByTestId("game-board-id")).toBeInTheDocument();
  });
});
