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
import {
  IncreasetTotalPriceType,
  ReduceTotalPriceType,
} from "../actions/changePrices";
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
    | IncreasetTotalPriceType
    | ReduceTotalPriceType
    | ProductCountType
    | MakeOrderType
    | SetTotalPriceType
) => {
  const localStorageData = JSON.parse(localStorage.getItem("productArr")!);
  const localStorageTax = localStorage.getItem("tax")!;

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
          localStorageData.filter((el: ProductData) => {
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
      const newData = state.data.map((el) => {
        return el.id === action.id ? { ...el, count: action.count } : el;
      });

      const newLocalStorageData = localStorageData.map((el: ProductData) => {
        console.log(el);

        return el.id === action.id
          ? {
              ...el,
              count: action.count,
              // prices: el.prices.map((priceItem: PriceItem) => {
              //   return priceItem;
              // }),
            }
          : el;
      });
      localStorage.setItem("productArr", JSON.stringify(newLocalStorageData));

      return { ...state, data: newData };

    case "SET_TOTAL_PRICE":
      const productInCart = JSON.parse(localStorage.getItem("productArr")!);
      let totalPrice = 0;
      let tax = 0;
      productInCart.map((el: any) => {
        const currentAmount = el.prices.find((priceItem: PriceItem) => {
          return priceItem.currency.symbol === action.currency;
        });
        tax += currentAmount.amount * 0.21;
        totalPrice += currentAmount.amount;
      });
      localStorage.setItem("totalPrice", (tax + totalPrice).toFixed(2));
      localStorage.setItem("tax", tax.toFixed(2));
      return { ...state, totalPrice: tax + totalPrice, tax };

    case "INCRASE_TOTAL_PRICE":
      const incraseTotalPrice =
        +localStorage.getItem("totalPrice")! + action.price;
      const incraseTax = action.price * 0.21;

      localStorage.setItem(
        "totalPrice",
        (incraseTotalPrice + incraseTax).toFixed(2)
      );

      localStorage.setItem("tax", (+localStorageTax + incraseTax).toFixed(2));

      return {
        ...state,
        totalPrice: (incraseTotalPrice + incraseTax).toFixed(2),
        tax: state.tax + incraseTax,
      };
    case "REDUCE_TOTAL_PRICE":
      const reduceTotalPrice =
        +localStorage.getItem("totalPrice")! - action.price;
      const reduceTax = action.price * 0.21;

      localStorage.setItem(
        "totalPrice",
        (reduceTotalPrice - reduceTax).toFixed(2)
      );

      localStorage.setItem("tax", (+localStorageTax - reduceTax).toFixed(2));

      return {
        ...state,
        totalPrice: (reduceTotalPrice - reduceTax).toFixed(2),
        tax: state.tax - reduceTax,
      };
    case "MAKE_ORDER":
      return { ...state, data: [], totalPrice: 0, tax: 0 };
    default:
      return state;
  }
};
