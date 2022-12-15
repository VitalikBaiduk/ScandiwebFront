import { ActiveAttebutes, ProductData } from "../../types/types";

export type AddProductType = ReturnType<typeof addProduct>;
export const addProduct = (
  product: ProductData,
  attributes: ActiveAttebutes[]
) => {
  return {
    type: "ADD_PRODUCT",
    product,
    attributes,
  } as const;
};

export type RemoveProductType = ReturnType<typeof removeProduct>;
export const removeProduct = (
  name: string,
  activeAttebutes: ActiveAttebutes[]
) => {
  return {
    type: "REMOVE_PRODUCT",
    name,
    activeAttebutes,
  } as const;
};

export type ProductCountType = ReturnType<typeof productCount>;
export const productCount = (
  count: number,
  name: string,
  activeAttebutes: ActiveAttebutes[]
) => {
  return {
    type: "PRODUCT_COUNT",
    count,
    name,
    activeAttebutes,
  } as const;
};

export type makeOrderType = ReturnType<typeof makeOrder>;
export const makeOrder = () => {
  return {
    type: "MAKE_ORDER",
  } as const;
};
