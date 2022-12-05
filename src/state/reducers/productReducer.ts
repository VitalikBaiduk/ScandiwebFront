import { ProductAttributeName } from "../../enums/ProductAttributeName";

export interface ProductStateType {
  name: string;
  activeElement: any;
}

interface initialStateType {
  attributesState: ProductStateType[];
}

const initialState: initialStateType = {
  attributesState: [
    {
      name: ProductAttributeName.SIZE,
      activeElement: null as unknown as number,
    },
    {
      name: ProductAttributeName.COLOR,
      activeElement: null as unknown as number,
    },
    {
      name: ProductAttributeName.CAPACITY,
      activeElement: null as unknown as number,
    },
    {
      name: ProductAttributeName.WITHUSB,
      activeElement: null as unknown as number,
    },
    {
      name: ProductAttributeName.TOUCHID,
      activeElement: null as unknown as number,
    },
  ],
};

export const productReducer = (
  state: initialStateType = initialState,
  action: any
) => {
  switch (action.type) {
    case "CHANGE_PRODUCT_STATE":
      return {
        attributesState: state.attributesState.map((stateItem: any) => {
          return action.name === stateItem.name
            ? { ...stateItem, activeElement: action.index }
            : stateItem;
        }),
      };
    case "CLEAR_PRODUCT_STATE":
      return {
        attributesState: state.attributesState.map((el) => {
          return { ...el, activeElement: null };
        }),
      };
    default:
      return state;
  }
};
