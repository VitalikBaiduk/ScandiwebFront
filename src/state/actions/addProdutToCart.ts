import { ProductData } from "../../types/types";

export type addProductType = ReturnType<typeof addProduct>;
export const addProduct = (product: ProductData) => {
  return {
    type: "ADD_PRODUCT",
    product,
  } as const;
};

export type removeProductType = ReturnType<typeof removeProduct>;
export const removeProduct = (name: string) => {
  return {
    type: "REMOVE_PRODUCT",
    name,
  } as const;
};
