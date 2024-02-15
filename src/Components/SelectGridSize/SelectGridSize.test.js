import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SelectGridSize from "./SelectGridSize";
import { Provider } from "react-redux";
import store from "../../redux/store";
import configureStore from "redux-mock-store";
import { setGridSize } from "../../redux/actions";

const mockStore = configureStore([]);

const setUp = () => {
  render(
    <Provider store={store}>
      <SelectGridSize gridSize={"12"} />
    </Provider>
  );
};

describe("SelectGridSize component", () => {
  beforeEach(() => {
    setUp();
  });

  test("should render select grid component successfully", () => {
    const selectGridSizeSelection = screen.queryByText("Select grid-size");
    expect(selectGridSizeSelection).toBeVisible();
  });

  test("should change grid size when the dropdown value is changed", () => {
    const dropDown = screen.getByRole("combobox");

    fireEvent.change(dropDown, { target: { value: "4" } });
    expect(dropDown.value).toBe("4");
    expect(screen.getByText("2x2")).toBeVisible();

    fireEvent.change(dropDown, { target: { value: "6" } });
    expect(dropDown.value).toBe("6");
    expect(screen.getByText("3x2")).toBeVisible();

    fireEvent.change(dropDown, { target: { value: "12" } });
    expect(dropDown.value).toBe("12");
    expect(screen.getByText("3x4")).toBeVisible();
  });
});

describe("select grid size component mock", () => {
  test("should dispatch an action to set the grid size when a dropdown value changes", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <SelectGridSize />
      </Provider>
    );

    const dropDown = screen.getByRole("combobox");

    fireEvent.change(dropDown, { target: { value: "6" } });

    store.dispatch(setGridSize(dropDown.value));

    let actions = store.getActions();
    expect(actions).toEqual([{ type: "SET-GRID-SIZE", payload: "6" }]);
  });
});
