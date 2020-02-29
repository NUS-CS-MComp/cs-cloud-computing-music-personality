import { createStore, combineReducers } from "redux";
import { accessToken } from "./actions/reducer";

export default createStore(combineReducers({ accessToken: accessToken }));
