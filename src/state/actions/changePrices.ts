export type IncreasetTotalPriceType = ReturnType<typeof increasetTotalPrice>;
export const increasetTotalPrice = (price: number) => {
  return {
    type: "INCRASE_TOTAL_PRICE",
    price,
  } as const;
};

export type ReduceTotalPriceType = ReturnType<typeof reduceTotalPrice>;
export const reduceTotalPrice = (price: number) => {
  return {
    type: "REDUCE_TOTAL_PRICE",
    price,
  } as const;
};
