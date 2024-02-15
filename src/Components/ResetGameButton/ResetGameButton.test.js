import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResetGameButton from "./ResetGameButton.js";
import store from "../../redux/store.js";
import { Provider } from "react-redux";

let handleResetGameClick;

const setUp = () => {
  render(
    <Provider store={store}>
      <ResetGameButton handleResetGameClick={handleResetGameClick} />
    </Provider>
  );
};

describe("ResetGameButton component", () => {
  beforeEach(() => {
    handleResetGameClick = jest.fn();
    setUp();
  });

  test("should render reset game button successfully", () => {
    const ResetGameButton = screen.getByRole("button");

    expect(ResetGameButton).toHaveTextContent("Reset Game");
    expect(ResetGameButton).toBeVisible();
  });

  test("should call handle reset game click function when a button is clicked", () => {
    const ResetGameButton = screen.getByRole("button");

    fireEvent.click(ResetGameButton);
    expect(handleResetGameClick).toBeCalledTimes(1);
  });
});
