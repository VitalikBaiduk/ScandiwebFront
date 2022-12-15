export type ChangeCartOvelayStatusType = ReturnType<
  typeof changeCartOvelayStatus
>;
export const changeCartOvelayStatus = (isOpenCartOverlay: boolean) => {
  return {
    type: "CHANGE_CART_OVERLAY_STATUS",
    isOpenCartOverlay,
  } as const;
};
