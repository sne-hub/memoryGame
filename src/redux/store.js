import {gameBoardReducer} from "./gameBoardReducer";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const store = createStore(gameBoardReducer, applyMiddleware(thunk));
export default store;
