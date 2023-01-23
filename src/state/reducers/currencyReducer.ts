import { CurrencyItemType } from "../../types/types";
import { ChangeCurrencyType } from "../actions/changeCurrency";
import { SetCurrenciesType } from "../actions/setCurrencies";

interface initialStateType {
  currencies: CurrencyItemType[];
  currency: string;
}

const initialState: initialStateType = {
  currencies: [{ __typename: "Currency", label: "USD", symbol: "$" }],
  currency: "$",
};

export const currencyReducer = (
  state: initialStateType = initialState,
  action: ChangeCurrencyType | SetCurrenciesType
) => {
  switch (action.type) {
    case "SET_CURRENCIES":
      return { ...state, currencies: action.currencies };
    case "CHANGE_CURRENCY":
      return { ...state, currency: action.currency };
    default:
      return state;
  }
};
