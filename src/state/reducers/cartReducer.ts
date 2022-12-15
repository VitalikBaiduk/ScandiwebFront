import { ProductDataWithActiveAttr } from "../../types/types";
import {
  ProductCountType,
  AddProductType,
  RemoveProductType,
  makeOrderType,
} from "../actions/handleProdutInCart";
import {
  ChangeFirstTotalPriceType,
  IncreasetTotalPriceType,
  ReduceTotalPriceType,
} from "../actions/changePrices";

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
    | ChangeFirstTotalPriceType
    | IncreasetTotalPriceType
    | ReduceTotalPriceType
    | ProductCountType
    | makeOrderType
) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const newProduct = {
        ...action.product,
        activeAttebutes: action.attributes,
      };
      return { ...state, data: [...state.data, newProduct] };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        data: state.data.filter((el: ProductDataWithActiveAttr) => {
          return state.data.length >= 2
            ? el.name !== action.name ||
                JSON.stringify(el.activeAttebutes) !==
                  JSON.stringify(action.activeAttebutes)
            : el.name !== action.name;
        }),
      };
    case "PRODUCT_COUNT":
      const newData = state.data.map((el) => {
        return el.name === action.name &&
          JSON.stringify(el.activeAttebutes) ===
            JSON.stringify(action.activeAttebutes)
          ? { ...el, count: action.count }
          : el;
      });
      return { ...state, data: newData };
    case "SET_FIRST_TOTAL_PRICE":
      let firstTotalPriceArr: any[] = [];
      action.products.map((attrItem: ProductDataWithActiveAttr) => {
        let [item] = attrItem.prices.filter((el: any) => {
          return el.currency.symbol === action.stateCurrency;
        });
        const result = attrItem.count
          ? attrItem.count * item.amount
          : 1 * item.amount;

        firstTotalPriceArr.push(result);
      });

      const firstTotalCount =
        firstTotalPriceArr.length &&
        firstTotalPriceArr.reduce((a, b) => b + a).toFixed(2);

      const percentFirstTotalCount = firstTotalCount * 0.21;

      return {
        ...state,
        totalPrice: (+firstTotalCount + percentFirstTotalCount).toFixed(2),
        tax: percentFirstTotalCount,
      };
    case "INCRASE_TOTAL_PRICE":
      const incraseTotalPrice = +state.totalPrice + action.price;
      const incraseTax = action.price * 0.21;
      return {
        ...state,
        totalPrice: (incraseTotalPrice + incraseTax).toFixed(2),
        tax: state.tax + incraseTax,
      };
    case "REDUCE_TOTAL_PRICE":
      const reduceTotalPrice = +state.totalPrice - action.price;
      const reduceTax = action.price * 0.21;
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
