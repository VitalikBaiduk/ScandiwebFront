import React, { Component } from "react";
import { connect } from "react-redux";
import {
  makeOrder,
  productCount,
  removeProduct,
} from "../../../state/actions/handleProdutInCart";

import ProductForCart from "../product/components/productForCart/ProductForCart";
import { ProductDataWithActiveAttr } from "../../../types/types";
import { Title } from "../../../styles/global";
import {
  BlockForEmptyBin,
  EmptyText,
  OrderButton,
  ProductWrapper,
  StyledIcon,
  SuccessOrderBlock,
  SuccessOrderModal,
  SuccessOrderText,
  ToShoppingLink,
  TotalBlockKey,
  TotalBlockValue,
  TotalKey,
  TotalPriceBlock,
  TotalValue,
  Wrapper,
} from "./styles";
import { setTotalPrice } from "../../../state/actions/setTotalPrice";
import { getCorrectPrice } from "../../../utils/priceHandler";

class Cart extends Component<any, {}> {
  state = {
    order: false,
  };

  render(): React.ReactNode {
    const {
      cartReducer,
      currency,
      removeProduct,
      productCount,
      makeOrder,
      setTotalPrice,
    } = this.props;

    const products = localStorage.getItem("productArr")
      ? JSON.parse(localStorage.getItem("productArr")!)
      : cartReducer.data;
    const stateCurrency = currency.currency;

    let quantity = 0;

    products.map((el: ProductDataWithActiveAttr) =>
      el.count ? (quantity += el.count) : (quantity += 1)
    );

    const totalPrice = localStorage.getItem("totalPrice");
    const tax = localStorage.getItem("tax");

    return (
      <Wrapper>
        <Title>Cart</Title>
        {products && products.length ? (
          products.map((el: ProductDataWithActiveAttr, index: number) => {
            return (
              <ProductWrapper key={index}>
                <ProductForCart
                  key={index}
                  attributes={el.attributes}
                  brand={el.brand}
                  gallery={el.gallery}
                  name={el.name}
                  prices={el.prices}
                  __typename={el.__typename}
                  removeProduct={removeProduct}
                  attributeState={el.activeAttebutes}
                  getProductCount={productCount}
                  productCount={el.count}
                  id={el.id}
                  setTotalPrice={setTotalPrice}
                />
              </ProductWrapper>
            );
          })
        ) : (
          <BlockForEmptyBin>
            <EmptyText>The cart is empty</EmptyText>
            <ToShoppingLink to={"/all"}>
              <EmptyText className={"inButton"}>
                Go ahead to shopping!
              </EmptyText>
            </ToShoppingLink>
          </BlockForEmptyBin>
        )}
        {products && products.length !== 0 && (
          <TotalPriceBlock>
            <TotalBlockKey>
              Tax 21%:
              <TotalBlockValue>
                {tax && " " + stateCurrency + getCorrectPrice(+tax)}
              </TotalBlockValue>
            </TotalBlockKey>
            <TotalBlockKey>
              Quantity: <TotalBlockValue>{quantity}</TotalBlockValue>
            </TotalBlockKey>
            <TotalKey>
              Total:{" "}
              <TotalValue>
                {totalPrice && stateCurrency + getCorrectPrice(+totalPrice)}
              </TotalValue>
            </TotalKey>
            <OrderButton
              onClick={() => {
                this.setState({ order: true });
                makeOrder();
                localStorage.setItem("productArr", JSON.stringify([]));
              }}
            >
              ORDER
            </OrderButton>
          </TotalPriceBlock>
        )}
        {this.state.order && (
          <SuccessOrderBlock onClick={() => this.setState({ order: false })}>
            <SuccessOrderModal>
              <StyledIcon />
              <SuccessOrderText>The order was completed</SuccessOrderText>
            </SuccessOrderModal>
          </SuccessOrderBlock>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
    cartReducer: state.cartReducer,
  };
};

const mapDuspatchToProps = () => {
  return {
    removeProduct,
    productCount,
    makeOrder,
    setTotalPrice,
  };
};

export default connect(mapStateToProps, mapDuspatchToProps())(Cart);
