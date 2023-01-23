export const getCorrectPrice = (price: number) => {
  return !!price.toString().split(".")[1] ? price.toFixed(2) : price;
};
