import { CurrencyItemType } from "../../types/types";

export type SetCurrenciesType = ReturnType<typeof setCurrencies>;
export const setCurrencies = (currencies: CurrencyItemType[]) => {
  return {
    type: "SET_CURRENCIES",
    currencies,
  } as const;
};
