import { ProductData } from "../../types/types";
import { addProductType, removeProductType } from "../actions/addProdutToCart";

interface initialStateType {
  data: ProductData[];
}

const initialState: initialStateType = {
  data: [],
};

export const cartReducer = (
  state: initialStateType = initialState,
  action: addProductType | removeProductType
) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const repeatedElement = state.data.find((el: ProductData) => {
        return el.name === action.product.name;
      });
      return repeatedElement
        ? { data: [...state.data] }
        : { data: [...state.data, action.product] };
    case "REMOVE_PRODUCT":
      return {
        data: state.data.filter((el: ProductData) => el.name !== action.name),
      };
    default:
      return state;
  }
};
