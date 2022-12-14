import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  increasetTotalPrice,
  reduceTotalPrice,
} from "../../../../state/actions/changePrices";
import { removeProduct } from "../../../../state/actions/handleProdutInCart";
import { ProductDataWithActiveAttr } from "../../../../types/types";
import ProductForCart from "../../../product/components/productForCart/ProductForCart";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 330px;
  max-height: 680px;
  box-sizing: border-box;
  padding: 30px 16px;
`;

export const Title = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  max-height: 670px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const TotalPriceBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

export const StyledText = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #1d1f22;
`;

export const Price = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export class CartOverlay extends Component<any, any> {
  render(): React.ReactNode {
    const { cartReducer, currency } = this.props;

    const products = cartReducer.data;
    // console.log(this.props.cartReducer);

    const getTotalPrice = (price: number, inc: boolean, decr: boolean) => {
      inc && increasetTotalPrice(price);
      decr && reduceTotalPrice(price);
    };
    return (
      <Wrapper>
        <Title>My Bag, 3 items</Title>
        <ProductWrapper>
          {products.length !== 0 &&
            products.map((el: ProductDataWithActiveAttr) => {
              return (
                <ProductForCart
                  attributes={el.attributes}
                  brand={el.brand}
                  gallery={el.gallery}
                  name={el.name}
                  prices={el.prices}
                  __typename={el.__typename}
                  currency={currency}
                  removeProduct={removeProduct}
                  getTotalPrice={getTotalPrice}
                  updatedPrices={cartReducer.updatedPrices}
                  attributeState={el.activeAttebutes}
                  className={"overlay"}
                  productCount={() => {}}
                />
              );
            })}
        </ProductWrapper>
        <TotalPriceBlock>
          <StyledText>Total:</StyledText>
          <Price>{currency.currency + cartReducer.totalPrice}</Price>
        </TotalPriceBlock>
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
  return { removeProduct, increasetTotalPrice, reduceTotalPrice };
};

export default connect(mapStateToProps, mapDuspatchToProps())(CartOverlay);
