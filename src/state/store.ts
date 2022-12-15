import { combineReducers, createStore } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { currencyReducer } from "./reducers/currencyReducer";
import { globalStateReducer } from "./reducers/globalStateReducer";
import { productReducer } from "./reducers/productReducer";

let rootReducer = combineReducers({
  currency: currencyReducer,
  productReducer,
  cartReducer,
  globalStateReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;
