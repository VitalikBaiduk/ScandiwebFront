export type ChangeCurrencyType = ReturnType<typeof changeCurrency>;
export const changeCurrency = (currency: string) => {
  return {
    type: "CHANGE_CURRENCY",
    currency: currency,
  } as const;
};
