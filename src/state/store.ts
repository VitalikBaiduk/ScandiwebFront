import { combineReducers, createStore } from "redux";
import { currencyReducer } from "./reducers/currencyReducer";

let rootReducer = combineReducers({
  currency: currencyReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;
