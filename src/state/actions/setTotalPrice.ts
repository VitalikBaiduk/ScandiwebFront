export type SetTotalPriceType = ReturnType<typeof setTotalPrice>;
export const setTotalPrice = (currency: string) => {
  return {
    type: "SET_TOTAL_PRICE",
    currency,
  } as const;
};
