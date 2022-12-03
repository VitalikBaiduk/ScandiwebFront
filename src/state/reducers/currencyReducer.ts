import { Dispatch } from "redux";
import { ChangeCurrencyType } from "../actions/changeCurrency";

interface initialStateType {
  currency: string;
}

const initialState: initialStateType = {
  currency: "$",
};

export const currencyReducer = (
  state: initialStateType = initialState,
  action: ChangeCurrencyType
) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      return { ...state, currency: action.currency };
    default:
      return state;
  }
};
