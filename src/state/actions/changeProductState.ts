export type changeProductStateType = ReturnType<typeof changeProductState>;
export const changeProductState = (index: number, name: string) => {
  return {
    type: "CHANGE_PRODUCT_STATE",
    index,
    name,
  } as const;
};

export type clearProductStateType = ReturnType<typeof clearProductState>;
export const clearProductState = () => {
  return {
    type: "CLEAR_PRODUCT_STATE",
  } as const;
};
