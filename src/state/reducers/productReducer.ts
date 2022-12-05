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
      name: "Size",
      activeElement: null as unknown as number,
    },
    {
      name: "Color",
      activeElement: null as unknown as number,
    },
    {
      name: "Capacity",
      activeElement: null as unknown as number,
    },
    {
      name: "With USB 3 ports",
      activeElement: null as unknown as number,
    },
    {
      name: "Touch ID in keyboard",
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
