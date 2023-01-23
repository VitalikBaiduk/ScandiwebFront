import {
  PriceItem,
  ProductData,
  ProductDataWithActiveAttr,
} from "../../types/types";
import {
  ProductCountType,
  AddProductType,
  RemoveProductType,
  MakeOrderType,
} from "../actions/handleProdutInCart";

import { SetTotalPriceType } from "../actions/setTotalPrice";

interface initialStateType {
  data: ProductDataWithActiveAttr[];
  totalPrice: number;
  tax: number;
}

const initialState: initialStateType = {
  data: [],
  totalPrice: 0,
  tax: 0,
};

export const cartReducer = (
  state: initialStateType = initialState,
  action:
    | AddProductType
    | RemoveProductType
    | ProductCountType
    | MakeOrderType
    | SetTotalPriceType
) => {
  const localStorageProductData = JSON.parse(
    localStorage.getItem("productArr")!
  );

  switch (action.type) {
    case "ADD_PRODUCT":
      const newProduct = {
        ...action.product,
        activeAttebutes: action.attributes,
      };
      return { ...state, data: [...state.data, newProduct] };
    case "REMOVE_PRODUCT":
      JSON.parse(localStorage.getItem("productArr")!);

      localStorage.setItem(
        "productArr",
        JSON.stringify(
          localStorageProductData.filter((el: ProductData) => {
            return el.id !== action.id;
          })
        )
      );
      return {
        ...state,
        data: state.data.filter((el: ProductDataWithActiveAttr) => {
          return el.id !== action.id;
        }),
      };
    case "PRODUCT_COUNT":
      let updatedPrices: Array<PriceItem> = [];

      localStorageProductData.map((item: any) => {
        if (item.id === action.id) {
          updatedPrices = item.firstPrices.map((priceItem: PriceItem) => {
            return { ...priceItem, amount: priceItem.amount * action.count };
          });
        }

        return item;
      });

      const newData = localStorageProductData.map((el: ProductData) => {
        return el.id === action.id
          ? {
              ...el,
              count: action.count,
              prices: updatedPrices,
            }
          : el;
      });
      localStorage.setItem("productArr", JSON.stringify(newData));

      return { ...state, data: newData };

    case "SET_TOTAL_PRICE":
      let totalPrice = 0;
      let tax = 0;

      localStorageProductData.map((el: any) => {
        const currentAmount = el.prices.find((priceItem: PriceItem) => {
          return priceItem.currency.symbol === action.currency;
        });

        tax += currentAmount.amount * 0.21;
        totalPrice += currentAmount.amount;

        return el;
      });
      localStorage.setItem("totalPrice", JSON.stringify(tax + totalPrice));
      localStorage.setItem("tax", JSON.stringify(tax));

      return { ...state, totalPrice: tax + totalPrice, tax };
    case "MAKE_ORDER":
      localStorage.setItem("totalPrice", JSON.stringify(0));
      localStorage.setItem("tax", JSON.stringify(0));
      return { ...state, data: [], totalPrice: 0, tax: 0 };
    default:
      return state;
  }
};
