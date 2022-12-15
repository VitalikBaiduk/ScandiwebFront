import { ChangeCartOvelayStatusType } from "../actions/changeCartOvelayStatus";

interface initialStateType {
  isOpenCartOverlay: boolean;
}

const initialState: initialStateType = {
  isOpenCartOverlay: false,
};

export const globalStateReducer = (
  state: initialStateType = initialState,
  action: ChangeCartOvelayStatusType
) => {
  console.log(state);

  switch (action.type) {
    case "CHANGE_CART_OVERLAY_STATUS":
      return { ...state, isOpenCartOverlay: action.isOpenCartOverlay };
    default:
      return state;
  }
};
